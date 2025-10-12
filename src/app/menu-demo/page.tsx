'use client';

import MenuPanel from '@/components/game/MenuPanel';
import { Text, Stack, Box, Paper } from '@mantine/core';

/**
 * Demo page for MenuPanel component
 */
export default function MenuDemoPage() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Stack gap="xl" className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <Text size="2.5rem" fw={700} c="white" mb="md">
            Menu Panel Demo
          </Text>
          <Text size="lg" c="dimmed">
            Responsive menu panel with Drawer (mobile) and Popover (desktop)
          </Text>
        </div>

        {/* MenuPanel positioned in top-right like in actual game */}
        <Paper
          shadow="xl"
          p="xl"
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            minHeight: '400px',
            position: 'relative',
          }}
        >
          <Box style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
            <MenuPanel />
          </Box>
          
          <div style={{ paddingTop: '60px' }}>
            <Text size="xl" fw={600} c="white" mb="lg">
              Click the menu button in the top-right corner
            </Text>
            <Text size="sm" c="dimmed" mb="md">
              Try the menu on different screen sizes:
            </Text>
            <Stack gap="sm">
              <Text size="sm" c="dimmed">
                • <strong>Desktop (≥768px):</strong> Opens as a Popover dropdown
              </Text>
              <Text size="sm" c="dimmed">
                • <strong>Mobile (&lt;768px):</strong> Opens as a full Drawer from the right
              </Text>
              <Text size="sm" c="dimmed">
                • <strong>Keyboard:</strong> Press ESC to close the panel
              </Text>
              <Text size="sm" c="dimmed">
                • <strong>State Persistence:</strong> Open/close state is saved in localStorage
              </Text>
            </Stack>
          </div>
        </Paper>

        {/* Feature highlights */}
        <div className="mt-8 p-8 bg-white/5 rounded-xl border border-white/10 max-w-5xl mx-auto">
          <Text size="xl" fw={600} c="white" mb="md">
            Menu Panel Features ✅
          </Text>
          <Stack gap="sm">
            <Text size="sm" c="dimmed">
              ✓ <strong>Responsive Design:</strong> Drawer for mobile, Popover for desktop
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Tab Navigation:</strong> Log, Settings, and Shortcuts tabs
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Game Log:</strong> Shows last 20 events with timestamps and type badges
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Scrollable Content:</strong> ScrollArea maintains scroll position within tabs
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Settings:</strong> Toggle switches for game preferences
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Shortcuts Guide:</strong> Read-only list of keyboard shortcuts
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Keyboard Accessible:</strong> Tab navigation, ESC to close, focus trap
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>LocalStorage Persistence:</strong> Panel state persists across sessions
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Game Actions:</strong> Quick access buttons in the Log tab
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Room Info Badge:</strong> Shows connection status when panel is closed
            </Text>
          </Stack>
        </div>

        {/* Implementation details */}
        <div className="mt-8 p-6 bg-blue-500/10 rounded-xl border border-blue-500/20 max-w-5xl mx-auto">
          <Text size="lg" fw={600} c="blue" mb="sm">
            💡 Implementation Details
          </Text>
          <Stack gap="xs">
            <Text size="sm" c="dimmed">
              • Uses Mantine&apos;s <code>useMediaQuery</code> hook to detect mobile vs desktop
            </Text>
            <Text size="sm" c="dimmed">
              • Uses Mantine&apos;s <code>useLocalStorage</code> hook to persist panel state
            </Text>
            <Text size="sm" c="dimmed">
              • Drawer and Popover both use <code>trapFocus</code> and <code>closeOnEscape</code> for accessibility
            </Text>
            <Text size="sm" c="dimmed">
              • ScrollArea components ensure content is scrollable without affecting page scroll
            </Text>
            <Text size="sm" c="dimmed">
              • Game log automatically updates with new entries (last 20 kept in state)
            </Text>
          </Stack>
        </div>
      </Stack>
    </div>
  );
}
