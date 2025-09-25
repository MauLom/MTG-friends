import { NextResponse } from 'next/server';

export async function GET() {
  const gameRooms = (global as any).gameRooms || new Map();
  
  const rooms = Array.from(gameRooms.entries()).map((entry: any) => {
    const [id, room] = entry;
    return {
      id,
      playerCount: room.players.length,
      gamePhase: room.gameState.phase
    };
  });
  
  return NextResponse.json(rooms);
}