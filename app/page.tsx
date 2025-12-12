"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

export default function VSLPage() {
  const [viewers, setViewers] = useState(2840)
  const [messages, setMessages] = useState([
    { name: "Maria S.", text: "Consegui ver todos os directs! DeepGram é incrível 😱", time: "Agora mesmo" },
    { name: "João P.", text: "Acessei o perfil que eu queria, valeu demais!", time: "Há 1 min" },
    { name: "Ana Costa", text: "DeepGram funcionou perfeitamente! Estou chocada", time: "Há 2 min" },
    { name: "Carlos M.", text: "Melhor ferramenta que já usei pra stalkear", time: "Há 3 min" },
    { name: "Beatriz L.", text: "Vi até os stories ocultos! Isso é real demais", time: "Há 4 min" },
    { name: "Rafael S.", text: "DeepGram me ajudou muito, recomendo!", time: "Há 5 min" },
  ])
  const [newComment, setNewComment] = useState("")
  const [iframeSrc, setIframeSrc] = useState("")
  const [showConfetti, setShowConfetti] = useState(false)
  const [showOffer, setShowOffer] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  const allMessages = [
    "Consegui ver todos os directs! DeepGram é incrível 😱",
    "Acessei o perfil que eu queria, valeu demais!",
    "DeepGram funcionou perfeitamente! Estou chocada",
    "Melhor ferramenta que já usei pra stalkear",
    "Vi até os stories ocultos! Isso é real demais",
    "DeepGram me ajudou muito, recomendo!",
    "Liberei o acesso em menos de 1 minuto com DeepGram",
    "Inacreditável como o DeepGram funciona bem",
    "Consegui ver a localização em tempo real!",
    "Os directs antigos apareceram todos aqui",
    "DeepGram é top demais, sério!",
    "Finalmente achei algo que realmente funciona",
    "Vi os melhores amigos dela, que ferramenta!",
    "O relatório de IA é muito completo, amei",
    "DeepGram vale cada centavo, sério",
    "Consegui monitorar tudo que eu queria",
    "Melhor investimento que já fiz",
    "DeepGram mudou minha vida 🔥",
    "Estou sem palavras com essa ferramenta",
    "Recomendo DeepGram pra todo mundo!",
  ]

  const names = [
    "Lucas M.",
    "Fernanda R.",
    "Pedro H.",
    "Julia S.",
    "Ricardo P.",
    "Amanda L.",
    "Bruno C.",
    "Larissa F.",
    "Diego A.",
    "Camila N.",
    "Thiago B.",
    "Patricia K.",
    "Mateus V.",
    "Isabela G.",
    "Rodrigo T.",
  ]

  useEffect(() => {
    const existingScript = document.querySelector('script[src*="smartplayer-wc"]')
    if (!existingScript) {
      const script = document.createElement("script")
      script.src = "https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js"
      script.async = true
      document.head.appendChild(script)
    }

    const currentUrl = typeof window !== "undefined" ? window.location.href : ""
    const src = `https://scripts.converteai.net/fa1f35ed-91d5-410b-8a15-3fbfd9b0f1ad/players/693b7511c33297495ef78de2/v4/embed.html${window.location.search || "?"}&vl=${encodeURIComponent(currentUrl)}`
    setIframeSrc(src)

    let hasTriggered = false

    const handleMessage = (event: MessageEvent) => {
      if (event.data && typeof event.data === "object" && !hasTriggered) {
        if (event.data.type === "videoEnded") {
          hasTriggered = true
          setShowOffer(true)
          setShowConfetti(true)
          setTimeout(() => setShowConfetti(false), 4000)
        }
      }
    }

    window.addEventListener("message", handleMessage)

    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, []) // Array de dependências vazio para executar apenas uma vez

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
      {showConfetti && <Confetti />}

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-6">
          <img src="/images/logo-deepgram.png" alt="DeepGram Logo" className="mx-auto mb-6 h-16 w-auto" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Assista o vídeo e libere o acesso completo.</h1>
        </div>

        <div className="mb-6">
          <div id="ifr_693b7511c33297495ef78de2_wrapper" className="mx-auto w-full max-w-md">
            <div className="relative" style={{ paddingTop: "177.78%" }} id="ifr_693b7511c33297495ef78de2_aspect">
              {iframeSrc && (
                <iframe
                  frameBorder="0"
                  allowFullScreen
                  src={iframeSrc}
                  id="ifr_693b7511c33297495ef78de2"
                  className="absolute top-0 left-0 w-full h-full"
                  referrerPolicy="origin"
                />
              )}
            </div>
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-lg">
            <span style={{ color: "#ffd700" }} className="font-bold">
              {viewers.toLocaleString()}
            </span>
            <span className="text-white"> pessoas assistindo agora</span>
          </p>
        </div>

        {showOffer && (
          <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-white rounded-xl p-6 mb-6 shadow-2xl animate-fade-in">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-yellow-400 mb-2">🎉 PARABÉNS! 🎉</h2>
              <p className="text-white text-lg font-semibold">Você foi sorteado para acesso vitalício!</p>
            </div>

            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-gray-400 line-through text-lg">De R$ 279,90</span>
                <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">-86%</span>
              </div>
              <div className="text-5xl font-bold text-yellow-400 mb-1">R$ 39,90</div>
              <p className="text-gray-400 text-sm">Pagamento único</p>
            </div>

            <div className="space-y-2 mb-6 text-left">
              <div className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">✓</span>
                <p className="text-white text-sm leading-relaxed">
                  <strong>Acesso completo ao perfil</strong>
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">✓</span>
                <p className="text-white text-sm leading-relaxed">
                  <strong>Stories ocultos ou postados apenas para melhores amigos</strong>
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">✓</span>
                <p className="text-white text-sm leading-relaxed">
                  <strong>Acesso a mídia (fotos e vídeos) recebidos e enviados</strong>
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">✓</span>
                <p className="text-white text-sm leading-relaxed">
                  <strong>Directs em tempo real e directs antigos (até 18 meses atrás)</strong>
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">✓</span>
                <p className="text-white text-sm leading-relaxed">
                  <strong>Localização em tempo real e locais visitados frequentes</strong>
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-yellow-500 text-lg flex-shrink-0">★</span>
                <p className="text-white text-sm leading-relaxed">
                  <strong>Notificações em tempo real de tudo que acontecer na conta</strong>
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-yellow-500 text-lg flex-shrink-0">★</span>
                <p className="text-white text-sm leading-relaxed">
                  <strong>Relatório detalhado do perfil com análise de IA</strong>
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-yellow-500 text-lg flex-shrink-0">★</span>
                <p className="text-white text-sm leading-relaxed">
                  <strong>Stalkear quantos perfis quiser (ILIMITADO)</strong>
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">✓</span>
                <p className="text-white text-sm leading-relaxed">
                  <strong>Acesso vitalício</strong>
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">✓</span>
                <p className="text-white text-sm leading-relaxed">
                  <strong>Sem mensalidades</strong>
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">✓</span>
                <p className="text-white text-sm leading-relaxed">
                  <strong>Localizações antigas e relatório de locais mais visitados</strong>
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">✓</span>
                <p className="text-white text-sm leading-relaxed">
                  <strong>Direct antigos (até 18 meses atrás)</strong>
                </p>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-6 rounded-lg text-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              PAGAR TAXA DE ACESSO
            </button>

            <p className="text-center text-gray-400 text-xs mt-4">🔒 Pagamento 100% seguro e criptografado</p>
          </div>
        )}

        <div className="bg-black/80 border-2 border-white rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
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

function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    interface Particle {
      x: number
      y: number
      size: number
      speedY: number
      speedX: number
      color: string
      rotation: number
      rotationSpeed: number
    }

    const particles: Particle[] = []
    const colors = ["#FFD700", "#FFA500", "#FF69B4", "#00FF00", "#00BFFF", "#FF1493", "#FFFF00"]

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 4,
        speedY: Math.random() * 3 + 2,
        speedX: Math.random() * 2 - 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 4 - 2,
      })
    }

    function animate() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        ctx.save()
        ctx.translate(particle.x, particle.y)
        ctx.rotate((particle.rotation * Math.PI) / 180)
        ctx.fillStyle = particle.color
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
        ctx.restore()

        particle.y += particle.speedY
        particle.x += particle.speedX
        particle.rotation += particle.rotationSpeed

        if (particle.y > canvas.height) {
          particle.y = -10
          particle.x = Math.random() * canvas.width
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 50 }} />
}
