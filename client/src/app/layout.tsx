/* eslint-disable @next/next/no-sync-scripts */
import './globals.css'
import type { Metadata } from 'next';
import { Provider } from './provider';
import { Inter, DM_Sans } from 'next/font/google';

const dm_sans = DM_Sans({ weight: 'variable', subsets: ['latin', 'latin-ext']});

export const metadata: Metadata = {
  title: 'Ravens',
  description: 'Real time chat application reimagined',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Provider>
        <body className={dm_sans.className} suppressHydrationWarning={true}>
          <script src="./../../public/noflash.js" />
          {children}
        </body>
      </Provider>
    </html>
  )
}
