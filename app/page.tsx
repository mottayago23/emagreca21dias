"use client"

import { useEffect, useState } from "react"

export default function Home() {
  const [viewers, setViewers] = useState(2831)
  const [messages, setMessages] = useState([
    { name: "Maria S.", text: "Não acredito que isso existe...", time: "Agora mesmo" },
    { name: "João P.", text: "Já liberei o acesso do meu alvo kkkkk", time: "Há 1 min" },
    { name: "Ana Costa", text: "Funciona mesmo! Estou em choque 😱", time: "Há 2 min" },
    { name: "Carlos M.", text: "Melhor ferramenta que já usei", time: "Há 3 min" },
    { name: "Beatriz L.", text: "Mano isso é real??? 😮", time: "Há 4 min" },
    { name: "Rafael S.", text: "Consegui ver tudo, valeu demais!", time: "Há 5 min" },
  ])
  const [userComment, setUserComment] = useState("")
  const [iframeSrc, setIframeSrc] = useState("")

  const allMessages = [
    "Não acredito que isso existe...",
    "Já liberei o acesso do meu alvo kkkkk",
    "Funciona mesmo! Estou em choque 😱",
    "Melhor ferramenta que já usei",
    "Mano isso é real??? 😮",
    "Consegui ver tudo, valeu demais!",
    "Isso é incrível, funcionou de primeira!",
    "Quem mais já conseguiu acesso?",
    "Valeu pela dica, tá perfeito!",
    "Não sabia que era tão fácil assim",
    "Show demais essa ferramenta",
    "Alguém mais testou? Funcionou aqui",
    "Caraca, que massa isso!",
    "Liberou aqui também 🔥",
    "Finalmente consegui!",
    "Isso vai ajudar muito",
    "Top demais, recomendo!",
    "Funcionou perfeitamente",
    "Valeu pela transmissão!",
    "Que ferramenta poderosa!",
  ]

  const names = [
    "Maria S.",
    "João P.",
    "Ana Costa",
    "Carlos M.",
    "Beatriz L.",
    "Rafael S.",
    "Lucas T.",
    "Fernanda A.",
    "Pedro H.",
    "Julia M.",
    "Ricardo P.",
    "Camila S.",
    "Bruno L.",
    "Mariana F.",
    "Diego R.",
  ]

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js"
    script.async = true
    document.head.appendChild(script)

    const searchParams = window.location.search || "?"
    const videoUrl = `https://scripts.converteai.net/fa1f35ed-91d5-410b-8a15-3fbfd9b0f1ad/players/693b7511c33297495ef78de2/v4/embed.html${searchParams}&vl=${encodeURIComponent(window.location.href)}`
    setIframeSrc(videoUrl)

    const viewersInterval = setInterval(() => {
      setViewers((prev) => {
        const change = Math.floor(Math.random() * 11) - 5
        return Math.max(2800, Math.min(2900, prev + change))
      })
    }, 15000)

    let messageIndex = 6
    const messagesInterval = setInterval(() => {
      if (messageIndex < 20) {
        const randomName = names[Math.floor(Math.random() * names.length)]
        const newMessage = {
          name: randomName,
          text: allMessages[messageIndex],
          time: "Agora mesmo",
        }
        setMessages((prev) => [newMessage, ...prev.slice(0, 5)])
        messageIndex++
      }
    }, 8000)

    return () => {
      clearInterval(viewersInterval)
      clearInterval(messagesInterval)
    }
  }, [])

  const handleSendComment = () => {
    if (userComment.trim()) {
      const newMessage = {
        name: "usuário",
        text: userComment,
        time: "Agora mesmo",
      }
      setMessages((prev) => [newMessage, ...prev.slice(0, 5)])
      setUserComment("")
    }
  }

  return (
    <>
      <MatrixRain />
      <div className="min-h-screen bg-black text-white relative z-10">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="flex justify-center mb-6">
            <img src="/images/logo-deepgram.png" alt="DeepGram Logo" className="h-16 w-auto" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Assista o vídeo e libere o acesso completo.
          </h1>

          <div className="mb-8">
            <div
              id="ifr_693b7511c33297495ef78de2_wrapper"
              style={{ margin: "0 auto", width: "100%", maxWidth: "400px" }}
            >
              <div style={{ position: "relative", padding: "100% 0 0 0" }} id="ifr_693b7511c33297495ef78de2_aspect">
                {iframeSrc && (
                  <iframe
                    frameBorder="0"
                    allowFullScreen
                    src={iframeSrc}
                    id="ifr_693b7511c33297495ef78de2"
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                    referrerPolicy="origin"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="text-center mb-8 text-lg">
            <span style={{ color: "#ffd700" }} className="font-bold">
              {viewers.toLocaleString()}
            </span>
            <span className="text-white"> pessoas assistindo agora</span>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <h2 className="text-lg font-semibold text-green-400">CHAT DA TRANSMISSÃO</h2>
            </div>

            <div className="space-y-3 mb-4 max-h-80 overflow-y-auto">
              {messages.map((msg, idx) => (
                <div key={idx} className="animate-fadeIn">
                  <div className="flex items-baseline gap-2">
                    <span className="text-green-400 font-semibold text-sm">{msg.name}</span>
                    <span className="text-zinc-500 text-xs">• {msg.time}</span>
                  </div>
                  <p className="text-zinc-300 text-sm mt-1">{msg.text}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-4 border-t border-zinc-800">
              <input
                type="text"
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendComment()}
                placeholder="Digite seu comentário..."
                className="flex-1 bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-green-500"
              />
              <button
                onClick={handleSendComment}
                className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function MatrixRain() {
  useEffect(() => {
    const canvas = document.getElementById("matrix-canvas") as HTMLCanvasElement
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?"
    const fontSize = 14
    const columns = canvas.width / fontSize

    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    const colors = ["#ff0066", "#ff0088", "#ff00aa", "#cc0066", "#dd0077"]

    function draw() {
      if (!ctx || !canvas) return

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const color = colors[Math.floor(Math.random() * colors.length)]

        ctx.fillStyle = color
        ctx.globalAlpha = 0.35
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)
        ctx.globalAlpha = 1

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas id="matrix-canvas" className="fixed inset-0 z-0 pointer-events-none" style={{ background: "#000" }} />
}
