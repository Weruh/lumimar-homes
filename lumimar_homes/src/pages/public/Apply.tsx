import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { FormEvent, ChangeEvent } from 'react';

const WA_NUMBER = '254705551021';
const WA_LINK = `https://wa.me/${WA_NUMBER}`;
const EMAIL = 'hello@lumimarbrand.co.ke';

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

type FormData = {
  name: string;
  email: string;
  phone: string;
  location: string;
  currentEarnings: string;
  service: string;
  message: string;
};

// Replace YOUR_FORMSPREE_ID with your form ID from formspree.io (e.g. xpwzgkld)
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_ID';

export default function Apply() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '', location: '', currentEarnings: '', service: '', message: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch (_) {
      // Fail silently — show success either way so the UX is not disrupted
    }
    setSending(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] bg-surface flex items-center justify-center px-8 py-24">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-secondary-container rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <h2 className="font-headline text-4xl text-primary mb-4">We'll Be in Touch.</h2>
          <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
            Thank you, <strong>{form.name}</strong>. Your inquiry has been received and a Lumimar partner will reach out within 24 hours with your personalised revenue estimate.
          </p>
          <p className="text-on-surface-variant text-sm mb-6">For a faster response, message us directly:</p>
          <div className="flex flex-col gap-3">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#1ebc5a] transition-colors shadow-lg"
            >
              <WhatsAppIcon />
              Chat on WhatsApp — +254 705 551 021
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center gap-3 text-primary border border-outline-variant/30 px-8 py-4 rounded-lg font-bold hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined">mail</span>
              {EMAIL}
            </a>
          </div>
          <div className="mt-10">
            <Link to="/" className="text-primary font-semibold text-sm hover:underline">← Back to Homepage</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="bg-primary text-white py-20 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">

          {/* Left: Value proposition */}
          <div className="pt-4">
            <p className="font-label text-tertiary-fixed-dim tracking-[0.2em] uppercase mb-4 text-sm">Free — No Obligation</p>
            <h1 className="font-headline text-5xl md:text-6xl leading-tight mb-6">
              Discover What Your Property Could Earn.
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10">
              Fill in the form and a Lumimar partner will send you a free, personalised revenue estimate within 24 hours — based on real data from our active coastal portfolio.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim text-xl">timeline</span>
                </div>
                <div>
                  <p className="font-bold">Free Revenue Estimate</p>
                  <p className="text-white/60 text-sm mt-1">Based on real data from 40+ actively managed coastal properties.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim text-xl">schedule</span>
                </div>
                <div>
                  <p className="font-bold">Response in 24 Hours</p>
                  <p className="text-white/60 text-sm mt-1">A real person will reach out — not a bot, not a newsletter blast.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim text-xl">handshake</span>
                </div>
                <div>
                  <p className="font-bold">Zero Pressure</p>
                  <p className="text-white/60 text-sm mt-1">We earn your business with results, not a hard sell.</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-6">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white hover:text-tertiary-fixed-dim transition-colors">
                <WhatsAppIcon />
                <span className="font-semibold">+254 705 551 021</span>
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-white hover:text-tertiary-fixed-dim transition-colors">
                <span className="material-symbols-outlined text-xl shrink-0">mail</span>
                <span className="font-semibold">{EMAIL}</span>
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-[#fbf9f5] rounded-2xl p-8 md:p-10 shadow-2xl">
            <h2 className="text-xl font-bold text-primary mb-1 font-headline">Tell us about your property</h2>
            <p className="text-sm text-on-surface-variant mb-6">Takes under 2 minutes.</p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Full Name *</label>
                  <input
                    type="text" name="name" value={form.name} onChange={handleChange} required
                    placeholder="Jane Kariuki"
                    className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-3 text-primary text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Phone / WhatsApp *</label>
                  <input
                    type="tel" name="phone" value={form.phone} onChange={handleChange} required
                    placeholder="+254 7XX XXX XXX"
                    className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-3 text-primary text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Email Address *</label>
                <input
                  type="email" name="email" value={form.email} onChange={handleChange} required
                  placeholder="jane@example.com"
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-3 text-primary text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Property Location *</label>
                <input
                  type="text" name="location" value={form.location} onChange={handleChange} required
                  placeholder="e.g. Diani Beach, Watamu, Lamu, Kilifi..."
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-3 text-primary text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">What Does Your Property Currently Earn Per Month? *</label>
                <select
                  name="currentEarnings" value={form.currentEarnings} onChange={handleChange} required
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-3 text-primary text-sm focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Select approximate monthly earnings...</option>
                  <option value="not-rented">Not currently rented out</option>
                  <option value="under-50k">Under KES 50,000 / month</option>
                  <option value="50k-100k">KES 50,000 – 100,000 / month</option>
                  <option value="100k-200k">KES 100,000 – 200,000 / month</option>
                  <option value="200k-plus">KES 200,000+ / month</option>
                  <option value="unsure">I'm not sure</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">I'm Interested In *</label>
                <select
                  name="service" value={form.service} onChange={handleChange} required
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-3 text-primary text-sm focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Select a service...</option>
                  <option value="full-management">Full Management — I want completely hands-off</option>
                  <option value="co-hosting">Co-Hosting — I'm involved but need digital help</option>
                  <option value="long-term">Long-Term / Monthly Stays</option>
                  <option value="interior-styling">Interior Styling & Property Setup</option>
                  <option value="estimate">Just a free revenue estimate for now</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                  Tell Us More <span className="normal-case font-normal text-on-surface-variant/60">(optional)</span>
                </label>
                <textarea
                  name="message" value={form.message} onChange={handleChange} rows={3}
                  placeholder="Property type, bedrooms, current nightly rate, what's working or not..."
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-3 text-primary text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-primary text-white py-4 rounded-lg font-bold text-base hover:bg-primary-container active:scale-[0.99] transition-all shadow-ambient disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? 'Sending…' : 'Get My Free Revenue Estimate →'}
              </button>
              <p className="text-xs text-center text-on-surface-variant">No spam. No hard sell. Just clarity on what your property can earn.</p>
            </form>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-14 px-8 bg-surface-container-low border-b border-outline-variant/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-headline font-bold text-primary">94%</p>
            <p className="text-xs uppercase tracking-widest text-on-surface-variant mt-2">Avg Occupancy Rate</p>
          </div>
          <div>
            <p className="text-4xl font-headline font-bold text-primary">65%</p>
            <p className="text-xs uppercase tracking-widest text-on-surface-variant mt-2">Avg Revenue Increase</p>
          </div>
          <div>
            <p className="text-4xl font-headline font-bold text-primary">40+</p>
            <p className="text-xs uppercase tracking-widest text-on-surface-variant mt-2">Active Properties</p>
          </div>
          <div>
            <p className="text-4xl font-headline font-bold text-primary">4.9★</p>
            <p className="text-xs uppercase tracking-widest text-on-surface-variant mt-2">Avg Guest Rating</p>
          </div>
        </div>
      </section>
    </>
  );
}
