import {
  customerById,
  formatPkr,
  type Invoice,
  type InvoiceStatus,
} from "@/lib/data";

const STATUS_CLASSES: Record<InvoiceStatus, string> = {
  Paid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Pending: "bg-amber-50 text-amber-700 ring-amber-200",
  Overdue: "bg-red-50 text-red-700 ring-red-200",
  Draft: "bg-ink-50 text-ink-600 ring-ink-200",
};

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

interface InvoiceTableProps {
  invoices: Invoice[];
}

export default function InvoiceTable({ invoices }: InvoiceTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <caption className="sr-only">
          Recent invoices with customer, due date, amount and payment status
        </caption>
        <thead>
          <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
            <th scope="col" className="px-4 py-3 font-semibold">
              Invoice
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Customer
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Due date
            </th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">
              Amount
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => {
            const customer = customerById(invoice.customerId);
            return (
              <tr
                key={invoice.id}
                className="border-b border-ink-50 last:border-0 hover:bg-ink-50/60"
              >
                <td className="px-4 py-3">
                  <span className="block font-medium text-ink-900">
                    {invoice.number}
                  </span>
                  <span className="block text-xs text-ink-400">
                    {invoice.description}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="block text-ink-800">{customer.name}</span>
                  <span className="block text-xs text-ink-400">
                    {customer.city}
                  </span>
                </td>
                <td className="px-4 py-3 text-ink-600">
                  {formatDate(invoice.dueOn)}
                </td>
                <td className="px-4 py-3 text-right font-medium text-ink-900">
                  {formatPkr(invoice.amountPkr)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${STATUS_CLASSES[invoice.status]}`}
                  >
                    {invoice.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
