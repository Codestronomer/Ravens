import './globals.css'
import type { Metadata } from 'next'
import { Inter, Montserrat, Bree_Serif, DM_Sans } from 'next/font/google'
import { Provider } from './provider';

const montserrat = Montserrat({ subsets: ['latin']});
const bree_Serif = Bree_Serif({ weight: "400", subsets: ['latin']});
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
            {children}
        </body>
      </Provider>
    </html>
  )
}
