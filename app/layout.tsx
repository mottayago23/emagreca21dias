import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VSL Landing Page - DeepGram",
  description: "Acesse o DeepGram e o perfil buscado",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <Script
          src="https://scripts.converteai.net/fa1f35ed-91d5-410b-8a15-3fbfd9b0f1ad/players/693b7511c33297495ef78de2/v4/player.js"
          strategy="beforeInteractive"
        />
        <Script src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js" strategy="beforeInteractive" />
        <Script src="https://cdn.utmify.com.br/scripts/utms/latest.js" strategy="lazyOnload" />
        <Script
          id="utmify-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.pixelId = "693647b69da3d8dfc66eb3aa";
            `,
          }}
        />
        <Script src="https://cdn.utmify.com.br/scripts/pixel/pixel.js" strategy="lazyOnload" />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
