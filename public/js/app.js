class MTGFriendsApp {
    constructor() {
        this.socket = null;
        this.currentRoom = null;
        this.playerName = null;
        this.players = [];
        this.gameState = null;
        
        this.init();
    }

    init() {
        this.setupSocketConnection();
        this.setupEventListeners();
        this.setupDragAndDrop();
        
        // Show connection screen initially
        this.showScreen('connection');
    }

    setupSocketConnection() {
        this.socket = io();

        this.socket.on('connect', () => {
            console.log('Connected to server');
            this.showStatus('Connected to server', 'success');
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
            this.showStatus('Disconnected from server', 'error');
        });

        this.socket.on('room-joined', (data) => {
            this.currentRoom = data.roomId;
            this.players = data.players;
            this.gameState = data.gameState;
            
            this.updateGameUI();
            this.showScreen('game');
            this.showStatus(`Joined room ${data.roomId}`, 'success');
        });

        this.socket.on('player-joined', (data) => {
            this.players.push(data);
            this.updatePlayersUI();
            this.showStatus(`${data.name} joined the game`, 'success');
        });

        this.socket.on('player-left', (data) => {
            this.players = this.players.filter(p => p.socketId !== data.socketId);
            this.updatePlayersUI();
            this.showStatus(`${data.name} left the game`, 'error');
        });

        this.socket.on('card-moved', (data) => {
            this.handleCardMovement(data);
        });

        this.socket.on('deck-imported', (data) => {
            this.handleDeckImport(data.deck);
            this.showStatus('Deck imported successfully', 'success');
        });

        this.socket.on('deck-import-error', (data) => {
            this.showStatus(`Deck import failed: ${data.error}`, 'error');
        });
    }

    setupEventListeners() {
        // Connection screen
        document.getElementById('join-game').addEventListener('click', () => {
            this.joinGame();
        });

        document.getElementById('import-deck').addEventListener('click', () => {
            this.importDeck();
        });

        // Game controls
        document.getElementById('draw-card').addEventListener('click', () => {
            this.drawCard();
        });

        document.getElementById('shuffle-library').addEventListener('click', () => {
            this.shuffleLibrary();
        });

        document.getElementById('reset-game').addEventListener('click', () => {
            if (confirm('Are you sure you want to reset the game?')) {
                this.resetGame();
            }
        });

        // Chat
        document.getElementById('send-chat').addEventListener('click', () => {
            this.sendChatMessage();
        });

        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendChatMessage();
            }
        });

        // Enter key for joining game
        document.getElementById('player-name').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.joinGame();
            }
        });

        document.getElementById('room-id').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.joinGame();
            }
        });
    }

    setupDragAndDrop() {
        // This will be implemented for card drag and drop functionality
        document.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('card')) {
                e.target.classList.add('dragging');
                e.dataTransfer.setData('text/plain', e.target.dataset.cardId);
            }
        });

        document.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('card')) {
                e.target.classList.remove('dragging');
            }
        });

        document.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (e.target.closest('.zone')) {
                e.target.closest('.zone').classList.add('drop-target');
            }
        });

        document.addEventListener('dragleave', (e) => {
            if (e.target.closest('.zone')) {
                e.target.closest('.zone').classList.remove('drop-target');
            }
        });

        document.addEventListener('drop', (e) => {
            e.preventDefault();
            const zone = e.target.closest('.zone');
            if (zone) {
                zone.classList.remove('drop-target');
                const cardId = e.dataTransfer.getData('text/plain');
                this.moveCard(cardId, zone.id);
            }
        });
    }

    joinGame() {
        const playerName = document.getElementById('player-name').value.trim();
        const roomId = document.getElementById('room-id').value.trim() || this.generateRoomId();

        if (!playerName) {
            this.showStatus('Please enter your name', 'error');
            return;
        }

        this.playerName = playerName;
        this.socket.emit('join-room', roomId, playerName);
    }

    importDeck() {
        const deckUrl = document.getElementById('moxfield-url').value.trim();
        
        if (!deckUrl) {
            this.showStatus('Please enter a Moxfield deck URL', 'error');
            return;
        }

        if (!this.currentRoom) {
            this.showStatus('Please join a room first', 'error');
            return;
        }

        this.socket.emit('import-deck', {
            roomId: this.currentRoom,
            deckUrl: deckUrl
        });
    }

    drawCard() {
        // Simulate drawing a card
        const libraryZone = document.getElementById('library');
        const handZone = document.getElementById('hand');
        
        if (libraryZone.children.length > 0) {
            const card = this.createSampleCard();
            handZone.querySelector('.card-container').appendChild(card);
            this.showStatus('Drew a card', 'success');
        } else {
            this.showStatus('Library is empty', 'error');
        }
    }

    shuffleLibrary() {
        this.showStatus('Library shuffled', 'success');
    }

    resetGame() {
        // Clear all zones
        const zones = document.querySelectorAll('.card-container');
        zones.forEach(zone => {
            zone.innerHTML = '';
        });

        // Add sample library
        this.initializeSampleLibrary();
        this.showStatus('Game reset', 'success');
    }

    moveCard(cardId, targetZoneId) {
        const card = document.querySelector(`[data-card-id="${cardId}"]`);
        const targetZone = document.getElementById(targetZoneId);
        
        if (card && targetZone) {
            const sourceZone = card.closest('.zone').id;
            targetZone.querySelector('.card-container').appendChild(card);
            
            // Emit card movement to other players
            this.socket.emit('move-card', {
                roomId: this.currentRoom,
                cardId: cardId,
                from: sourceZone,
                to: targetZoneId,
                position: { x: 0, y: 0 } // Simplified positioning
            });

            this.showStatus(`Moved card to ${targetZoneId}`, 'success');
        }
    }

    handleCardMovement(data) {
        // Handle card movements from other players
        const card = document.querySelector(`[data-card-id="${data.cardId}"]`);
        const targetZone = document.getElementById(data.to);
        
        if (card && targetZone) {
            targetZone.querySelector('.card-container').appendChild(card);
        }
    }

    sendChatMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (message) {
            this.addChatMessage(this.playerName, message);
            input.value = '';
            // In a real implementation, this would emit to the server
        }
    }

    addChatMessage(playerName, message) {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = `<strong>${playerName}:</strong> ${message}`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    handleDeckImport(deck) {
        // Clear library and add imported deck
        const libraryZone = document.getElementById('library').querySelector('.card-container');
        libraryZone.innerHTML = '';

        deck.cards.forEach((cardData, index) => {
            for (let i = 0; i < cardData.quantity; i++) {
                const card = this.createCard(cardData.name, true); // face down
                libraryZone.appendChild(card);
            }
        });
    }

    createCard(name = 'Card', faceDown = false) {
        const card = document.createElement('div');
        card.className = `card ${faceDown ? 'face-down' : ''}`;
        card.draggable = true;
        card.dataset.cardId = this.generateCardId();
        
        const cardName = document.createElement('div');
        cardName.className = 'card-name';
        cardName.textContent = faceDown ? '?' : name;
        
        card.appendChild(cardName);
        
        // Add double-click to flip
        card.addEventListener('dblclick', () => {
            card.classList.toggle('face-down');
            cardName.textContent = card.classList.contains('face-down') ? '?' : name;
        });

        return card;
    }

    createSampleCard() {
        const sampleCards = [
            'Lightning Bolt', 'Counterspell', 'Giant Growth', 'Dark Ritual',
            'Swords to Plowshares', 'Brainstorm', 'Sol Ring', 'Mountain',
            'Island', 'Forest', 'Plains', 'Swamp'
        ];
        
        const randomCard = sampleCards[Math.floor(Math.random() * sampleCards.length)];
        return this.createCard(randomCard);
    }

    initializeSampleLibrary() {
        const libraryZone = document.getElementById('library').querySelector('.card-container');
        
        // Add 60 face-down cards to simulate a library
        for (let i = 0; i < 60; i++) {
            const card = this.createCard('Library Card', true);
            libraryZone.appendChild(card);
        }
    }

    updateGameUI() {
        document.getElementById('current-room').textContent = this.currentRoom;
        document.getElementById('player-count').textContent = this.players.length;
        this.updatePlayersUI();
        
        // Initialize with sample library if empty
        const libraryZone = document.getElementById('library').querySelector('.card-container');
        if (libraryZone.children.length === 0) {
            this.initializeSampleLibrary();
        }
    }

    updatePlayersUI() {
        const playersList = document.getElementById('players-list');
        playersList.innerHTML = '';
        
        this.players.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.className = 'player-card';
            if (player.socketId === this.socket.id) {
                playerCard.classList.add('current');
            }
            playerCard.textContent = player.name;
            playersList.appendChild(playerCard);
        });
    }

    showScreen(screenName) {
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => {
            screen.classList.add('hidden');
        });
        
        document.getElementById(`${screenName}-screen`).classList.remove('hidden');
    }

    showStatus(message, type = 'info') {
        const statusMessages = document.getElementById('status-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `status-message ${type}`;
        messageDiv.textContent = message;
        
        statusMessages.appendChild(messageDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 5000);
    }

    generateRoomId() {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    generateCardId() {
        return 'card_' + Math.random().toString(36).substring(2, 15);
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MTGFriendsApp();
});