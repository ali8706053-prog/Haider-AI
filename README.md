# 🎙️ Ringwell AI — Next-Gen Voice AI & Business Automation Agency

A modern, high-performance website engineered for **Ringwell AI**, an agency specializing in 24/7 autonomous AI voice receptionists, intelligent appointment scheduling, and CRM automations.

Built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## ⚡ Quick Start & Local Preview

The development server is currently running locally. You can preview the website at:

👉 **[http://localhost:3000](http://localhost:3000)**

To run or stop the server manually at any time:

```bash
# Start local development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

---

## 🛠️ How to Edit Content & Pricing

All key business data has been isolated in simple TypeScript configuration files in `src/data/` so you can edit prices, text, services, and FAQs without touching complex UI code:

1. **Pricing Tiers & Features**:
   - File: [`src/data/pricing.ts`](file:///e:/AI%20Voice%20Agents/Haider%20Receptionist/src/data/pricing.ts)
   - Edit monthly prices, annual discount rates, setup fees, minutes included, and feature bullet points.

2. **Services & Capabilities**:
   - File: [`src/data/services.ts`](file:///e:/AI%20Voice%20Agents/Haider%20Receptionist/src/data/services.ts)
   - Edit agency service descriptions, sub-headings, badges, and deliverables.

3. **Target Industries & Vertical Metrics**:
   - File: [`src/data/industries.ts`](file:///e:/AI%20Voice%20Agents/Haider%20Receptionist/src/data/industries.ts)
   - Edit industry stats (Dental, Legal, HVAC, Real Estate, Automotive, Financial) and use cases.

4. **Interactive Audio Simulator & Transcripts**:
   - File: [`src/data/audioSamples.ts`](file:///e:/AI%20Voice%20Agents/Haider%20Receptionist/src/data/audioSamples.ts)
   - Edit persona names, caller dialogue lines, and latency metrics.

5. **Frequently Asked Questions**:
   - File: [`src/data/faqs.ts`](file:///e:/AI%20Voice%20Agents/Haider%20Receptionist/src/data/faqs.ts)
   - Add or modify questions and answers.

---

## 🔌 Retell AI & Automation Architecture (Future Integration)

The codebase has been engineered with clean, modular contracts for future external services in `src/lib/`:

- **Retell AI Voice Client**: [`src/lib/retell-client.ts`](file:///e:/AI%20Voice%20Agents/Haider%20Receptionist/src/lib/retell-client.ts)
  - Prepared typed interfaces for Web Calls, Agent IDs, and Webhook payloads.
  - To connect: add `RETELL_API_KEY` and `RETELL_AGENT_ID` in `.env.local`.

- **CRM & Webhook Dispatch**: [`src/lib/crm-webhook.ts`](file:///e:/AI%20Voice%20Agents/Haider%20Receptionist/src/lib/crm-webhook.ts)
  - Automatically dispatches form leads to Make.com, Zapier, GoHighLevel, or HubSpot when `CRM_WEBHOOK_URL` is set in `.env.local`.

- **Calendar Booking**: [`src/lib/booking.ts`](file:///e:/AI%20Voice%20Agents/Haider%20Receptionist/src/lib/booking.ts)
  - Embed your Cal.com or Calendly scheduling link via `NEXT_PUBLIC_BOOKING_URL`.

---

## 🎨 Design & Aesthetic Notes

- **Palette**: Pitch-black backgrounds (`#030712`, `#0B0F19`), crisp white typography, electric cyan and sapphire blue glowing accents.
- **Hero Reference**: Faithful adaptation of the layout reference featuring the bold headline *"Never Miss Another Opportunity"*, split narrative column, social proof avatar stack, and 3 floating 3D glassmorphic feature cards.
- **Responsiveness**: Fully optimized for mobile phones, tablets, laptops, and ultra-wide displays.
