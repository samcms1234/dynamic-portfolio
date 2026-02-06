# Dynamic Portfolio Dashboard

A full-stack web application that displays a real-time investment portfolio dashboard with sector-wise insights, live market prices, and advanced data visualizations.

This project was built as a case study to demonstrate full-stack development skills using **Node.js, Express, Next.js, TypeScript, Tailwind CSS, TanStack Table, and Recharts**.

---

## Features

### Backend
- Fetches **Current Market Price (CMP)** using Yahoo Finance (via `yahoo-finance2`)
- Uses **Alpha Vantage** as a fallback and for **P/E Ratio (fundamentals)**
- Handles Indian stock tickers (`.NS`, `.BO`, `.BSE`)
- Caching to reduce API calls and rate-limit issues
- Graceful error handling and fallback resolution
- Sector-wise portfolio aggregation

### Frontend
- Built with **Next.js (App Router) + TypeScript**
- Styled using **Tailwind CSS**
- Advanced, sortable data table using **TanStack Table** (formerly React Table)
- Interactive charts using **Recharts**:
  - Portfolio Allocation (Pie Chart)
  - Sector-wise Gain/Loss (Bar Chart)
  - Investment vs Present Value (Bar Chart)
- Auto-refresh every 15 seconds
- Skeleton loaders for better perceived performance
- Fully responsive dashboard layout

---

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- TanStack Table
- Recharts

### Backend
- Node.js
- Express.js
- TypeScript
- Yahoo Finance (`yahoo-finance2`)
- Axios
- Node Cache

## Prerequisites

- **Node.js ≥ 22**
- npm
- Alpha Vantage API Key (free tier)

---

## Environment Variables

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
SERPAPI_KEY=your_serp__api_key
```

---

## Running the Project

### Start the Backend

```bash
cd backend
npm install
npm run dev
```

Backend will run on:

```
http://localhost:5000
```

Portfolio API endpoint:

```
GET /api/portfolio
```

---

## Environment Variables

Create a `.env` file inside the `frontend` directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/portfolio
```

---

### Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:3000
```

---

## Author

**Saumya Srivastava**

---

## License

MIT Creative Commons.
See the full license text here: https://opensource.org/licenses/MIT