import { useState } from 'react';
import { submitInterest } from '../lib/submitInterest.js';

const towns = ['Kisii', 'Keroka', 'Iten', 'Another town'];
const stages = [
  'I just finished KCSE',
  'I am still in secondary school',
  'I am in college or university',
  'Something else',
];

const field =
  'mt-2 w-full rounded-sm border border-charcoal/30 bg-white px-4 py-3 text-base text-charcoal focus:border-brand';

export default function InterestForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [firstName, setFirstName] = useState('');
  const [town, setTown] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus('sending');
    try {
      await submitInterest(data);
      setFirstName(data.name.trim().split(' ')[0]);
      setTown(data.town);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }


  if (status === 'done') {
    return (
      <div role="status" className="border-l-4 border-sun bg-white p-8">
        <h3 className="text-2xl font-bold text-navy">Thank you, {firstName}.</h3>
        <p className="mt-3 text-lg">
          We have your details. We'll contact you when sessions are confirmed
          {town && town !== 'Another town' ? ` in ${town}` : ''}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8">
      <div>
        <label htmlFor="name" className="font-semibold">Full name</label>
        <input id="name" name="name" type="text" autoComplete="name" required className={field} />
      </div>

      <div>
        <label htmlFor="contact" className="font-semibold">Phone number or email</label>
        <input id="contact" name="contact" type="text" autoComplete="email" required className={field} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="town" className="font-semibold">Where are you?</label>
          <select id="town" name="town" required defaultValue="" className={field}>
            <option value="" disabled>Choose a town</option>
            {towns.map((t) => <option key={t}>{t}</option>)}
          </select>

        </div>
        <div>
          <label htmlFor="stage" className="font-semibold">I am</label>
          <select id="stage" name="stage" required defaultValue="" className={field}>
            <option value="" disabled>Choose one</option>
            {stages.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm leading-relaxed">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-brand" />
        <span>
          I am 18 or older, or a parent or guardian knows I am signing up. NgaziHub will only use
          these details to tell me about its sessions.
        </span>
      </label>

      {status === 'error' && (
        <p role="alert" className="text-sm font-semibold text-red-700">
          We couldn't save your details. Check your connection and try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="rounded-sm bg-sun px-6 py-3 font-semibold text-navy transition-colors hover:bg-[#ffc933] disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Register interest'}
      </button>
    </form>

  );
}