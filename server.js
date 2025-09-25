const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');
const MoxfieldApi = require('moxfield-api').default;

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const gameRooms = new Map();
const moxfield = new MoxfieldApi();

// Moxfield integration
async function importDeckFromMoxfield(deckUrl) {
  try {
    // Extract deck ID from URL
    const deckId = extractDeckIdFromUrl(deckUrl);
    if (!deckId) {
      throw new Error('Invalid Moxfield deck URL');
    }
    
    // Fetch deck from Moxfield API
    const deckData = await moxfield.deckList.findById(deckId);
    
    // Transform the deck data to our format
    const cards = [];
    
    // Add mainboard cards
    if (deckData.mainboard) {
      for (const [cardId, cardInfo] of Object.entries(deckData.mainboard)) {
        cards.push({
          name: cardInfo.card.name,
          quantity: cardInfo.quantity
        });
      }
    }
    
    return {
      name: deckData.name || "Imported Deck",
      cards: cards
    };
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
            console.log(`Deck "${deck.name}" imported for player ${player.name} in room ${roomId}`);
          }
        }
        
        socket.emit('deck-imported', { deck });
      } catch (error) {
        console.error('Deck import error:', error);
        socket.emit('deck-import-error', { error: error.message });
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