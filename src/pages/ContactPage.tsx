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

      {/* Map Section */}
      <section className="bg-offwhite py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="w-full h-80 md:h-[450px] overflow-hidden">
            <iframe
              title="The Drawing Company Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.0!2d44.5130!3d40.1810!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s10%2F1+Davit+Anhaght+St%2C+Yerevan%2C+Armenia!5e0!3m2!1sen!2sam!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
