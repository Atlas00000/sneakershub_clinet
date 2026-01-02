import type { Metadata } from 'next';
import './globals.css';
import { QueryProvider } from '@/components/providers/QueryProvider';
import ErrorBoundary from '@/components/error/ErrorBoundary';

export const metadata: Metadata = {
  title: 'SneakersHub - Design Your Perfect Sneakers',
  description: 'Create and customize your perfect sneakers in 3D with our interactive configurator. Choose from blank canvas or branded models.',
  keywords: ['sneakers', 'custom', '3D', 'configurator', 'design', 'shoes'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-charcoal-900 text-white antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

