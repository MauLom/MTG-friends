/**
 * GameStage Component Usage Examples
 * 
 * This file demonstrates how to use the GameStage component
 * with existing game components and new panel shells.
 */

import { 
  GameStage,
  InfoPanel,
  OnTurnBoard,
  ActionsPanel,
  PreviewBoard,
  HudCenter,
  SelfBoard
} from '@/components/ui';
import TurnTracker from '@/components/game/TurnTracker';
import MenuPanel from '@/components/game/MenuPanel';
import InteractionIcons from '@/components/game/InteractionIcons';
import PlayerZone from '@/components/game/PlayerZone';
import GameZone from '@/components/game/GameZone';

/**
 * Example 1: Basic Usage with Placeholders
 */
export function BasicGameStageExample() {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <GameStage />
    </div>
  );
}

/**
 * Example 2: Full Integration with Game Components
 */
export function FullGameStageExample() {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <GameStage
        // Row 1: Top controls and info
        info={<InteractionIcons />}
        onTurn={<TurnTracker />}
        actions={<MenuPanel />}
        
        // Row 2: Opponents and battlefield
        prevLeft={
          <PlayerZone
            playerName="Opponent 1"
            isOpponent={true}
            hand={[]}
            graveyard={[]}
            exile={[]}
            battlefield={[]}
          />
        }
        hudCenter={
          <GameZone
            id="battlefield"
            title="Battlefield"
            cards={[]}
          />
        }
        prevRight={
          <PlayerZone
            playerName="Opponent 2"
            isOpponent={true}
            hand={[]}
            graveyard={[]}
            exile={[]}
            battlefield={[]}
          />
        }
        
        // Row 3: Your player zone
        self={
          <PlayerZone
            playerName="You"
            isCurrentPlayer={true}
            hand={[]}
            graveyard={[]}
            exile={[]}
            battlefield={[]}
          />
        }
      />
    </div>
  );
}

/**
 * Example 3: Using Panel Shell Components
 */
export function PanelShellsExample() {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <GameStage
        // Row 1: Shell components for top row
        info={<InfoPanel />}
        onTurn={<OnTurnBoard />}
        actions={<ActionsPanel />}
        
        // Row 2: Shell components for middle row
        prevLeft={<PreviewBoard position="left" />}
        hudCenter={<HudCenter />}
        prevRight={<PreviewBoard position="right" />}
        
        // Row 3: Shell component for bottom row
        self={<SelfBoard />}
      />
    </div>
  );
}

/**
 * Example 4: Custom Content in Each Area
 */
export function CustomContentExample() {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <GameStage
        info={
          <div className="p-4 bg-blue-900/20 rounded-lg">
            <h3 className="text-white font-bold">Game Info</h3>
            <p className="text-white/70 text-sm">Custom info panel</p>
          </div>
        }
        onTurn={
          <div className="p-4 bg-green-900/20 rounded-lg text-center">
            <p className="text-white font-bold">Your Turn</p>
          </div>
        }
        actions={
          <div className="p-4 bg-purple-900/20 rounded-lg">
            <button className="w-full px-3 py-2 bg-purple-500 text-white rounded">
              Custom Action
            </button>
          </div>
        }
        prevLeft={<div className="p-4 bg-red-900/20 rounded-lg">Left Area</div>}
        hudCenter={<div className="p-4 bg-yellow-900/20 rounded-lg">Center HUD</div>}
        prevRight={<div className="p-4 bg-red-900/20 rounded-lg">Right Area</div>}
        self={<div className="p-4 bg-emerald-900/20 rounded-lg">Your Zone</div>}
      />
    </div>
  );
}
