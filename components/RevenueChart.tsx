import { formatShortPkr, type RevenuePoint } from "@/lib/data";

interface RevenueChartProps {
  data: RevenuePoint[];
}

/**
 * Invoiced vs collected revenue rendered as paired CSS bars.
 * The chart is also exposed as a visually hidden data table so screen
 * readers get the exact figures, not just bar heights.
 */
export default function RevenueChart({ data }: RevenueChartProps) {
  const max = Math.max(...data.map((d) => d.invoicedPkr));

  return (
    <figure aria-labelledby="revenue-chart-title">
      <figcaption id="revenue-chart-title" className="sr-only">
        Monthly invoiced and collected revenue for the last six months
      </figcaption>

      <div className="mb-4 flex items-center gap-5 text-sm text-ink-500">
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="h-3 w-3 rounded-sm bg-brand-500" />
          Invoiced
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="h-3 w-3 rounded-sm bg-emerald-500" />
          Collected
        </span>
      </div>

      <div
        className="flex h-52 items-end gap-3 sm:gap-5"
        role="img"
        aria-label={`Bar chart. Highest invoiced month: ${
          data.reduce((a, b) => (b.invoicedPkr > a.invoicedPkr ? b : a)).month
        } at ${formatShortPkr(max)}.`}
      >
        {data.map((point) => (
          <div
            key={point.month}
            className="flex flex-1 flex-col items-center gap-2"
          >
            <div className="flex h-40 w-full items-end justify-center gap-1.5">
              <div
                className="w-4 rounded-t bg-brand-500 sm:w-6"
                style={{ height: `${(point.invoicedPkr / max) * 100}%` }}
                title={`Invoiced: ${formatShortPkr(point.invoicedPkr)}`}
              />
              <div
                className="w-4 rounded-t bg-emerald-500 sm:w-6"
                style={{ height: `${(point.collectedPkr / max) * 100}%` }}
                title={`Collected: ${formatShortPkr(point.collectedPkr)}`}
              />
            </div>
            <span className="text-xs font-medium text-ink-500">
              {point.month}
            </span>
          </div>
        ))}
      </div>

      <table className="sr-only">
        <caption>Revenue figures used in the chart</caption>
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">Invoiced</th>
            <th scope="col">Collected</th>
          </tr>
        </thead>
        <tbody>
          {data.map((point) => (
            <tr key={point.month}>
              <th scope="row">{point.month}</th>
              <td>{formatShortPkr(point.invoicedPkr)}</td>
              <td>{formatShortPkr(point.collectedPkr)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
