import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
  const { niche } = await req.json()

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a viral social media genius. Write short, edgy, clickbait-style posts for TikTok/Instagram/X. Focus on money, clout, shock value. Include 4-6 hashtags.' },
      { role: 'user', content: `Generate one ultra-viral post for ${niche} niche.` },
    ],
  })

  const text = completion.choices[0].message.content || 'Error generating post'

  return NextResponse.json({ text })
}