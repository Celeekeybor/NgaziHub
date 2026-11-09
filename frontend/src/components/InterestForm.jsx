import { Field, Select, Textarea, Consent, SubmitRow, Done, useSubmit } from './form.jsx';
import { towns } from '../data/site.js';
import { useAdmin } from '../admin/AdminStore.jsx';
import { useState } from 'react';

const topics = ['General inquiry', 'Computer & IT courses', 'Kids Holiday Academy', 'Corporate training', 'Partnership / sponsorship', 'Other'];
const connected = Boolean(import.meta.env.VITE_FORM_ENDPOINT);

export default function InterestForm() {
  const { status, data, onSubmit } = useSubmit('interest');
  const {addInquiry} = useAdmin();
  const [demoDone,setDemoDone] = useState(false);
  function handleSubmit(e) {
    if (connected) return onSubmit(e);
    e.preventDefault();
    addInquiry(Object.fromEntries(new FormData(e.currentTarget)));
    setDemoDone(true);
  }
  if (demoDone) return <Done title="Saved in this browser">Your inquiry is visible in the local Admin Dashboard demo. It has NOT been sent to the NgaziHub team or stored on a server.</Done>;
  if (status === 'done') {
    return connected
      ? <Done title="Thanks for reaching out.">Your inquiry has been submitted. We'll get back to you using the details you provided.</Done>
      : <Done title="Inquiry preview complete">This demo has not sent your message to NgaziHub. The inquiry form needs a backend endpoint before the team can receive requests.</Done>;
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 sm:p-8">
      <Field label="Full name" name="name" autoComplete="name" />
      <Field label="Email address" name="email" type="email" autoComplete="email" />
      <Field label="Phone number" name="phone" type="tel" autoComplete="tel" required={false} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Select label="I'm interested in" name="topic" options={topics} />
        <Select label="My location" name="town" options={towns} required={false} />
      </div>
      <Textarea label="How can we help?" name="message" required />
      <Consent>I agree that NgaziHub may contact me about this inquiry. If I am under 18, I have a parent or guardian's permission.</Consent>
      {!connected && <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-950"><strong>Demo form:</strong> Your inquiry will be saved in this browser for the admin demo only, not delivered to NgaziHub. Please do not send sensitive information.</p>}
      <SubmitRow status={status}>Send inquiry</SubmitRow>
      {data?.name && status === 'error' && <p className="text-xs text-slate-500">Please retry your inquiry.</p>}
    </form>
  );
}
