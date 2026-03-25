import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Transfers() {
  const { t } = useLanguage();
  const routes = [
    {
      from: 'Aeropuerto SDQ',
      to: 'Punta Cana (PUJ)',
      price: '$180',
      duration: '2.5 horas',
      capacity: 'Hasta 8 personas',
      image: 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      from: 'Aeropuerto SDQ',
      to: 'La Romana (LRM)',
      price: '$150',
      duration: '1.5 horas',
      capacity: 'Hasta 8 personas',
      image: 'https://images.pexels.com/photos/28894755/pexels-photo-28894755.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      from: 'Aeropuerto SDQ',
      to: 'Las Terrenas',
      price: '$200',
      duration: '3 horas',
      capacity: 'Hasta 8 personas',
      image: 'https://images.pexels.com/photos/9046325/pexels-photo-9046325.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      from: 'Aeropuerto SDQ',
      to: 'Puerto Plata',
      price: '$220',
      duration: '3.5 horas',
      capacity: 'Hasta 8 personas',
      image: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      from: 'Punta Cana',
      to: 'La Romana',
      price: '$100',
      duration: '1 hora',
      capacity: 'Hasta 8 personas',
      image: 'https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      from: 'Punta Cana',
      to: 'Santo Domingo',
      price: '$180',
      duration: '2.5 horas',
      capacity: 'Hasta 8 personas',
      image: 'https://images.pexels.com/photos/9046319/pexels-photo-9046319.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

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
            {t('transfers.title')}
            <span className="text-gold"> {t('transfers.subtitle')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
          >
            {t('transfers.description')}
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              {t('transfers.availableRoutes')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('transfers.pricesPerVehicle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {routes.map((route, index) => (
              <motion.div
                key={`${route.from}-${route.to}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img
                    src={route.image}
                    alt={`${route.from} to ${route.to}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-gold text-navy px-4 py-2 rounded-full font-bold text-lg">
                    {route.price}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center text-navy font-semibold mb-1">
                        <MapPin className="h-4 w-4 mr-1 text-gold" />
                        <span className="text-sm">{route.from}</span>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gold mx-auto my-1" />
                      <div className="flex items-center text-navy font-semibold">
                        <MapPin className="h-4 w-4 mr-1 text-gold" />
                        <span className="text-sm">{route.to}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gold" />
                      <span>{route.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gold" />
                      <span>{route.capacity}</span>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/18099395086?text=Hola, quiero reservar un traslado de ${route.from} a ${route.to}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-navy hover:bg-navy/90 text-white text-center px-6 py-3 rounded-lg font-semibold transition-all"
                  >
                    {t('transfers.reserveTransfer')}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">{t('transfers.needAnotherDestination')}</h2>
          <p className="text-xl text-gray-300 mb-8">
            {t('transfers.customQuote')}
          </p>
          <a
            href="https://wa.me/18099395086?text=Hola, necesito un traslado personalizado"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gold hover:bg-gold/90 text-navy px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
          >
            {t('transfers.requestQuote')}
          </a>
        </div>
      </section>
    </div>
  );
}
