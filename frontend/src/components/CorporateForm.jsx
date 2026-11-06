import { useSearchParams } from 'react-router-dom';
import { Field, Select, Textarea, Consent, SubmitRow, Done, useSubmit } from './form.jsx';
import { workshops } from '../data/corporate.js';

const other = ['Partnership with NgaziHub', 'Sponsor a learning session', 'Mentor young learners'];
const topics = [
  { label: 'Training for my team', items: [...workshops.map((w) => w.name), 'Other training topic'] },
  { label: 'Work with NgaziHub', items: other },
];
const presets = { partner: other[0], sponsor: other[1], mentor: other[2] };
const formats = ['On-site at our premises', 'At the NgaziHub academy', 'Live online', 'Recorded lessons', 'Not sure yet'];
const sizes = ['1–10', '11–25', '26–50', '51–100', 'More than 100'];

export default function CorporateForm() {
  const [params] = useSearchParams();
  const preset = presets[params.get('topic')] || '';
  const { status, data, onSubmit } = useSubmit('corporate');

  if (status === 'done') {
    return (
      <Done title="Thank you. We have your enquiry.">
        We'll review it and get back to {data.contact || 'you'} on {data.email}.
      </Done>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 bg-white p-6 sm:grid-cols-2 sm:p-8">
      <Field label="Organisation (or write “Individual”)" name="organisation" autoComplete="organization" />
      <Field label="Contact person" name="contact" autoComplete="name" />
      <Field label="Business email" name="email" type="email" autoComplete="email" />
      <Field label="Phone" name="phone" type="tel" autoComplete="tel" />

      <Select label="What do you need?" name="topic" options={topics} defaultValue={preset} className="sm:col-span-2" />
      <Select label="Number of employees" name="size" options={sizes} required={false} />
      <Select label="Preferred delivery" name="format" options={formats} required={false} />
      <Field label="Location" name="location" required={false} />
      <Field label="Tentative dates" name="dates" required={false} />
      <Textarea label="Anything else we should know?" name="notes" className="sm:col-span-2" />
      <div className="space-y-5 sm:col-span-2">
        <Consent>NgaziHub may contact me about this enquiry.</Consent>
        <SubmitRow status={status}>Send enquiry</SubmitRow>
      </div>
    </form>
  );
}