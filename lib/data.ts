export type InvoiceStatus = "Paid" | "Pending" | "Overdue" | "Draft";

export interface Customer {
  id: string;
  name: string;
  city: string;
  contactName: string;
  outstandingPkr: number;
}

export interface Invoice {
  id: string;
  number: string;
  customerId: string;
  description: string;
  issuedOn: string;
  dueOn: string;
  amountPkr: number;
  status: InvoiceStatus;
}

export interface RevenuePoint {
  month: string;
  invoicedPkr: number;
  collectedPkr: number;
}

export const customers: Customer[] = [
  { id: "c-001", name: "Al-Noor Traders", city: "Lahore", contactName: "Bilal Ahmed", outstandingPkr: 184500 },
  { id: "c-002", name: "Karachi Textile Mills", city: "Karachi", contactName: "Sana Qureshi", outstandingPkr: 0 },
  { id: "c-003", name: "Peshawar Dry Fruits Co.", city: "Peshawar", contactName: "Imran Khattak", outstandingPkr: 67200 },
  { id: "c-004", name: "FreshMart Retail Group", city: "Islamabad", contactName: "Ayesha Khan", outstandingPkr: 321750 },
  { id: "c-005", name: "Chenab Auto Parts", city: "Faisalabad", contactName: "Usman Tariq", outstandingPkr: 45900 },
  { id: "c-006", name: "Sialkot Sports Exporters", city: "Sialkot", contactName: "Hamza Iqbal", outstandingPkr: 0 },
];

export const invoices: Invoice[] = [
  { id: "i-101", number: "INV-2026-0142", customerId: "c-004", description: "Monthly grocery supply — October consignment", issuedOn: "2026-10-28", dueOn: "2026-11-11", amountPkr: 321750, status: "Pending" },
  { id: "i-102", number: "INV-2026-0141", customerId: "c-001", description: "Cooking oil and ghee — 240 cartons", issuedOn: "2026-10-21", dueOn: "2026-11-04", amountPkr: 184500, status: "Overdue" },
  { id: "i-103", number: "INV-2026-0140", customerId: "c-002", description: "Grey fabric lot, 12,000 metres", issuedOn: "2026-10-18", dueOn: "2026-11-01", amountPkr: 940000, status: "Paid" },
  { id: "i-104", number: "INV-2026-0139", customerId: "c-003", description: "Almonds and walnuts — mixed grade, 850 kg", issuedOn: "2026-10-15", dueOn: "2026-10-29", amountPkr: 67200, status: "Overdue" },
  { id: "i-105", number: "INV-2026-0138", customerId: "c-005", description: "Brake pads and filters — restock order", issuedOn: "2026-10-12", dueOn: "2026-10-26", amountPkr: 45900, status: "Pending" },
  { id: "i-106", number: "INV-2026-0137", customerId: "c-006", description: "Football export order — 3,000 units", issuedOn: "2026-10-09", dueOn: "2026-10-23", amountPkr: 1285000, status: "Paid" },
  { id: "i-107", number: "INV-2026-0136", customerId: "c-002", description: "Dyed fabric lot, 6,500 metres", issuedOn: "2026-10-05", dueOn: "2026-10-19", amountPkr: 512300, status: "Paid" },
  { id: "i-108", number: "INV-2026-0143", customerId: "c-001", description: "Rice and pulses — November advance order", issuedOn: "2026-11-05", dueOn: "2026-11-19", amountPkr: 96800, status: "Draft" },
];

export const revenueSeries: RevenuePoint[] = [
  { month: "Jun", invoicedPkr: 1840000, collectedPkr: 1695000 },
  { month: "Jul", invoicedPkr: 2125000, collectedPkr: 1980000 },
  { month: "Aug", invoicedPkr: 1975000, collectedPkr: 1842000 },
  { month: "Sep", invoicedPkr: 2380000, collectedPkr: 2150000 },
  { month: "Oct", invoicedPkr: 2694000, collectedPkr: 2247300 },
  { month: "Nov", invoicedPkr: 1353600, collectedPkr: 705300 },
];

export function customerById(id: string): Customer {
  const found = customers.find((c) => c.id === id);
  if (!found) throw new Error(`Unknown customer id: ${id}`);
  return found;
}

export function formatPkr(value: number): string {
  return `PKR ${value.toLocaleString("en-PK")}`;
}

export function formatShortPkr(value: number): string {
  if (value >= 1_000_000) return `PKR ${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `PKR ${(value / 1_000).toFixed(0)}K`;
  return formatPkr(value);
}

export interface DashboardStats {
  totalOutstandingPkr: number;
  overduePkr: number;
  collectedThisMonthPkr: number;
  openInvoiceCount: number;
}

export function getDashboardStats(): DashboardStats {
  const open = invoices.filter((i) => i.status === "Pending" || i.status === "Overdue");
  const november = revenueSeries[revenueSeries.length - 1];
  return {
    totalOutstandingPkr: open.reduce((sum, i) => sum + i.amountPkr, 0),
    overduePkr: invoices
      .filter((i) => i.status === "Overdue")
      .reduce((sum, i) => sum + i.amountPkr, 0),
    collectedThisMonthPkr: november.collectedPkr,
    openInvoiceCount: open.length,
  };
}
