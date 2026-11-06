import Seo, { faqJsonLd } from '../components/Seo.jsx';
import Section from '../components/Section.jsx';
import Button from '../components/Button.jsx';
import Faq from '../components/Faq.jsx';
import CorporateForm from '../components/CorporateForm.jsx';
import { areas, workshops, delivery, process, corporateFaqs } from '../data/corporate.js';

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Corporate AI, cybersecurity and IT training',
    provider: { '@type': 'EducationalOrganization', name: 'NgaziHub', url: 'https://ngazihub.org' },
    areaServed: 'Kenya',
    serviceType: 'Corporate training',
    description: 'Workshops in AI for the workplace, cybersecurity awareness, data protection and IT for companies, NGOs, schools and institutions.',
  },
  faqJsonLd(corporateFaqs),
];

const total = areas.reduce((n, a) => n + a.courses.length, 0);

export default function CorporatePage() {
  return (
    <>
      <Seo
        path="/corporate"
        title="Corporate AI, cybersecurity and IT training in Kenya | NgaziHub"
        description="Practical AI, cybersecurity, data protection and IT workshops for companies, NGOs, schools and institutions in Kenya. On-site, at the academy, live online or recorded. Request corporate training."
        jsonLd={jsonLd}
      />


      <Section tone="ice" labelledby="corp-h1" className="py-12! lg:py-16!">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-sm font-semibold text-brand">Corporate training</p>
            <h1 id="corp-h1" className="mt-2 text-4xl font-bold leading-[1.08] text-navy sm:text-5xl">
              Practical AI, cybersecurity and IT training for your team.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed">
              Workshops for companies, NGOs, schools and institutions. Delivered at your premises, at our academy or
              online, and built around what your people actually do.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Button href="#request" variant="navy">Request corporate training</Button>
              <Button href="#topics" variant="outline" className="text-navy">Browse topics</Button>
            </div>
          </div>
          <dl className="self-end border-t-4 border-navy lg:col-span-4 lg:col-start-9">
            {[
              ['Planned courses', `${total} across ${areas.length} areas`],
              ['Delivery', 'On-site, academy, live online, recorded'],
              ['For', 'Employees, managers, executives and IT staff'],
              ['Certificates', 'NgaziHub certificate of completion'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-charcoal/15 py-3 text-sm">
                <dt className="font-semibold text-navy">{k}</dt>
                <dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>


      <Section id="workshops" tone="white" labelledby="workshops-title">
        <h2 id="workshops-title" className="text-3xl font-bold text-navy sm:text-4xl">Featured workshops</h2>
        <ul className="mt-8 border-b border-charcoal/15">
          {workshops.map((w) => (
            <li key={w.name} className="grid gap-2 border-t border-charcoal/15 py-5 md:grid-cols-12 md:gap-6">
              <h3 className="text-xl font-bold text-navy md:col-span-4">{w.name}</h3>
              <p className="text-sm font-semibold text-brand md:col-span-3 md:pt-1">{w.length} · {w.who}</p>
              <p className="leading-relaxed md:col-span-5">{w.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-charcoal/80">
          We plan to begin with AI for Employees, Cybersecurity Awareness and Data Protection Essentials.
        </p>
      </Section>

      <Section id="topics" tone="ice" labelledby="topics-title">
        <h2 id="topics-title" className="text-3xl font-bold text-navy sm:text-4xl">Training areas</h2>
        <div className="mt-8 border-b border-charcoal/15">
          {areas.map((a, i) => (
            <details key={a.name} open={i === 0} className="group border-t border-charcoal/15 py-4">
              <summary className="flex items-start justify-between gap-6">
                <span>
                  <span className="block text-xl font-bold text-navy">{a.name}</span>
                  <span className="mt-1 block text-sm">{a.text}</span>
                </span>
                <span aria-hidden="true" className="text-2xl leading-none text-brand transition-transform group-open:rotate-45">+</span>
              </summary>
              <ul className="mt-4 grid gap-x-10 sm:grid-cols-2">
                {a.courses.map(([code, title]) => (
                  <li key={code} className="border-t border-charcoal/10 py-2 text-sm">
                    <span className="mr-3 font-semibold text-brand">{code}</span>{title}

                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </Section>

      <Section tone="white" labelledby="delivery-title">
        <h2 id="delivery-title" className="text-3xl font-bold text-navy sm:text-4xl">How we deliver</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4">
          {delivery.map(([t, d], i) => (
            <div key={t} className={`border-t-4 border-navy py-4 lg:pr-6 ${i > 0 ? 'lg:border-l lg:pl-6' : ''}`}>
              <h3 className="text-xl font-bold text-navy">{t}</h3>
              <p className="mt-2 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="navy" labelledby="process-title">
        <h2 id="process-title" className="text-3xl font-bold sm:text-4xl">How booking works</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-5">
          {process.map(([t, d], i) => (
            <li key={t} className="border-t-4 border-sun pt-4">
              <p className="text-sm font-semibold text-sun">Step {i + 1}</p>
              <h3 className="mt-1 text-lg font-bold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ice/85">{d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-3xl text-sm text-ice/80">

          Training supports, but does not replace, your organisation's own security controls and cannot guarantee
          against incidents.
        </p>
      </Section>

      <Section id="request" tone="ice" labelledby="request-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="request-title" className="text-3xl font-bold text-navy sm:text-4xl">Request training or talk to us</h2>
            <p className="mt-4 text-lg leading-relaxed">
              Tell us what you need. We'll review it, propose relevant courses and send a written quotation.
              You can also use this form to partner with NgaziHub, sponsor a session or offer to mentor.
            </p>
          </div>
          <div className="lg:col-span-8"><CorporateForm /></div>
        </div>
      </Section>

      <Section tone="white" labelledby="faq-title">
        <h2 id="faq-title" className="text-3xl font-bold text-navy sm:text-4xl">Common questions</h2>
        <div className="mt-6"><Faq items={corporateFaqs} /></div>
      </Section>
    </>
  );
}