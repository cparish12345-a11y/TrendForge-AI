'use client'

import { useState } from 'react'

export default function Home() {
  const [balance, setBalance] = useState(247893.42)
  const [followers, setFollowers] = useState(2400000)
  const [generated, setGenerated] = useState('')
  const [niche, setNiche] = useState('Thirsty OnlyFans Clout')
  const [log, setLog] = useState<string[]>([])

  const forgeContent = () => {
    const bangers = [
      `POV: Your ${niche} post just made $12k in tips while you slept.`,
      `TrendForge AI just turned your ${niche} account into a cash printer.`
    ]
    const random = bangers[Math.floor(Math.random() * bangers.length)]

    setGenerated(`🔥 ${niche.toUpperCase()} BANGER 🔥\n\n${random}\n\n#TrendForgeAI #PortlandRich`)

    setBalance(prev => prev + 1247.69 + Math.random() * 2000)
    setFollowers(prev => prev + 87342 + Math.floor(Math.random() * 70000))

    setLog(prev => [`${new Date().toLocaleTimeString()} — Forged viral content (3.8M views projected)`, ...prev.slice(0, 8)])
  }

  return (
    <div className="min-h-screen bg-black text-green-400 p-8 font-mono">
      <h1 className="text-6xl font-black text-pink-500 text-center mb-12">TREND FORGE AI</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-gray-900 p-8 rounded-2xl border-4 border-green-600 text-center">
          <h2 className="text-3xl mb-2">Balance</h2>
          <p className="text-5xl font-bold">${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-gray-900 p-8 rounded-2xl border-4 border-green-600 text-center">
          <h2 className="text-3xl mb-2">Followers</h2>
          <p className="text-5xl font-bold">{(followers / 1000000).toFixed(1)}M</p>
        </div>
        <div className="bg-gray-900 p-8 rounded-2xl border-4 border-green-600 text-center">
          <h2 className="text-3xl mb-2">Live Forgers</h2>
          <p className="text-5xl text-red-500 animate-pulse">~18,420</p>
        </div>
      </div>

      <div className="bg-gray-900 p-8 rounded-2xl border-4 border-green-600 mb-10">
        <h2 className="text-4xl mb-4">Pick Niche</h2>
        <select 
          value={niche} 
          onChange={e => setNiche(e.target.value)}
          className="w-full p-5 bg-gray-800 border-2 border-green-500 rounded-xl text-2xl"
        >
          <option>Thirsty OnlyFans Clout</option>
          <option>Crypto Pump Signals</option>
          <option>Fitness Lies</option>
          <option>Portland Weed Reviews</option>
        </select>
      </div>

      <button 
        onClick={forgeContent}
        className="w-full bg-pink-600 hover:bg-pink-500 text-white font-black py-10 text-5xl rounded-2xl mb-12"
      >
        FORGE VIRAL CONTENT NOW
      </button>

      {generated && (
        <div className="bg-gray-900 p-8 rounded-2xl border-4 border-green-600 mb-12 whitespace-pre-wrap text-2xl">
          {generated}
        </div>
      )}

      <div className="bg-gray-900 p-8 rounded-2xl border-4 border-green-600">
        <h2 className="text-4xl mb-4">Live Log</h2>
        {log.map((entry, i) => <p key={i} className="text-red-400 mb-2 text-xl">{entry}</p>)}
        {log.length === 0 && <p className="text-gray-500">Hit the button, king...</p>}
      </div>
    </div>
  )
}