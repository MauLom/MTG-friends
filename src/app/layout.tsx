import type { Metadata } from 'next';
import { MantineProvider } from '@/components/providers/MantineProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'MTG Friends - Play Magic Online',
  description: 'Play Magic: The Gathering with your friends online',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <MantineProvider>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}