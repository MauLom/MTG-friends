# MTG-friends

A web-based application for playing Magic: The Gathering online with friends, featuring real-time multiplayer gameplay and Moxfield deck integration.

## Features

- **Real-time Multiplayer**: Play with friends in real-time using WebSocket connections
- **Drag & Drop Interface**: Intuitive card movement between different game zones
- **Moxfield Integration**: Import decks directly from Moxfield (planned feature)
- **Game Zones**: Full Magic gameplay zones including hand, library, graveyard, battlefield, and exile
- **Chat System**: Built-in chat for communication during games
- **Responsive Design**: Works on desktop and mobile devices

## Game Zones

- **Hand**: Your private cards
- **Library**: Your deck (face-down cards)
- **Graveyard**: Discarded cards
- **Battlefield**: Cards in play
- **Exile**: Removed cards
- **Opponent Areas**: View opponent's zones

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MauLom/MTG-friends.git
cd MTG-friends
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Production

To run in production:
```bash
npm start
```

## How to Play

1. **Join a Game**:
   - Enter your name
   - Enter a room ID (or leave blank for a new room)
   - Click "Join Game"

2. **Game Controls**:
   - **Draw Card**: Draw a card from your library to your hand
   - **Shuffle Library**: Shuffle your library
   - **Reset Game**: Clear all zones and restart

3. **Card Interactions**:
   - **Drag & Drop**: Move cards between zones
   - **Double-click**: Flip cards face up/down
   - **Hover**: Preview cards

4. **Multiplayer**:
   - All card movements are visible to other players in real-time
   - Chat with other players during the game

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/rooms` - List active game rooms
- WebSocket events for real-time gameplay

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Real-time**: Socket.io
- **HTTP Client**: Axios (for API integration)

## Future Features

- [ ] Complete Moxfield API integration
- [ ] User accounts and authentication
- [ ] Game state persistence
- [ ] Advanced card search and filtering
- [ ] Tournament mode
- [ ] Spectator mode
- [ ] Card image integration
- [ ] Sound effects
- [ ] Mobile app version

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Disclaimer

This is a fan-made application for educational and entertainment purposes. Magic: The Gathering is a trademark of Wizards of the Coast LLC.