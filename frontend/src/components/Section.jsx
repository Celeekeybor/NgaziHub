const tones = {
  white: 'bg-white',
  ice: 'bg-ice',
  navy: 'on-dark bg-navy text-ice',
  sun: 'bg-sun text-navy',
  blue: 'bg-tint-blue',
  butter: 'bg-tint-sun',
};

export default function Section({ id, tone = 'white', labelledby, className = '', children }) {
  return (
    <section id={id} aria-labelledby={labelledby} className={tones[tone]}>
      <div className={`mx-auto max-w-7xl px-6 py-14 lg:py-20 ${className}`}>{children}</div>
    </section>
  );
}