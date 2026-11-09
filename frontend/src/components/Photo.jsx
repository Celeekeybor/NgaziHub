import { asset } from '../lib/assets.js';

// Shows src/assets/<name>.(png|jpg|jpeg|webp). Missing file = labelled placeholder.
export default function Photo({ name, alt, eager = false, className = '' }) {
  const src = asset(name);
  if (src) {
    return <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} className={`object-cover ${className}`} />;
  }
  return (
    <div role="img" aria-label={alt} className={`flex items-center justify-center bg-navy/10 p-4 text-center text-xs text-charcoal/60 ${className}`}>
      Add src/assets/{name}.jpg
    </div>
  );
}