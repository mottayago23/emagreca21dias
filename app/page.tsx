"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

export default function VSLPage() {
  const [viewers, setViewers] = useState(2840)
  const [messages, setMessages] = useState([
    { name: "Julia S.", text: "Consegui ver a localização em tempo real!", time: "Agora mesmo" },
    { name: "Rodrigo T.", text: "Inacreditável como o DeepGram funciona bem", time: "Agora mesmo" },
    { name: "Pedro H.", text: "Liberei o acesso em menos de 1 minuto com DeepGram", time: "Há 1 min" },
    { name: "Ana Costa", text: "Funciona mesmo! Estou em choque 😱", time: "Há 2 min" },
    { name: "Carlos M.", text: "Melhor ferramenta que já usei", time: "Há 3 min" },
    { name: "Fernanda R.", text: "Consegui monitorar tudo que eu queria", time: "Agora mesmo" },
  ])
  const [newComment, setNewComment] = useState("")
  const [showOffer, setShowOffer] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  const allMessages = [
    "Consegui ver a localização em tempo real!",
    "Inacreditável como o DeepGram funciona bem",
    "Liberei o acesso em menos de 1 minuto com DeepGram",
    "Funciona mesmo! Estou em choque 😱",
    "Melhor ferramenta que já usei",
    "Consegui monitorar tudo que eu queria",
    "DeepGram mudou minha vida 🔥",
    "Estou sem palavras com essa ferramenta",
    "Recomendo DeepGram pra todo mundo!",
    "Vi até os stories ocultos! Isso é real demais",
    "DeepGram me ajudou muito, recomendo!",
    "Os directs antigos apareceram todos aqui",
  ]

  const names = [
    "Julia S.",
    "Rodrigo T.",
    "Pedro H.",
    "Ana Costa",
    "Carlos M.",
    "Fernanda R.",
    "Larissa F.",
    "Amanda L.",
    "Ricardo P.",
    "Isabela G.",
  ]

  useEffect(() => {
    const viewerInterval = setInterval(() => {
      setViewers((prev) => prev + Math.floor(Math.random() * 3) - 1)
    }, 15000)

    return () => clearInterval(viewerInterval)
  }, [])

  useEffect(() => {
    let messageIndex = 6
    const messageInterval = setInterval(() => {
      if (messageIndex < allMessages.length) {
        const randomName = names[Math.floor(Math.random() * names.length)]
        const randomMessage = allMessages[messageIndex]
        const newMessage = {
          name: randomName,
          text: randomMessage,
          time: "Agora mesmo",
        }
        setMessages((prev) => [newMessage, ...prev.slice(0, 5)])
        messageIndex++
      } else {
        messageIndex = 0
      }
    }, 8000)

    return () => clearInterval(messageInterval)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOffer(true)
    }, 105000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const scriptExists = document.querySelector(
      'script[src="https://scripts.converteai.net/fa1f35ed-91d5-410b-8a15-3fbfd9b0f1ad/players/693b7511c33297495ef78de2/v4/player.js"]',
    )

    if (!scriptExists) {
      const script = document.createElement("script")
      script.src =
        "https://scripts.converteai.net/fa1f35ed-91d5-410b-8a15-3fbfd9b0f1ad/players/693b7511c33297495ef78de2/v4/player.js"
      script.async = true
      document.head.appendChild(script)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      const userMessage = {
        name: "usuário",
        text: newComment,
        time: "Agora mesmo",
      }
      setMessages((prev) => [userMessage, ...prev.slice(0, 5)])
      setNewComment("")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <MatrixRain />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-6">
          <img src="/images/image.png" alt="DeepGram Logo" className="mx-auto mb-6 h-16 w-auto" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Assista o vídeo e libere o acesso completo.</h1>
        </div>

        <div className="mb-4">
          <vturb-smartplayer
            id="vid-693b7511c33297495ef78de2"
            style={{ display: "block", margin: "0 auto", width: "100%", maxWidth: "400px" }}
          />
        </div>

        <div className="text-center mb-4">
          <p className="text-lg">
            <span style={{ color: "#ffd700" }} className="font-bold">
              {viewers.toLocaleString()}
            </span>
            <span className="text-white"> pessoas assistindo agora</span>
          </p>
        </div>

        {showOffer && (
          <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-white rounded-lg p-6 mb-4 animate-fade-in">
            <h2 className="text-2xl font-bold text-center mb-2">🎉 PARABÉNS! 🎉</h2>
            <p className="text-center text-xl font-semibold mb-4">Você foi sorteado para acesso vitalício!</p>

            <div className="text-center mb-6">
              <p className="text-gray-400 line-through text-lg mb-1">De R$ 279,90</p>
              <p className="text-red-500 text-xl font-bold mb-1">-79%</p>
              <p className="text-4xl font-bold mb-1" style={{ color: "#ffd700" }}>
                R$ 59,90
              </p>
              <p className="text-green-400 text-sm font-semibold">Pagamento único</p>
            </div>

            <div className="space-y-2 mb-6 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-green-500 text-lg">✓</span>
                <p className="text-white font-medium">Acesso completo ao perfil</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 text-lg">✓</span>
                <p className="text-white font-medium">Stories ocultos ou postados apenas para melhores amigos</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 text-lg">✓</span>
                <p className="text-white font-medium">Acesso a mídia (fotos e vídeos) recebidos e enviados</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 text-lg">✓</span>
                <p className="text-white font-medium">Directs em tempo real e directs antigos (até 18 meses atrás)</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 text-lg">✓</span>
                <p className="text-white font-medium">Localização em tempo real e locais visitados frequentes</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-yellow-400 text-lg">★</span>
                <p className="text-white font-medium">Notificações em tempo real de tudo que acontecer na conta</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-yellow-400 text-lg">★</span>
                <p className="text-white font-medium">Relatório detalhado do perfil com análise de IA</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-yellow-400 text-lg">★</span>
                <p className="text-white font-medium">Stalkear quantos perfis quiser (ILIMITADO)</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 text-lg">✓</span>
                <p className="text-white font-medium">Acesso vitalício</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 text-lg">✓</span>
                <p className="text-white font-medium">Sem mensalidades</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 text-lg">✓</span>
                <p className="text-white font-medium">Localizações antigas e relatório de locais mais visitados</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 text-lg">✓</span>
                <p className="text-white font-medium">Direct antigos (até 18 meses atrás)</p>
              </div>
            </div>

            <a
              href="https://pay.kirvano.com/d1068743-15df-4ede-bbcc-aa9db15cbb01"
              className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-xl font-bold py-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all text-center transform hover:scale-105"
            >
              PAGAR TAXA DE ACESSO
            </a>
          </div>
        )}

        <div className="bg-black/80 border-2 border-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <h3 className="text-green-400 font-semibold text-sm uppercase tracking-wider">Chat da Transmissão</h3>
          </div>

          <div ref={chatRef} className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {messages.map((msg, idx) => (
              <div key={idx} className="animate-fade-in">
                <p className="text-gray-400 text-sm font-semibold">
                  {msg.name} <span className="text-gray-500 text-xs ml-1">• {msg.time}</span>
                </p>
                <p className="text-white text-sm">{msg.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escreva um comentário..."
              className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
            />
            <button
              type="submit"
              className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition-colors"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const columns = Math.floor(canvas.width / 20)
    const drops: number[] = Array(columns).fill(1)

    const colors = ["#ff0066", "#ff3366", "#ff0080", "#cc0055", "#ff1a75"]

    function draw() {
      if (!ctx || !canvas) return

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = "14px monospace"

      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(Math.random() * 128)
        const color = colors[Math.floor(Math.random() * colors.length)]
        ctx.fillStyle = color
        ctx.globalAlpha = 0.35
        ctx.fillText(text, i * 20, drops[i] * 20)

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
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

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }} />
}
