import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fashion Configurator',
  description: 'Customize your sneakers in 3D',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

