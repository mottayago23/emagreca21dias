"use client"

import type React from "react"
import { useState, useEffect } from "react"

export default function VSLLandingPage() {
  const [viewers, setViewers] = useState(2840)
  const [iframeSrc, setIframeSrc] = useState("")
  const [userComment, setUserComment] = useState("")
  const [chatMessages, setChatMessages] = useState([
    { user: "Maria S.", message: "Não acredito que isso existe…", time: "agora mesmo" },
    { user: "João P.", message: "Já liberei o acesso do meu alvo kkkkk", time: "há 1 min" },
    { user: "Carlos R.", message: "Funciona mesmo gente!", time: "há 2 min" },
  ])

  const messageBank = [
    { user: "Ana L.", message: "Melhor ferramenta que já vi" },
    { user: "Pedro M.", message: "Incrível, muito obrigado!" },
    { user: "Julia K.", message: "Consegui ver tudo, valeu!" },
    { user: "Ricardo F.", message: "Caramba, funciona mesmo!" },
    { user: "Fernanda B.", message: "Isso é real gente?" },
    { user: "Lucas T.", message: "Já consegui acessar aqui!" },
    { user: "Camila R.", message: "Perfeito demais!" },
    { user: "Bruno S.", message: "Não to acreditando kkkkk" },
    { user: "Patricia N.", message: "Melhor coisa que descobri hoje" },
    { user: "Rafael D.", message: "Vlw msm, funcionou!" },
    { user: "Juliana M.", message: "Gente, é sério isso?" },
    { user: "Thiago A.", message: "Top demais essa ferramenta" },
    { user: "Amanda P.", message: "Consegui! Obrigada!" },
    { user: "Gabriel L.", message: "Sensacional cara!" },
    { user: "Larissa V.", message: "Quero mais disso kkk" },
    { user: "Mateus O.", message: "Valeu pela dica!" },
    { user: "Bianca S.", message: "Melhor live que já vi" },
    { user: "Felipe G.", message: "Isso é muito bom!" },
    { user: "Mariana C.", message: "Tô impressionada!" },
    { user: "Diego H.", message: "Acabei de testar, funciona!" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((prev) => {
        const change = Math.floor(Math.random() * 20) - 10
        const newValue = prev + change
        return Math.max(2500, Math.min(5000, newValue))
      })
    }, 15000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script")
      script.src = "https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js"
      script.async = true
      if (!document.querySelector('script[src*="smartplayer-wc/v4/sdk.js"]')) {
        document.head.appendChild(script)
      }

      const src =
        "https://scripts.converteai.net/fa1f35ed-91d5-410b-8a15-3fbfd9b0f1ad/players/693b7511c33297495ef78de2/v4/embed.html" +
        (window.location.search || "?") +
        "&vl=" +
        encodeURIComponent(window.location.href)
      setIframeSrc(src)
    }
  }, [])

  useEffect(() => {
    let messageIndex = 0
    const vslDuration = 105000
    const messageInterval = 8000

    const interval = setInterval(() => {
      if (messageIndex < messageBank.length) {
        const newMessage = {
          ...messageBank[messageIndex],
          time: "agora mesmo",
        }

        setChatMessages((prev) => {
          const updatedMessages = prev.map((msg, idx) => {
            if (idx === 0) return { ...msg, time: "há 1 min" }
            if (idx === 1) return { ...msg, time: "há 2 min" }
            if (idx === 2) return { ...msg, time: "há 3 min" }
            return msg
          })

          return [newMessage, ...updatedMessages].slice(0, 6)
        })

        messageIndex++
      }
    }, messageInterval)

    const timeout = setTimeout(() => {
      clearInterval(interval)
    }, vslDuration)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  const handleUserComment = (e: React.FormEvent) => {
    e.preventDefault()

    if (userComment.trim()) {
      const newMessage = {
        user: "usuário",
        message: userComment,
        time: "agora mesmo",
      }

      setChatMessages((prev) => {
        const updatedMessages = prev.map((msg, idx) => {
          if (idx === 0) return { ...msg, time: "há 1 min" }
          if (idx === 1) return { ...msg, time: "há 2 min" }
          if (idx === 2) return { ...msg, time: "há 3 min" }
          return msg
        })

        return [newMessage, ...updatedMessages].slice(0, 6)
      })

      setUserComment("")
    }
  }

  return (
    <div className="min-h-screen bg-[#020409] text-white relative overflow-hidden">
      <MatrixRain />

      <div className="relative z-10 max-w-[480px] mx-auto px-6 py-8">
        <div className="flex justify-center mb-6">
          <img src="/images/image.png" alt="DeepGram Logo" className="h-16 w-auto" />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
            Assista o vídeo e libere o acesso completo.
          </h1>
        </div>

        <div className="mb-4">
          <div className="mb-3">
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

          <div className="text-center mb-3">
            <span className="text-[#ffd700] font-semibold text-sm">{viewers.toLocaleString("pt-BR")}</span>
            <span className="text-white font-normal text-sm ml-1">pessoas assistindo agora</span>
          </div>
        </div>

        <div className="bg-black/40 border border-gray-800 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-800">
            <div className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400 uppercase font-semibold">Chat da Live</span>
          </div>

          <div className="space-y-3 max-h-48 overflow-y-auto mb-3">
            {chatMessages.map((msg, i) => (
              <div key={`${msg.user}-${i}`} className="text-sm">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[#00ff88] font-semibold text-xs">{msg.user}</span>
                  <span className="text-gray-600 text-xs">– {msg.time}</span>
                </div>
                <p className="text-gray-300 text-xs">{msg.message}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleUserComment} className="flex gap-2 pt-3 border-t border-gray-800">
            <input
              type="text"
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              placeholder="Digite seu comentário..."
              className="flex-1 bg-black/60 border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00ff88] transition-colors"
            />
            <button
              type="submit"
              className="bg-white hover:bg-gray-200 text-black font-semibold px-4 py-2 rounded text-sm transition-colors"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 136, 0.3);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 136, 0.5);
        }
      `}</style>
    </div>
  )
}

function MatrixRain() {
  const [drops, setDrops] = useState<
    Array<{ id: number; left: string; delay: string; duration: string; color: string; chars: string }>
  >([])

  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*"
    const colors = ["#ff1744", "#ff4081", "#f50057", "#e91e63", "#c2185b", "#ff6090"]

    const columnCount = typeof window !== "undefined" ? Math.floor(window.innerWidth / 18) : 80

    const newDrops = Array.from({ length: columnCount }, (_, i) => {
      const columnChars = Array.from({ length: 35 }, () => chars[Math.floor(Math.random() * chars.length)]).join("\n")

      return {
        id: i,
        left: `${i * 18}px`,
        delay: `${Math.random() * 5}s`,
        duration: `${10 + Math.random() * 15}s`,
        color: colors[Math.floor(Math.random() * colors.length)],
        chars: columnChars,
      }
    })

    setDrops(newDrops)
  }, [])

  return (
    <>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {drops.map((drop) => (
          <div
            key={drop.id}
            className="absolute top-0 text-xs font-mono leading-tight opacity-35"
            style={{
              left: drop.left,
              animation: `matrix-fall ${drop.duration} linear infinite`,
              animationDelay: drop.delay,
              color: drop.color,
              whiteSpace: "pre",
            }}
          >
            {drop.chars}
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes matrix-fall {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          5% {
            opacity: 0.35;
          }
          95% {
            opacity: 0.35;
          }
          100% {
            transform: translateY(calc(100vh + 100%));
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}
