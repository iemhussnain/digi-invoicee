# Digi Invoice ERP

Complete ERP System with FBR (Federal Board of Revenue) Integration for Pakistan.

## Features

- 🧾 **Sales & Purchase Management** - Registered and Unregistered flow
- 📦 **Inventory Management** - Dual stock tracking (Registered/Unregistered)
- 💰 **Accounting** - Double-entry bookkeeping, Financial statements
- 🏛️ **FBR Integration** - Digital invoicing with QR codes
- 👥 **HR & Payroll** - Employee management, Attendance, Salary processing
- 📊 **Advanced Reporting** - Ledger, Trial Balance, P&L, Balance Sheet
- 🔐 **Security** - NextAuth v5, Role-based access control
- 📱 **Modern UI** - Responsive design with Tailwind CSS + Shadcn UI

## Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **UI:** Tailwind CSS, Shadcn UI, Radix UI
- **State:** Zustand, TanStack Query
- **Forms:** React Hook Form + Zod
- **Tables:** AG Grid, TanStack Table
- **Charts:** Recharts

### Backend
- **Runtime:** Node.js
- **Database:** MongoDB + Mongoose
- **Auth:** NextAuth v5
- **Security:** Argon2, Helmet, Rate Limiting
- **Logging:** Pino
- **Monitoring:** Sentry

### Key Libraries
- **Financial Calculations:** Decimal.js
- **QR Code:** qrcode
- **PDF Generation:** @react-pdf/renderer
- **Email:** Nodemailer
- **Testing:** Vitest, Playwright

## Prerequisites

- Node.js >= 18.17.0
- npm >= 9.0.0
- MongoDB (local or Atlas)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd digi-invoicee
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your configuration:
- MongoDB connection string
- NextAuth secret
- FBR tokens (sandbox & production)
- Email credentials

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript errors
npm run format       # Format code with Prettier
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
```

## Project Structure

```
digi-invoicee/
├── app/                 # Next.js App Router
│   ├── (auth)/         # Auth routes (grouped)
│   ├── (dashboard)/    # Main app routes
│   └── api/            # API routes
├── components/         # React components
│   ├── ui/            # Shadcn components
│   └── ...
├── lib/               # Utilities
│   ├── db/           # Database
│   ├── accounting/   # Accounting engine
│   └── fbr/          # FBR integration
├── models/            # Mongoose models
├── services/          # Business logic
├── types/             # TypeScript types
├── hooks/             # Custom hooks
├── store/             # Zustand stores
└── tests/             # Tests
```

## FBR Integration

This system integrates with Pakistan's FBR Digital Invoicing System:

1. **Sandbox Environment** - For testing scenarios
2. **Production Environment** - For real invoices
3. **QR Code Generation** - FBR-compliant QR codes (Version 2.0, 1.0x1.0 inch)
4. **Invoice Locking** - Invoices locked after FBR submission

## Accounting Features

- Double-entry bookkeeping
- Chart of Accounts
- Journal entries (automatic posting)
- General Ledger
- Trial Balance
- Profit & Loss Statement
- Balance Sheet
- Tax reports

## License

Private - All rights reserved

## Support

For support, contact: [your-email@example.com]
