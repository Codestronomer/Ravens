import './globals.css'
import type { Metadata } from 'next'
import { Inter, Montserrat, Bree_Serif } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin']});
const bree_Serif = Bree_Serif({ weight: "400", subsets: ['latin']});

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
      <body className={bree_Serif.className}>
          {children}
      </body>
    </html>
  )
}
