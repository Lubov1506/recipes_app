import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "../providers/provider"
import Header from "../components/ui/layout/header"
import { siteConfig } from "../config/site.config"
import { layoutConfig } from "../config/layout.config"
import { SessionProvider } from "next-auth/react"
import { auth } from "../auth/auth"
import AppLoader from "../hoc/app-loader"
import Title from "../components/ui/layout/titile"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <SessionProvider session={session}>
            <AppLoader>
              <div className="flex flex-col justify-between min-h-screen">
                <Header />
                <main
                  className={`flex flex-col flex-1 max-w-[1024px] justify-start mx-auto    `}
                >
                <Title />
                  {children}
                </main>
                <footer
                  className={`flex justify-center items-center `}
                  style={{
                    height: `${layoutConfig.footerHeight}`,
                  }}
                >
                  <p>{siteConfig.description}</p>
                </footer>
              </div>
            </AppLoader>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  )
}
