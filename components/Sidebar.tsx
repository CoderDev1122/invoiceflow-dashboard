interface NavItem {
  label: string;
  href: string;
  active?: boolean;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "#dashboard", active: true },
  { label: "Invoices", href: "#invoices", badge: "5" },
  { label: "Customers", href: "#customers" },
  { label: "Products", href: "#products" },
  { label: "Payments", href: "#payments" },
  { label: "Reports", href: "#reports" },
  { label: "Settings", href: "#settings" },
];

export default function Sidebar() {
  return (
    <aside className="flex w-full flex-col bg-ink-900 text-ink-100 lg:min-h-screen lg:w-64 lg:shrink-0">
      <div className="flex items-center gap-3 px-5 py-5">
        <span
          aria-hidden="true"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-sm font-bold text-white"
        >
          IF
        </span>
        <div>
          <p className="text-base font-semibold leading-tight text-white">
            InvoiceFlow
          </p>
          <p className="text-xs leading-tight text-ink-300">
            CRM &amp; Invoicing
          </p>
        </div>
      </div>

      <nav aria-label="Primary" className="px-3 pb-3 lg:flex-1">
        <ul className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
          {NAV_ITEMS.map((item) => (
            <li key={item.label} className="shrink-0 lg:shrink">
              <a
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                className={
                  item.active
                    ? "flex items-center justify-between gap-2 rounded-lg bg-brand-600 px-3 py-2 text-sm font-medium text-white"
                    : "flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink-200 transition-colors hover:bg-ink-800 hover:text-white"
                }
              >
                <span className="whitespace-nowrap">{item.label}</span>
                {item.badge ? (
                  <span className="rounded-full bg-ink-700 px-2 py-0.5 text-xs font-semibold text-ink-100">
                    {item.badge}
                  </span>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="hidden border-t border-ink-800 px-5 py-4 lg:block">
        <p className="text-sm font-medium text-white">Malik Trading House</p>
        <p className="text-xs text-ink-300">
          Owner account · ahmed@maliktrading.pk
        </p>
      </div>
    </aside>
  );
}
