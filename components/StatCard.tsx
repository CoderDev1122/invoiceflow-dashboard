interface StatCardProps {
  label: string;
  value: string;
  detail: string;
  tone?: "default" | "warning" | "danger";
}

const TONE_CLASSES: Record<NonNullable<StatCardProps["tone"]>, string> = {
  default: "text-ink-900",
  warning: "text-amber-600",
  danger: "text-red-600",
};

export default function StatCard({
  label,
  value,
  detail,
  tone = "default",
}: StatCardProps) {
  return (
    <section
      aria-label={label}
      className="rounded-xl border border-ink-100 bg-white p-5 shadow-sm"
    >
      <p className="text-sm font-medium text-ink-500">{label}</p>
      <p className={`mt-2 text-2xl font-semibold ${TONE_CLASSES[tone]}`}>
        {value}
      </p>
      <p className="mt-1 text-sm text-ink-500">{detail}</p>
    </section>
  );
}
