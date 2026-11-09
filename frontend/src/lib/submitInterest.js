// Stub. Replace the body with a real request once the backend exists, e.g.
//   const res = await fetch('/api/interest', { method: 'POST', ... });
//   if (!res.ok) throw new Error('Could not save your details');
// Fields: name, contact, town, stage, consent.
export async function submitInterest(data) {
  await new Promise((resolve) => setTimeout(resolve, 400));
  console.info('NgaziHub interest (not sent anywhere yet):', data);
}