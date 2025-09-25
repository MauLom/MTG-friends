const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Game state management
const gameRooms = new Map();

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Join a game room
  socket.on('join-room', (roomId, playerName) => {
    socket.join(roomId);
    
    if (!gameRooms.has(roomId)) {
      gameRooms.set(roomId, {
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

  // Handle deck import from Moxfield
  socket.on('import-deck', async (data) => {
    const { roomId, deckUrl } = data;
    try {
      // This will be implemented with Moxfield API integration
      const deck = await importDeckFromMoxfield(deckUrl);
      socket.emit('deck-imported', { deck });
    } catch (error) {
      socket.emit('deck-import-error', { error: error.message });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    
    // Remove player from all rooms
    gameRooms.forEach((room, roomId) => {
      const playerIndex = room.players.findIndex(p => p.socketId === socket.id);
      if (playerIndex !== -1) {
        const playerName = room.players[playerIndex].name;
        room.players.splice(playerIndex, 1);
        
        // Notify other players
        socket.to(roomId).emit('player-left', {
          name: playerName,
          socketId: socket.id
        });

        // Clean up empty rooms
        if (room.players.length === 0) {
          gameRooms.delete(roomId);
        }
      }
    });
  });
});

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/rooms', (req, res) => {
  const rooms = Array.from(gameRooms.entries()).map(([id, room]) => ({
    id,
    playerCount: room.players.length,
    gamePhase: room.gameState.phase
  }));
  res.json(rooms);
});

// Moxfield integration (placeholder)
async function importDeckFromMoxfield(deckUrl) {
  // TODO: Implement actual Moxfield API integration
  return {
    name: "Sample Deck",
    cards: [
      { name: "Lightning Bolt", quantity: 4 },
      { name: "Mountain", quantity: 20 }
    ]
  };
}

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

server.listen(PORT, () => {
  console.log(`MTG-friends server running on port ${PORT}`);
});