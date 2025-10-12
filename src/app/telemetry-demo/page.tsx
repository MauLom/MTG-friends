'use client';

import React from 'react';
import { Stack, Text, Title, Alert } from '@mantine/core';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PreviewBoard from '@/components/game/panels/PreviewBoard';
import TurnTracker from '@/components/game/TurnTracker';
import GameZone from '@/components/game/GameZone';
import { Info } from 'lucide-react';

/**
 * Telemetry Demo Page
 * Demonstrates all telemetry tracking hooks
 * Open dev console (F12) and look for [Telemetry] messages
 */
export default function TelemetryDemoPage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Title order={1} className="text-white">
            Telemetry Hooks Demo
          </Title>
          <Alert icon={<Info size={16} />} color="blue" variant="light">
            <Text size="sm">
              Open your browser&apos;s Developer Console (F12) and interact with the components below.
              Look for <Text span fw={600} c="blue">[Telemetry]</Text> messages to see the tracking events.
            </Text>
          </Alert>
        </div>

        {/* Section 1: Preview Board Expansion */}
        <div className="space-y-4">
          <div>
            <Title order={3} className="text-white mb-2">
              1. Preview Board Expansion
            </Title>
            <Text size="sm" c="dimmed">
              Click on the preview board to expand it. This will trigger:
              <br />• <Text span c="cyan">ui.panel.expand</Text> (generic panel event)
              <br />• <Text span c="cyan">ui.preview.expand</Text> (specific preview event)
            </Text>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <PreviewBoard position="left" scale={0.7}>
              <div className="p-8 text-center">
                <Text c="white" size="lg" fw={600}>Left Preview</Text>
                <Text c="dimmed" size="sm">Click to expand</Text>
              </div>
            </PreviewBoard>
            <PreviewBoard position="right" scale={0.7}>
              <div className="p-8 text-center">
                <Text c="white" size="lg" fw={600}>Right Preview</Text>
                <Text c="dimmed" size="sm">Click to expand</Text>
              </div>
            </PreviewBoard>
          </div>
        </div>

        {/* Section 2: Turn Tracker Phase Hover */}
        <div className="space-y-4">
          <div>
            <Title order={3} className="text-white mb-2">
              2. Turn Tracker Phase Hover
            </Title>
            <Text size="sm" c="dimmed">
              Hover over the phase buttons below. This will trigger:
              <br />• <Text span c="cyan">ui.turntracker.phase.hover</Text> (with phase name and device type)
            </Text>
          </div>
          <TurnTracker />
        </div>

        {/* Section 3: Zone Scroll */}
        <div className="space-y-4">
          <div>
            <Title order={3} className="text-white mb-2">
              3. Zone Scroll
            </Title>
            <Text size="sm" c="dimmed">
              Scroll horizontally in the hand zone below. This will trigger:
              <br />• <Text span c="cyan">ui.zone.scroll</Text> (with zone id, scroll position, and device type)
            </Text>
          </div>
          <GameZone 
            id="hand" 
            title="Hand (Scroll Horizontally →)" 
            cards={[
              { id: '1', name: 'Card 1', type: 'creature' },
              { id: '2', name: 'Card 2', type: 'instant' },
              { id: '3', name: 'Card 3', type: 'sorcery' },
              { id: '4', name: 'Card 4', type: 'enchantment' },
              { id: '5', name: 'Card 5', type: 'artifact' },
              { id: '6', name: 'Card 6', type: 'land' },
              { id: '7', name: 'Card 7', type: 'planeswalker' },
              { id: '8', name: 'Card 8', type: 'creature' },
            ]} 
          />
        </div>

        {/* Console Instructions */}
        <Alert color="yellow" variant="light">
          <Text size="sm" fw={600} mb="xs">
            📋 Console Instructions:
          </Text>
          <Text size="sm" component="div">
            <ol style={{ marginLeft: '1.5rem' }}>
              <li>Open Developer Tools (Press F12 or Right-click → Inspect)</li>
              <li>Go to the Console tab</li>
              <li>Look for messages prefixed with <Text span fw={600} c="yellow">[Telemetry]</Text></li>
              <li>Interact with the components above to see the tracking events</li>
            </ol>
          </Text>
        </Alert>
        </div>
      </div>
    </DndProvider>
  );
}
