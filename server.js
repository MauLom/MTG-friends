const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');
const MoxfieldApi = require('moxfield-api').default;
const axios = require('axios');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const gameRooms = new Map();
const moxfield = new MoxfieldApi();

// Scryfall API integration
async function fetchCardFromScryfall(cardName) {
  try {
    const encodedName = encodeURIComponent(cardName);
    const response = await axios.get(`https://api.scryfall.com/cards/named?exact=${encodedName}`);
    
    const cardData = response.data;
    return {
      imageUrl: cardData.image_uris?.normal || cardData.image_uris?.large || cardData.image_uris?.small,
      manaCost: cardData.mana_cost,
      type: cardData.type_line,
      oracleText: cardData.oracle_text
    };
  } catch (error) {
    console.warn(`Could not fetch card data for "${cardName}":`, error.message);
    return {
      imageUrl: null,
      manaCost: null,
      type: null,
      oracleText: null
    };
  }
}

// Helper function to add delay between API calls
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Mock deck data for testing when Moxfield API is not available
function createMockDeck() {
  const cards = [
    {
      name: "Lightning Bolt",
      quantity: 4,
      imageUrl: "https://cards.scryfall.io/normal/front/c/e/ce711943-c1a1-43a0-8b89-8d169cfb8e06.jpg",
      manaCost: "{R}",
      type: "Instant",
      oracleText: "Lightning Bolt deals 3 damage to any target."
    },
    {
      name: "Counterspell",
      quantity: 4,
      imageUrl: "https://cards.scryfall.io/normal/front/a/4/a457f404-ddf1-40fa-b0f0-23c8598533f4.jpg",
      manaCost: "{U}{U}",
      type: "Instant",
      oracleText: "Counter target spell."
    },
    {
      name: "Black Lotus",
      quantity: 1,
      imageUrl: "https://cards.scryfall.io/normal/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg",
      manaCost: "{0}",
      type: "Artifact",
      oracleText: "{T}, Sacrifice Black Lotus: Add three mana of any one color."
    },
    {
      name: "Serra Angel",
      quantity: 2,
      imageUrl: "https://cards.scryfall.io/normal/front/9/0/9067f035-3437-4c5c-bae9-d3c9001a3411.jpg",
      manaCost: "{3}{W}{W}",
      type: "Creature — Angel",
      oracleText: "Flying, vigilance"
    }
  ];
  
  return {
    name: "Test Deck with Card Images",
    cards: cards,
    remainingCards: cards.reduce((sum, card) => sum + card.quantity, 0),
    drawnCards: []
  };
}

// Moxfield integration
async function importDeckFromMoxfield(deckUrl) {
  try {
    // Extract deck ID from URL
    const deckId = extractDeckIdFromUrl(deckUrl);
    if (!deckId) {
      throw new Error('Invalid Moxfield deck URL');
    }
    
    try {
      // Fetch deck from Moxfield API  
      const deckData = await moxfield.deckList.findById(deckId);
      
      // Transform the deck data to our format and fetch card images
      const cards = [];
      
      // Add mainboard cards
      if (deckData.mainboard) {
        console.log(`Fetching card data for ${Object.keys(deckData.mainboard).length} unique cards...`);
        
        for (const [cardId, cardInfo] of Object.entries(deckData.mainboard)) {
          const cardName = cardInfo.card.name;
          
          // Fetch additional card data from Scryfall
          const scryfallData = await fetchCardFromScryfall(cardName);
          
          cards.push({
            name: cardName,
            quantity: cardInfo.quantity,
            imageUrl: scryfallData.imageUrl,
            manaCost: scryfallData.manaCost,
            type: scryfallData.type,
            oracleText: scryfallData.oracleText
          });
          
          // Add small delay to be respectful to Scryfall API
          await delay(100);
        }
      }
      
      return {
        name: deckData.name || "Imported Deck",
        cards: cards,
        remainingCards: cards.reduce((sum, card) => sum + card.quantity, 0),
        drawnCards: []
      };
    } catch (networkError) {
      console.warn('Moxfield API not available, using mock deck for demonstration:', networkError.message);
      // Return mock data for demonstration when API is not available
      return createMockDeck();
    }
  } catch (error) {
    console.error('Error importing deck from Moxfield:', error);
    throw new Error(`Failed to import deck: ${error.message}`);
  }
}

function extractDeckIdFromUrl(url) {
  // Handle various Moxfield URL formats
  const patterns = [
    /moxfield\.com\/decks\/([a-zA-Z0-9_-]+)/,  // Standard format
    /moxfield\.com\/decks\/([a-zA-Z0-9_-]+)\//  // With trailing slash
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return null;
}

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Join a game room
    socket.on('join-room', (roomId, playerName) => {
      socket.join(roomId);
      
      if (!gameRooms.has(roomId)) {
        gameRooms.set(roomId, {
          id: roomId,
          players: [],
          gameState: {
            phase: 'waiting',
            cards: [],
            boardState: {}
          }
        });
      }

      const room = gameRooms.get(roomId);
      const existingPlayer = room.players.find(p => p.socketId === socket.id);
      
      if (!existingPlayer) {
        room.players.push({
          socketId: socket.id,
          name: playerName,
          hand: [],
          library: [],
          graveyard: [],
          battlefield: []
        });
      }

      socket.emit('room-joined', {
        roomId,
        players: room.players.map(p => ({ name: p.name, socketId: p.socketId })),
        gameState: room.gameState
      });

      socket.to(roomId).emit('player-joined', {
        name: playerName,
        socketId: socket.id
      });

      console.log(`Player ${playerName} joined room ${roomId}`);
    });

    // Handle card movements
    socket.on('move-card', (data) => {
      const { roomId, cardId, from, to, position } = data;
      
      // Broadcast card movement to all players in the room
      socket.to(roomId).emit('card-moved', {
        playerId: socket.id,
        cardId,
        from,
        to,
        position
      });
    });

    // Handle chat messages
    socket.on('chat-message', (roomId, message) => {
      const room = gameRooms.get(roomId);
      if (room) {
        const player = room.players.find(p => p.socketId === socket.id);
        if (player) {
          socket.to(roomId).emit('chat-message', {
            playerName: player.name,
            message
          });
        }
      }
    });

    // Handle deck import from Moxfield
    socket.on('import-deck', async (data) => {
      const { roomId, deckUrl } = data;
      try {
        const deck = await importDeckFromMoxfield(deckUrl);
        
        // Store the deck for the player
        const room = gameRooms.get(roomId);
        if (room) {
          const player = room.players.find(p => p.socketId === socket.id);
          if (player) {
            player.deck = deck;
            
            // For demonstration, add some cards to the player's hand with images
            const sampleCards = deck.cards.slice(0, 3).map((deckCard, index) => ({
              id: `card_${socket.id}_${index}`,
              name: deckCard.name,
              imageUrl: deckCard.imageUrl,
              manaCost: deckCard.manaCost,
              type: deckCard.type,
              oracleText: deckCard.oracleText,
              faceDown: false
            }));
            
            player.hand.push(...sampleCards);
            
            console.log(`Deck "${deck.name}" imported for player ${player.name} in room ${roomId}`);
            console.log(`Added ${sampleCards.length} sample cards to player's hand for demonstration`);
            
            // Emit updated player zones to the client
            socket.emit('player-zones-updated', {
              zones: {
                hand: player.hand,
                library: player.library,
                graveyard: player.graveyard,
                battlefield: player.battlefield,
                exile: []
              }
            });
          }
        }
        
        socket.emit('deck-imported', { deck });
      } catch (error) {
        console.error('Deck import error:', error);
        socket.emit('deck-import-error', { error: error.message });
      }
    });

    // Handle drawing a card from deck
    socket.on('draw-card', (data) => {
      const { roomId } = data;
      try {
        const room = gameRooms.get(roomId);
        if (!room) {
          throw new Error('Room not found');
        }

        const player = room.players.find(p => p.socketId === socket.id);
        if (!player || !player.deck) {
          throw new Error('Player or deck not found');
        }

        const deck = player.deck;
        
        // Initialize tracking arrays if they don't exist
        if (!deck.drawnCards) {
          deck.drawnCards = [];
        }
        
        // Create a pool of available cards (considering quantities and what's already drawn)
        const availableCards = [];
        for (const deckCard of deck.cards) {
          const cardName = deckCard.name;
          const drawnCount = deck.drawnCards.filter(name => name === cardName).length;
          const remainingQuantity = deckCard.quantity - drawnCount;
          
          // Add remaining copies to available pool
          for (let i = 0; i < remainingQuantity; i++) {
            availableCards.push(deckCard);
          }
        }

        if (availableCards.length === 0) {
          throw new Error('No more cards in deck');
        }

        // Randomly select a card from available cards
        const randomIndex = Math.floor(Math.random() * availableCards.length);
        const selectedCard = availableCards[randomIndex];
        
        // Mark this card as drawn
        deck.drawnCards.push(selectedCard.name);
        deck.remainingCards = availableCards.length - 1;

        // Create a card instance for the player's hand
        const drawnCard = {
          id: `card_${socket.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: selectedCard.name,
          imageUrl: selectedCard.imageUrl,
          manaCost: selectedCard.manaCost,
          type: selectedCard.type,
          oracleText: selectedCard.oracleText,
          faceDown: false
        };

        // Add to player's hand
        player.hand.push(drawnCard);

        console.log(`Player ${player.name} drew "${selectedCard.name}" from deck. ${deck.remainingCards} cards remaining.`);

        // Emit the drawn card and updated zones
        socket.emit('card-drawn', { 
          card: drawnCard, 
          remainingCards: deck.remainingCards 
        });

        socket.emit('player-zones-updated', {
          zones: {
            hand: player.hand,
            library: player.library,
            graveyard: player.graveyard,
            battlefield: player.battlefield,
            exile: []
          }
        });

      } catch (error) {
        console.error('Draw card error:', error);
        socket.emit('draw-card-error', { error: error.message });
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
      
      // Remove player from all rooms
      for (const [roomId, room] of gameRooms.entries()) {
        const playerIndex = room.players.findIndex(p => p.socketId === socket.id);
        if (playerIndex !== -1) {
          const player = room.players[playerIndex];
          room.players.splice(playerIndex, 1);
          
          socket.to(roomId).emit('player-left', {
            name: player.name,
            socketId: socket.id
          });

          // Clean up empty rooms
          if (room.players.length === 0) {
            gameRooms.delete(roomId);
          }
        }
      }
    });
  });

  // Export gameRooms for API routes
  global.gameRooms = gameRooms;

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});