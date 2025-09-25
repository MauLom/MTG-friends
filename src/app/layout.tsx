import type { Metadata } from 'next';
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
        {children}
      </body>
    </html>
  );
}