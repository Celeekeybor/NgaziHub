// kind: 'interest' | 'kids' | 'corporate'
// With VITE_FORM_ENDPOINT set, POSTs JSON. Without it, logs to the console
// so the UI can be developed before the backend exists.
export async function submitForm(kind, data) {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT;
  if (!endpoint) {
    await new Promise((r) => setTimeout(r, 400));
    console.info(`NgaziHub form "${kind}" (not sent anywhere yet):`, data);
    return;
  }
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kind, ...data }),
  });
  if (!res.ok) throw new Error('Request failed');
}