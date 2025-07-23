import './globals.css';
import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/ThemeProvider';


const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Raghvendra\'s Portfolio',
  description: 'A showcase of my skills and projects',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={lexend.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
