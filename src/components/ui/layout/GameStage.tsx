'use client';

import React from 'react';
import { Container, Grid, Box, Stack } from '@mantine/core';
import { cn } from '@/lib/utils';

export interface GameStageProps extends React.HTMLAttributes<HTMLDivElement> {
  // Row 1 - Top: info | onTurn | actions
  info?: React.ReactNode;
  onTurn?: React.ReactNode;
  actions?: React.ReactNode;
  
  // Row 2 - Middle: prevLeft | hudCenter | prevRight
  prevLeft?: React.ReactNode;
  hudCenter?: React.ReactNode;
  prevRight?: React.ReactNode;
  
  // Row 3 - Bottom: self
  self?: React.ReactNode;
}

export default function GameStage({
  info,
  onTurn,
  actions,
  prevLeft,
  hudCenter,
  prevRight,
  self,
  className,
  ...props
}: GameStageProps) {
  return (
    <Container
      fluid
      className={cn('h-full p-4', className)}
      {...props}
    >
      <Stack gap="md" className="h-full">
        {/* Row 1: info | onTurn | actions (middle > sides) */}
        <Box className="min-h-[80px] max-h-[120px]">
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, sm: 3 }} order={{ base: 3, sm: 1 }}>
              <Box className="overflow-auto h-full max-h-[120px]">
                {info || (
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10 h-full">
                    <p className="text-white/50 text-sm">Info Panel</p>
                  </div>
                )}
              </Box>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }} order={{ base: 1, sm: 2 }}>
              <Box className="overflow-auto h-full max-h-[120px]">
                {onTurn || (
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10 h-full flex items-center justify-center">
                    <p className="text-white/50 text-sm text-center">Turn Tracker</p>
                  </div>
                )}
              </Box>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 3 }} order={{ base: 2, sm: 3 }}>
              <Box className="overflow-auto h-full max-h-[120px]">
                {actions || (
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10 h-full">
                    <p className="text-white/50 text-sm">Actions Panel</p>
                  </div>
                )}
              </Box>
            </Grid.Col>
          </Grid>
        </Box>

        {/* Row 2: prevLeft | hudCenter | prevRight (even) */}
        <Box className="flex-1 min-h-0">
          <Grid gutter="md" className="h-full">
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Box className="overflow-auto h-full">
                {prevLeft || (
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10 h-full">
                    <p className="text-white/50 text-sm">Previous Player (Left)</p>
                  </div>
                )}
              </Box>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Box className="overflow-auto h-full">
                {hudCenter || (
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10 h-full flex items-center justify-center">
                    <p className="text-white/50 text-sm text-center">HUD Center</p>
                  </div>
                )}
              </Box>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Box className="overflow-auto h-full">
                {prevRight || (
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10 h-full">
                    <p className="text-white/50 text-sm">Previous Player (Right)</p>
                  </div>
                )}
              </Box>
            </Grid.Col>
          </Grid>
        </Box>

        {/* Row 3: self (full width) */}
        <Box className="min-h-[150px] max-h-[200px]">
          <Box className="overflow-auto h-full">
            {self || (
              <div className="p-4 bg-white/5 rounded-lg border border-white/10 h-full">
                <p className="text-white/50 text-sm">Self Player Zone</p>
              </div>
            )}
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}
