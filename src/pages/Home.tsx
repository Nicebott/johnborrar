import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Shield, CreditCard, MapPin, Users, Star } from 'lucide-react';
import PaymentMethods from '../components/PaymentMethods';
import { useLanguage } from '../contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen pt-16 md:pt-20">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-navy/65" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 sm:px-6 max-w-4xl"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
            {t('home.hero.title')}
            <br />
            <span className="text-gold">{t('home.hero.subtitle')}</span>
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-gray-100 mb-6 md:mb-8">
            {t('home.hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/reservation"
              className="bg-gold hover:bg-gold/90 text-navy px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              {t('home.hero.reserveNow')}
            </Link>
            <a
              href="https://wa.me/18099395086?text=Hola, necesito información sobre sus servicios"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-100 text-navy px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              {t('home.hero.whatsapp')}
            </a>
          </div>
        </motion.div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center"
            >
              <div className="inline-block p-4 bg-gold/10 rounded-full mb-4">
                <Clock className="h-12 w-12 text-gold" />
              </div>
              <h3 className="text-xl font-semibold text-navy mb-2">{t('home.features.onTime.title')}</h3>
              <p className="text-gray-600">
                {t('home.features.onTime.description')}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="inline-block p-4 bg-gold/10 rounded-full mb-4">
                <Shield className="h-12 w-12 text-gold" />
              </div>
              <h3 className="text-xl font-semibold text-navy mb-2">{t('home.features.secure.title')}</h3>
              <p className="text-gray-600">
                {t('home.features.secure.description')}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="inline-block p-4 bg-gold/10 rounded-full mb-4">
                <CreditCard className="h-12 w-12 text-gold" />
              </div>
              <h3 className="text-xl font-semibold text-navy mb-2">{t('home.features.flexible.title')}</h3>
              <p className="text-gray-600">
                {t('home.features.flexible.description')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              {t('home.destinations.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('home.destinations.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { key: 'puntaCana', image: 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=800' },
              { key: 'laRomana', image: 'https://images.pexels.com/photos/28894755/pexels-photo-28894755.jpeg?auto=compress&cs=tinysrgb&w=800' },
              { key: 'lasTerrenas', image: 'https://images.pexels.com/photos/9046325/pexels-photo-9046325.jpeg?auto=compress&cs=tinysrgb&w=800' },
              { key: 'puertoPlata', image: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=800' },
            ].map((destination, index) => (
              <motion.div
                key={destination.key}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={destination.image}
                    alt={t(`home.destinations.${destination.key}.name`)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-white text-xl font-bold mb-1 flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-gold" />
                      {t(`home.destinations.${destination.key}.name`)}
                    </h3>
                    <p className="text-gray-200 text-sm">{t(`home.destinations.${destination.key}.description`)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/transfers"
              className="inline-block bg-navy hover:bg-navy/90 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              {t('home.destinations.viewAll')}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('home.excursions.title')}
            </h2>
            <p className="text-xl text-gray-300">
              {t('home.excursions.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Isla Saona', price: '$85', image: 'https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=800', rating: 4.9 },
              { name: 'City Tour Santo Domingo', price: '$65', image: 'https://images.pexels.com/photos/9046319/pexels-photo-9046319.jpeg?auto=compress&cs=tinysrgb&w=800', rating: 4.8 },
              { name: 'Buggies Macao', price: '$45', image: 'https://images.pexels.com/photos/38867/pexels-photo-38867.jpeg?auto=compress&cs=tinysrgb&w=800', rating: 4.9 },
            ].map((excursion, index) => (
              <motion.div
                key={excursion.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={excursion.image}
                    alt={excursion.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-navy">{excursion.name}</h3>
                    <div className="flex items-center text-gold">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm font-semibold">{excursion.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gold">{excursion.price}</span>
                    <a
                      href={`https://wa.me/18099395086?text=Hola, estoy interesado en la excursión a ${excursion.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-navy hover:bg-navy/90 text-white px-6 py-2 rounded-lg font-semibold transition-all"
                    >
                      {t('home.excursions.reserve')}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/excursions"
              className="inline-block bg-gold hover:bg-gold/90 text-navy px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              {t('home.excursions.viewAll')}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-yellow-400 py-12 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4 md:space-y-6 order-2 md:order-1"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight">
                {t('home.cta.title')}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-navy/80">
                {t('home.cta.description')}
              </p>
              <a
                href="https://wa.me/18099395086?text=Hola, quiero reservar un traslado"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-navy hover:bg-navy/90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base transition-all transform hover:scale-105 shadow-lg"
              >
                {t('home.cta.button')}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-center md:justify-end order-1 md:order-2"
            >
              <img
                src="/hiace-commuter-gl-e1744853781889.png"
                alt="Toyota Hiace"
                className="max-w-xs sm:max-w-sm md:max-w-full h-auto drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <PaymentMethods />
    </div>
  );
}
