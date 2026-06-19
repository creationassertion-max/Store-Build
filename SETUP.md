# LUMIÈRE — Setup Guide

## 1. Create a Neon Database

1. Go to [console.neon.tech](https://console.neon.tech)
2. Create a new project named `lumiere`
3. Copy the **Connection string** (postgresql://...)

## 2. Get Stripe Keys

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Navigate to **Developers → API Keys**
3. Copy both the **Secret key** (`sk_test_...`) and **Publishable key** (`pk_test_...`)

## 3. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in all values:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your real credentials.

## 4. Run Database Migrations & Seed

```bash
npx tsx db/seed.ts
```

This creates the schema and inserts all 30 products.

## 5. Local Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 6. Deploy to Vercel

### Option A: Via Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

### Option B: Via GitHub

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your repository
4. Add environment variables in **Project Settings → Environment Variables**:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Your Neon connection string |
| `STRIPE_SECRET_KEY` | `sk_test_...` or `sk_live_...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` or `pk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` |
| `NEXT_PUBLIC_SITE_URL` | `https://your-app.vercel.app` |

5. Click **Deploy**

## 7. Set Up Stripe Webhook (Production)

1. In Stripe dashboard: **Developers → Webhooks → Add endpoint**
2. URL: `https://your-app.vercel.app/api/webhooks/stripe`
3. Events to listen for: `checkout.session.completed`
4. Copy the **Signing secret** (`whsec_...`) → update `STRIPE_WEBHOOK_SECRET` in Vercel

## 8. Run E2E Tests (After Deployment)

```bash
PLAYWRIGHT_BASE_URL=https://your-app.vercel.app npx playwright test
```

Or locally against dev server:

```bash
npx playwright test
```
