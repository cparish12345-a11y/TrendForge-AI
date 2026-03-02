import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [
      {
        price: 'price_1T6JbJJ6Nv5y4cnm1VgR1hCh',  // ← REPLACE WITH YOUR REAL PRICE ID
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://trendforge-esky8xubd-cparish12345-a11ys-projects.vercel.app'}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://trendforge-esky8xubd-cparish12345-a11ys-projects.vercel.app'}/cancel`,
  })

  return NextResponse.json({ url: session.url })
}