# InvoiceFlow Dashboard

InvoiceFlow is the front-end of a CRM and invoicing dashboard for small
trading businesses — the kind of tool a wholesaler or distributor uses to
keep track of who owes what, which invoices are late, and how much cash has
actually been collected this month.

The dashboard is built around a fictional but realistic business (Malik
Trading House, Sahiwal) with typed sample data: six customers across
Pakistan, eight invoices in different states (paid, pending, overdue,
draft), and a six-month invoiced-vs-collected revenue series.

## Features

- **Summary stat cards** — total outstanding, overdue amount, collections
  this month and active customer count, all derived from the data layer.
- **Revenue chart** — invoiced vs collected per month, drawn with plain
  CSS bars (no chart library), with the exact figures also available in a
  screen-reader table.
- **Recent invoices table** — invoice number, customer, due date, amount
  and a colour-coded status pill for Paid / Pending / Overdue / Draft.
- **Top outstanding balances** — customers ranked by what they owe, with a
  follow-up hint for the most urgent account.
- **Responsive layout** — sidebar navigation on desktop, horizontal nav
  strip on smaller screens; the invoices table scrolls horizontally
  instead of breaking.
- **Accessible by default** — semantic landmarks, labelled sections,
  visible keyboard focus and a caption on every data table.

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router) with React 18
- TypeScript in strict mode
- Tailwind CSS 3 for styling
- No external UI or chart libraries — components are hand-built

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build       # production build
npm run start       # serve the production build
npm run typecheck   # tsc --noEmit
```

## Project structure

```text
app/
  layout.tsx        Root layout and page metadata
  globals.css       Tailwind directives and focus styles
  page.tsx          Dashboard page — composes everything below
components/
  Sidebar.tsx       Business branding and primary navigation
  StatCard.tsx      Single KPI card with tone variants
  InvoiceTable.tsx  Invoices table with status pills
  RevenueChart.tsx  CSS-bar chart (invoiced vs collected)
lib/
  data.ts           Types, sample data and stat helpers
```

## Notes

- All amounts are in Pakistani Rupees (PKR) and formatted with
  `Intl`-friendly grouping via `toLocaleString("en-PK")`.
- The data layer (`lib/data.ts`) is intentionally shaped like the
  response of a small REST API, so wiring the UI to a real backend later
  means replacing the constants in that one file — the components only
  depend on the types.
- Dates are fixed to the sample business period (October–November 2026)
  so the dashboard always tells the same coherent story.
