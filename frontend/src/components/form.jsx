import { useState } from 'react';
import { submitForm } from '../lib/submitForm.js';

const control = 'mt-1.5 w-full rounded-sm border border-charcoal/30 bg-white px-3.5 py-2.5 text-base text-charcoal focus:border-brand';

function Label({ htmlFor, required, children }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold">
      {children}
      {!required && <span className="font-normal text-charcoal/60"> (optional)</span>}
    </label>
  );
}

export function Field({ label, name, type = 'text', required = true, className = '', ...rest }) {
  return (
    <div className={className}>
      <Label htmlFor={name} required={required}>{label}</Label>
      <input id={name} name={name} type={type} required={required} className={control} {...rest} />
    </div>
  );
}

// options: string[] or [{ label, items: string[] }] for grouped lists
export function Select({ label, name, options, required = true, defaultValue = '', className = '' }) {
  return (
    <div className={className}>
      <Label htmlFor={name} required={required}>{label}</Label>
      <select id={name} name={name} required={required} defaultValue={defaultValue} className={control}>
        <option value="" disabled={required}>Choose one</option>
        {options.map((o) =>
          typeof o === 'string' ? (

            <option key={o}>{o}</option>
          ) : (
            <optgroup key={o.label} label={o.label}>
              {o.items.map((i) => <option key={i}>{i}</option>)}
            </optgroup>
          )
        )}
      </select>
    </div>
  );
}

export function Textarea({ label, name, required = false, className = '' }) {
  return (
    <div className={className}>
      <Label htmlFor={name} required={required}>{label}</Label>
      <textarea id={name} name={name} rows={3} required={required} className={control} />
    </div>
  );
}

export function Consent({ children }) {
  return (
    <label className="flex items-start gap-3 text-sm leading-relaxed">
      <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-brand" />
      <span>{children}</span>
    </label>
  );
}

export function useSubmit(kind) {
  const [status, setStatus] = useState('idle'); // idle | sending | done | error

  const [data, setData] = useState({});

  async function onSubmit(e) {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    setStatus('sending');
    try {
      await submitForm(kind, values);
      setData(values);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }
  return { status, data, onSubmit };
}

export function SubmitRow({ status, children }) {
  return (
    <>
      {status === 'error' && (
        <p role="alert" className="text-sm font-semibold text-red-700">
          We couldn't send your details. Check your connection and try again.
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="rounded-sm bg-sun px-6 py-3 font-semibold text-navy transition-colors hover:bg-[#ffc933] disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : children}
      </button>

    </>
  );
}

export function Done({ title, children }) {
  return (
    <div role="status" className="border-l-4 border-sun bg-white p-6 sm:p-8">
      <h3 className="text-2xl font-bold text-navy">{title}</h3>
      <p className="mt-3 text-lg">{children}</p>
    </div>
  );
}