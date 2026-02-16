import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { useT, useLocale } from '@/i18n/context';
import { company } from '@/data/company';
import { pages } from '@/data/pages';

export default function ContactPage() {
  const t = useT();
  const locale = useLocale();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(formData.subject || 'Website Inquiry');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`,
    );
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: t('contact.label.address'),
      value: `${company.address.street}, ${company.address.city}`,
    },
    { icon: Phone, label: t('contact.label.phone'), value: company.phone },
    { icon: Mail, label: t('contact.label.email'), value: company.email },
    { icon: Clock, label: t('contact.label.hours'), value: company.hours[locale] },
  ];

  return (
    <>
      <PageHero
        title={t('contact.hero.title')}
        subtitle={t('contact.hero.subtitle')}
        backgroundImage={pages.contact.heroImage}
      />

      {/* Contact Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <ScrollReveal>
            <div>
              <SectionHeading
                label={t('contact.getInTouch.label')}
                title={t('contact.getInTouch.title')}
              />
              <p className="mt-6 text-charcoal leading-relaxed">
                {t('contact.getInTouch.body')}
              </p>

              <div className="space-y-6 mt-8">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <item.icon size={20} className="text-charcoal-dark mt-1" />
                    <div>
                      <p className="font-heading font-bold text-sm uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="text-charcoal mt-1">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Contact Form */}
          <ScrollReveal delay={200}>
            <div className="bg-offwhite p-8 md:p-10">
              {submitted ? (
                <div className="flex items-center justify-center h-full min-h-[400px]">
                  <p className="font-heading text-xl uppercase tracking-wider text-charcoal-darker">
                    {t('contact.form.sent')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-heading uppercase tracking-wider text-charcoal-dark mb-2">
                      {t('contact.form.name')}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-charcoal-dark focus:outline-none transition-colors font-body text-charcoal-darker"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-heading uppercase tracking-wider text-charcoal-dark mb-2">
                      {t('contact.form.email')}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-charcoal-dark focus:outline-none transition-colors font-body text-charcoal-darker"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-heading uppercase tracking-wider text-charcoal-dark mb-2">
                      {t('contact.form.subject')}
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-charcoal-dark focus:outline-none transition-colors font-body text-charcoal-darker"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-heading uppercase tracking-wider text-charcoal-dark mb-2">
                      {t('contact.form.message')}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-charcoal-dark focus:outline-none transition-colors font-body text-charcoal-darker"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-charcoal-darker text-white uppercase tracking-wider font-heading hover:bg-charcoal-dark transition-colors"
                  >
                    {t('contact.form.send')}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="bg-offwhite py-20 px-6">
        <div className="bg-charcoal/10 h-80 flex items-center justify-center">
          <p className="text-charcoal/40 font-heading uppercase tracking-wider">
            {t('contact.map')}
          </p>
        </div>
      </section>
    </>
  );
}
