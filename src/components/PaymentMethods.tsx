import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Building2, DollarSign } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function PaymentMethods() {
  const { t } = useLanguage();

  const paymentMethods = [
    {
      icon: CreditCard,
      name: t('payment.methods.card.name'),
      description: t('payment.methods.card.description'),
      available: true,
    },
    {
      icon: Building2,
      name: t('payment.methods.bank.name'),
      description: t('payment.methods.bank.description'),
      available: true,
    },
    {
      icon: Smartphone,
      name: t('payment.methods.paypal.name'),
      description: t('payment.methods.paypal.description'),
      available: true,
    },
    {
      icon: DollarSign,
      name: t('payment.methods.cash.name'),
      description: t('payment.methods.cash.description'),
      available: true,
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="bg-white py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-3 md:mb-4">
            {t('payment.title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            {t('payment.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-4 md:p-6 text-center hover:shadow-lg transition-all"
            >
              <div className="inline-block p-3 md:p-4 bg-gold/10 rounded-full mb-3 md:mb-4">
                <method.icon className="h-6 w-6 md:h-8 md:w-8 text-gold" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-navy mb-2">{method.name}</h3>
              <p className="text-xs md:text-sm text-gray-600">{method.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ delay: 0.4 }}
          className="mt-8 md:mt-12 bg-navy/5 rounded-xl p-4 md:p-8 text-center"
        >
          <h3 className="text-lg md:text-xl font-bold text-navy mb-2 md:mb-3">
            {t('payment.flexible.title')}
          </h3>
          <p className="text-sm md:text-base text-gray-700 mb-3 md:mb-4">
            {t('payment.flexible.description')}
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            {t('payment.flexible.note')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
