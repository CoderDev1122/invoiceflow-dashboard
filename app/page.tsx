import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";
import InvoiceTable from "@/components/InvoiceTable";
import RevenueChart from "@/components/RevenueChart";
import {
  customers,
  formatPkr,
  formatShortPkr,
  getDashboardStats,
  invoices,
  revenueSeries,
} from "@/lib/data";

export default function DashboardPage() {
  const stats = getDashboardStats();
  const topDebtors = [...customers]
    .filter((c) => c.outstandingPkr > 0)
    .sort((a, b) => b.outstandingPkr - a.outstandingPkr)
    .slice(0, 4);

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />

      <main id="dashboard" className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-ink-900">Dashboard</h1>
            <p className="mt-1 text-sm text-ink-500">
              Friday, 7 November 2026 · Malik Trading House, Sahiwal
            </p>
          </div>
          <a
            href="#invoices"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700"
          >
            New invoice
          </a>
        </header>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total outstanding"
            value={formatPkr(stats.totalOutstandingPkr)}
            detail={`Across ${stats.openInvoiceCount} open invoices`}
          />
          <StatCard
            label="Overdue"
            value={formatPkr(stats.overduePkr)}
            detail="2 invoices past their due date"
            tone="danger"
          />
          <StatCard
            label="Collected in November"
            value={formatPkr(stats.collectedThisMonthPkr)}
            detail="Month to date, all payment methods"
            tone="warning"
          />
          <StatCard
            label="Active customers"
            value={String(customers.length)}
            detail="Across 6 cities in Pakistan"
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <section
            aria-labelledby="revenue-heading"
            className="rounded-xl border border-ink-100 bg-white p-5 shadow-sm xl:col-span-2"
          >
            <h2
              id="revenue-heading"
              className="text-base font-semibold text-ink-900"
            >
              Revenue — invoiced vs collected
            </h2>
            <p className="mb-5 mt-1 text-sm text-ink-500">
              Six-month view. November is still in progress, which is why
              collections trail invoices.
            </p>
            <RevenueChart data={revenueSeries} />
          </section>

          <section
            aria-labelledby="debtors-heading"
            className="rounded-xl border border-ink-100 bg-white p-5 shadow-sm"
          >
            <h2
              id="debtors-heading"
              className="text-base font-semibold text-ink-900"
            >
              Top outstanding balances
            </h2>
            <ul className="mt-4 space-y-4">
              {topDebtors.map((customer) => (
                <li
                  key={customer.id}
                  className="flex items-start justify-between gap-3"
                >
                  <div>
                    <p className="text-sm font-medium text-ink-900">
                      {customer.name}
                    </p>
                    <p className="text-xs text-ink-400">
                      {customer.contactName} · {customer.city}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-ink-900">
                    {formatShortPkr(customer.outstandingPkr)}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-ink-50 pt-4 text-sm text-ink-500">
              Follow up with Al-Noor Traders first — their October invoice is
              now 3 days overdue.
            </p>
          </section>
        </div>

        <section
          id="invoices"
          aria-labelledby="invoices-heading"
          className="mt-6 rounded-xl border border-ink-100 bg-white shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 px-5 pt-5">
            <h2
              id="invoices-heading"
              className="text-base font-semibold text-ink-900"
            >
              Recent invoices
            </h2>
            <p className="text-sm text-ink-500">
              Showing the latest {invoices.length} invoices
            </p>
          </div>
          <div className="p-2 sm:p-3">
            <InvoiceTable invoices={invoices} />
          </div>
        </section>
      </main>
    </div>
  );
}
