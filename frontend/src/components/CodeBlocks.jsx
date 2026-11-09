// A stack of friendly "coding blocks", used as the Kids Academy's visual.
// Pure CSS, no image needed. Decorative only.
const blocks = [
  { text: 'when flag clicked', cls: 'bg-brand text-white rounded-t-3xl', indent: 0 },
  { text: 'say “Habari!” for 2 seconds', cls: 'bg-sun text-navy', indent: 0 },
  { text: 'repeat 10', cls: 'bg-navy text-ice', indent: 0 },
  { text: 'move 10 steps', cls: 'bg-white text-navy border-2 border-navy', indent: 1 },
  { text: 'play sound “pop”', cls: 'bg-white text-navy border-2 border-navy', indent: 1 },
  { text: 'show my game to Mum', cls: 'bg-brand text-white rounded-b-3xl', indent: 0 },
];

export default function CodeBlocks() {
  return (
    <div aria-hidden="true" className="font-kids mx-auto w-full max-w-sm space-y-1 text-lg font-semibold">
      {blocks.map((b) => (
        <div key={b.text} style={{ marginLeft: b.indent * 28 }} className={`rounded-lg px-5 py-3 shadow-[0_4px_0_rgba(16,31,63,0.25)] ${b.cls}`}>
          {b.text}
        </div>
      ))}
    </div>
  );
}