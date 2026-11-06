export default function Faq({ items, kids = false }) {
  return (
    <div className="border-b border-charcoal/15">
      {items.map(([q, a]) => (
        <details key={q} className="group border-t border-charcoal/15 py-4">
          <summary className="flex items-center justify-between gap-6 text-lg font-semibold">
            <span>{q}</span>
            <span aria-hidden="true" className={`text-2xl leading-none text-brand transition-transform group-open:rotate-45 ${kids ? 'font-kids' : ''}`}>+</span>
          </summary>
          <p className="mt-3 max-w-3xl leading-relaxed">{a}</p>
        </details>
      ))}
    </div>
  );
}