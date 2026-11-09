import { Field, Select, Consent, SubmitRow, Done, useSubmit } from './form.jsx';
import { towns } from '../data/site.js';

const ages = Array.from({ length: 12 }, (_, i) => `${i + 6}`);
const interests = ['Computer basics and typing', 'Coding and games', 'Robotics and electronics', 'Websites', 'Not sure yet'];

export default function KidsForm() {
  const { status, data, onSubmit } = useSubmit('kids');

  if (status === 'done') {
    const first = (data.parent || '').trim().split(' ')[0];
    return <Done title={`Thank you, ${first}.`}>You're on the holiday waitlist. We'll contact you as soon as dates, venues and fees are confirmed.</Done>;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-2xl bg-white p-6 sm:p-8">
      <Field label="Parent or guardian's name" name="parent" autoComplete="name" />
      <Field label="Phone number or email" name="contact" autoComplete="email" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Select label="Where are you?" name="town" options={towns} />
        <Select label="Child's age" name="age" options={ages} />
      </div>
      <Select label="What is your child curious about?" name="interest" options={interests} required={false} />
      <Consent>
        I am the parent or legal guardian. NgaziHub may contact me about holiday camps for my child.
      </Consent>
      <SubmitRow status={status}>Join the holiday waitlist</SubmitRow>
    </form>
  );
}