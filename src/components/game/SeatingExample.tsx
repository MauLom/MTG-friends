/**
 * Example component demonstrating the use of seating/placement selectors
 * This shows how to use the selectors in a React component
 */

'use client';

import React from 'react';
import {
  useOnTurnPlayer,
  usePreviousTurnPlayer,
  usePreviewSides,
  useSelfPlayer,
} from '@/lib/store';

export default function SeatingExample() {
  // Use the hook versions of selectors that automatically subscribe to changes
  const onTurnPlayer = useOnTurnPlayer();
  const previousTurnPlayer = usePreviousTurnPlayer();
  const previewSides = usePreviewSides();
  const selfPlayer = useSelfPlayer();

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Seating & Placement Info</h2>

      <div className="space-y-2">
        <div className="p-3 bg-blue-500/20 rounded">
          <span className="font-semibold">On Turn: </span>
          {onTurnPlayer ? (
            <span>{onTurnPlayer.name}</span>
          ) : (
            <span className="text-gray-400">No active turn</span>
          )}
        </div>

        <div className="p-3 bg-purple-500/20 rounded">
          <span className="font-semibold">Previous Turn: </span>
          {previousTurnPlayer ? (
            <span>{previousTurnPlayer.name}</span>
          ) : (
            <span className="text-gray-400">N/A</span>
          )}
        </div>

        <div className="p-3 bg-green-500/20 rounded">
          <span className="font-semibold">Preview Sides: </span>
          <div className="mt-2 flex gap-4">
            <div>
              <span className="text-sm">Left: </span>
              {previewSides.left ? (
                <span>{previewSides.left.name}</span>
              ) : (
                <span className="text-gray-400">Empty</span>
              )}
            </div>
            <div>
              <span className="text-sm">Right: </span>
              {previewSides.right ? (
                <span>{previewSides.right.name}</span>
              ) : (
                <span className="text-gray-400">Empty</span>
              )}
            </div>
          </div>
        </div>

        <div className="p-3 bg-yellow-500/20 rounded">
          <span className="font-semibold">Self: </span>
          {selfPlayer ? (
            <span>{selfPlayer.name}</span>
          ) : (
            <span className="text-gray-400">Spectator mode</span>
          )}
        </div>
      </div>
    </div>
  );
}
