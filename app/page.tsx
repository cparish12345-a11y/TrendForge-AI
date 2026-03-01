'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'  // from earlier steps

export default function Home() {
  const [session, setSession] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [balance, setBalance] = useState(247893.42)
  const [followers, setFollowers] = useState(2400000)
  const [generated, setGenerated] = useState('')
  const [niche, setNiche] = useState('Thirsty OnlyFans Clout')
  const [log, setLog] = useState([])

  // Load session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  // Sign up or login
  const handleAuth = async () => {
    if (!email || !password) return alert('Enter email and password')

    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
      // If user already exists, try to log in instead
      if (error.message.includes('already registered')) {
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (loginError) return alert(loginError.message)
        setSession(loginData.session)
        alert('Logged in!')
      } else {
        alert(error.message)
      }
    } else {
      setSession(data.session)
      alert('Account created & logged in!')
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
  }

  const forgeContent = () => {
    if (!session) return alert('Sign in first!')

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

  if (!session) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 font-mono">
        <div className="bg-gray-900 p-10 rounded-2xl border-4 border-green-600 w-full max-w-md">
          <h1 className="text-5xl font-black text-pink-500 text-center mb-8">TREND FORGE AI</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-4 mb-4 bg-gray-800 border-2 border-green-500 rounded-xl text-white text-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-4 mb-6 bg-gray-800 border-2 border-green-500 rounded-xl text-white text-lg"
          />
          <button 
            onClick={handleAuth}
            className="w-full bg-pink-600 hover:bg-pink-500 text-white font-black py-6 text-3xl rounded-2xl"
          >
            SIGN UP / LOGIN
          </button>
          <p className="text-center text-gray-500 mt-6 text-lg">
            Use any email + password (test mode — no verification needed)
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-green-400 p-6 md:p-10 font-mono">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl md:text-6xl font-black text-pink-500">TREND FORGE AI</h1>
        <button 
          onClick={signOut}
          className="bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-8 rounded-xl text-xl"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gray-900 p-6 rounded-xl border-4 border-green-600 text-center">
          <h2 className="text-2xl mb-2">Balance</h2>
          <p className="text-4xl font-bold">${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl border-4 border-green-600 text-center">
          <h2 className="text-2xl mb-2">Followers</h2>
          <p className="text-4xl font-bold">{(followers / 1000000).toFixed(1)}M</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl border-4 border-green-600 text-center">
          <h2 className="text-2xl mb-2">Live Forgers</h2>
          <p className="text-4xl text-red-500 animate-pulse">~18,420</p>
        </div>
      </div>

      <div className="bg-gray-900 p-8 rounded-xl border-4 border-green-600 mb-8">
        <h2 className="text-3xl mb-4">Pick Niche</h2>
        <select 
          value={niche} 
          onChange={e => setNiche(e.target.value)}
          className="w-full p-5 bg-gray-800 border-2 border-green-500 rounded-xl text-2xl text-white"
        >
          <option>Thirsty OnlyFans Clout</option>
          <option>Crypto Pump Signals</option>
          <option>Fitness Lies</option>
          <option>Portland Weed Reviews</option>
        </select>
      </div>

      <button 
        onClick={forgeContent}
        className="w-full bg-pink-600 hover:bg-pink-500 text-white font-black py-10 text-5xl rounded-2xl mb-8"
      >
        FORGE VIRAL CONTENT NOW
      </button>

      {generated && (
        <div className="bg-gray-900 p-8 rounded-xl border-4 border-green-600 mb-8 whitespace-pre-wrap text-2xl leading-relaxed">
          {generated}
        </div>
      )}

      <div className="bg-gray-900 p-8 rounded-xl border-4 border-green-600">
        <h2 className="text-3xl mb-4">Live Log</h2>
        {log.length === 0 ? (
          <p className="text-gray-500 text-xl">Hit the button to start forging...</p>
        ) : (
          log.map((entry, i) => (
            <p key={i} className="text-red-400 mb-2 text-xl border-b border-gray-700 pb-2">{entry}</p>
          ))
        )}
      </div>

      <p className="text-center text-xl mt-8 text-green-300">
        Logged in as {session.user.email}
      </p>
    </div>
  )
}