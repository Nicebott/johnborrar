import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../contexts/LanguageContext';

const contactSchema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone required'),
  subject: z.string().min(3, 'Subject required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactData) => {
    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          from_name: data.name,
          from_email: data.email,
          phone: data.phone,
          subject: data.subject,
          message: data.message,
        },
        'YOUR_PUBLIC_KEY'
      );
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Hubo un error al enviar el mensaje. Por favor, contáctanos por WhatsApp.');
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const contactInfo = [
    {
      icon: Phone,
      title: t('contact.phone'),
      content: '+1 (809) 939-5086',
      link: 'tel:+18099395086',
    },
    {
      icon: Mail,
      title: t('contact.email'),
      content: 'info@jptransfers.com',
      link: 'mailto:info@jptransfers.com',
    },
    {
      icon: MapPin,
      title: t('contact.location'),
      content: t('contact.locationValue'),
      link: '#',
    },
    {
      icon: Clock,
      title: t('contact.schedule'),
      content: t('contact.scheduleValue'),
      link: '#',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative bg-navy text-white py-20 md:py-32 mt-16 md:mt-20">
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            {t('contact.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
          >
            {t('contact.subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.link}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className={`bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-center ${
                  info.link !== '#' ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <div className="inline-block p-3 bg-gold/10 rounded-full mb-4">
                  <info.icon className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">{info.title}</h3>
                <p className="text-gray-600 text-sm">{info.content}</p>
              </motion.a>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold text-navy mb-6">{t('contact.sendMessage')}</h2>

              {isSubmitted && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
                  {t('contact.successMessage')}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">
                    {t('contact.name')}
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    placeholder="Juan Pérez"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">{t('contact.email')}</label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="juan@ejemplo.com"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">{t('contact.phone')}</label>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="+1 (809) 123-4567"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                    />
                    {errors.phone && (
                      <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">{t('contact.subject')}</label>
                  <input
                    {...register('subject')}
                    type="text"
                    placeholder={t('contact.subject')}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                  />
                  {errors.subject && (
                    <p className="text-red-600 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">{t('contact.message')}</label>
                  <textarea
                    {...register('message')}
                    rows={6}
                    placeholder={t('contact.messagePlaceholder')}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                  />
                  {errors.message && (
                    <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold/90 text-navy px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center"
                >
                  {t('contact.submitMessage')}
                  <Send className="ml-2 h-5 w-5" />
                </button>
              </form>

              <div className="mt-8 p-6 bg-green-50 rounded-xl border-2 border-green-200">
                <div className="flex items-start">
                  <MessageCircle className="h-6 w-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-navy mb-2">{t('contact.preferWhatsApp')}</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {t('contact.whatsAppDescription')}
                    </p>
                    <a
                      href="https://wa.me/18099395086?text=Hola, necesito información"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
                    >
                      {t('contact.openWhatsApp')}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-navy mb-6">{t('contact.ourLocation')}</h2>
              <div className="rounded-xl overflow-hidden shadow-lg mb-6 h-[400px] bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245777.3032969084!2d-69.96212679999999!3d18.4850545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf89ad90750c2b%3A0x81a3d4f4a9eb9d05!2sSanto%20Domingo%2C%20Dominican%20Republic!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="JP Transfers Location"
                />
              </div>

              <div className="bg-navy text-white rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">{t('contact.whyChooseUs')}</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gold rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>{t('contact.reasons.experience')}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gold rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>{t('contact.reasons.drivers')}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gold rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>{t('contact.reasons.fleet')}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gold rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>{t('contact.reasons.support')}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gold rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>{t('contact.reasons.payment')}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gold rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>{t('contact.reasons.pricing')}</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
