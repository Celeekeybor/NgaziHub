import { Field, Select, Consent, SubmitRow, Done, useSubmit } from './form.jsx';
import { towns } from '../data/site.js';

const stages = ['I just finished KCSE', 'I am still in secondary school', 'I am in college or university', 'Something else'];

export default function InterestForm() {
  const { status, data, onSubmit } = useSubmit('interest');

  if (status === 'done') {
    const first = (data.name || '').trim().split(' ')[0];
    const where = data.town && data.town !== 'Another town' ? ` in ${data.town}` : '';
    return <Done title={`Thank you, ${first}.`}>We have your details. We'll contact you when courses open{where}.</Done>;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 bg-white p-6 sm:p-8">
      <Field label="Full name" name="name" autoComplete="name" />
      <Field label="Phone number or email" name="contact" autoComplete="email" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Select label="Where are you?" name="town" options={towns} />
        <Select label="I am" name="stage" options={stages} />
      </div>
      <Consent>
        I am 18 or older, or a parent or guardian knows I am signing up. NgaziHub will only use these details to tell me about its courses and sessions.
      </Consent>
      <SubmitRow status={status}>Register interest</SubmitRow>
    </form>
  );
}