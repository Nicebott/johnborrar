import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Star, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type Category = 'All' | 'Beach' | 'Cultural' | 'Adventure';

interface Excursion {
  name: string;
  price: string;
  duration: string;
  category: Category;
  rating: number;
  capacity: string;
  description: string;
  image: string;
  highlights: string[];
}

export default function Excursions() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  const excursions: Excursion[] = [
    {
      name: 'Isla Saona',
      price: '$85',
      duration: 'Día completo',
      category: 'Beach',
      rating: 4.9,
      capacity: 'Grupos grandes',
      description: 'Paraíso caribeño con playas de arena blanca',
      image: 'https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=800',
      highlights: ['Playa paradisíaca', 'Almuerzo incluido', 'Snorkeling'],
    },
    {
      name: 'City Tour Santo Domingo',
      price: '$65',
      duration: '6 horas',
      category: 'Cultural',
      rating: 4.8,
      capacity: 'Hasta 12 personas',
      description: 'Descubre la historia de la primera ciudad de América',
      image: 'https://images.pexels.com/photos/9046319/pexels-photo-9046319.jpeg?auto=compress&cs=tinysrgb&w=800',
      highlights: ['Zona Colonial', 'Alcázar de Colón', 'Guía experto'],
    },
    {
      name: 'Altos de Chavón',
      price: '$65',
      duration: '4 horas',
      category: 'Cultural',
      rating: 4.7,
      capacity: 'Hasta 10 personas',
      description: 'Réplica de villa mediterránea del siglo XVI',
      image: 'https://images.pexels.com/photos/28894755/pexels-photo-28894755.jpeg?auto=compress&cs=tinysrgb&w=800',
      highlights: ['Arquitectura colonial', 'Artesanías locales', 'Anfiteatro'],
    },
    {
      name: 'Buggies Playa Macao',
      price: '$45',
      duration: '3 horas',
      category: 'Adventure',
      rating: 4.9,
      capacity: '2 personas por buggy',
      description: 'Aventura en buggy por terreno off-road',
      image: 'https://images.pexels.com/photos/38867/pexels-photo-38867.jpeg?auto=compress&cs=tinysrgb&w=800',
      highlights: ['Conducción todoterreno', 'Playa virgen', 'Emoción garantizada'],
    },
    {
      name: 'Samaná - Ballenas',
      price: '$165',
      duration: 'Día completo',
      category: 'Adventure',
      rating: 4.9,
      capacity: 'Grupos medianos',
      description: 'Avistamiento de ballenas jorobadas (Enero-Marzo)',
      image: 'https://images.pexels.com/photos/9046325/pexels-photo-9046325.jpeg?auto=compress&cs=tinysrgb&w=800',
      highlights: ['Ballenas jorobadas', 'Cayo Levantado', 'Almuerzo'],
    },
    {
      name: 'Puerto Plata Tour',
      price: '$175',
      duration: 'Día completo',
      category: 'Cultural',
      rating: 4.8,
      capacity: 'Hasta 8 personas',
      description: 'Teleférico, fortaleza y playas del norte',
      image: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=800',
      highlights: ['Teleférico', 'Fortaleza San Felipe', 'Playa Dorada'],
    },
    {
      name: '27 Charcos de Damajagua',
      price: '$95',
      duration: '6 horas',
      category: 'Adventure',
      rating: 4.9,
      capacity: 'Grupos pequeños',
      description: 'Cascadas naturales y toboganes de agua',
      image: 'https://images.pexels.com/photos/2166927/pexels-photo-2166927.jpeg?auto=compress&cs=tinysrgb&w=800',
      highlights: ['27 cascadas', 'Saltos de agua', 'Naturaleza pura'],
    },
    {
      name: 'Playa Rincón',
      price: '$120',
      duration: 'Día completo',
      category: 'Beach',
      rating: 4.8,
      capacity: 'Grupos medianos',
      description: 'Una de las playas más hermosas del Caribe',
      image: 'https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&w=800',
      highlights: ['Playa virgen', 'Agua cristalina', 'Almuerzo típico'],
    },
  ];

  const categories: Category[] = ['All', 'Beach', 'Cultural', 'Adventure'];

  const filteredExcursions =
    selectedCategory === 'All'
      ? excursions
      : excursions.filter((exc) => exc.category === selectedCategory);

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
              'url(https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=1920)',
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
            {t('excursions.title')}
            <span className="text-gold"> {t('excursions.subtitle')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
          >
            {t('excursions.description')}
          </motion.p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white sticky top-16 md:top-20 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gold text-navy shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t(`excursions.${category.toLowerCase()}`)}
              </button>
            ))}
          </div>
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
              {t(`excursions.${selectedCategory === 'All' ? 'allExcursions' : selectedCategory === 'Beach' ? 'beachExcursions' : selectedCategory === 'Cultural' ? 'culturalExcursions' : 'adventureExcursions'}`)}
            </h2>
            <p className="text-xl text-gray-600">
              {filteredExcursions.length}{' '}
              {filteredExcursions.length === 1 ? t('excursions.availableSingle') : t('excursions.available')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExcursions.map((excursion, index) => (
              <motion.div
                key={excursion.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={excursion.image}
                    alt={excursion.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-gold text-navy px-4 py-2 rounded-full font-bold text-lg">
                    {excursion.price}
                  </div>
                  <div className="absolute top-4 left-4 bg-navy/90 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {t(`excursions.${excursion.category.toLowerCase()}`)}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-navy">{excursion.name}</h3>
                    <div className="flex items-center text-gold">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm font-semibold">{excursion.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{excursion.description}</p>

                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gold" />
                      <span>{excursion.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gold" />
                      <span>{excursion.capacity}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-navy text-sm mb-2">{t('excursions.includes')}</h4>
                    <ul className="space-y-1">
                      {excursion.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-3 w-3 mr-2 text-gold" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={`https://wa.me/18099395086?text=Hola, estoy interesado en la excursión a ${excursion.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-navy hover:bg-navy/90 text-white text-center px-6 py-3 rounded-lg font-semibold transition-all"
                  >
                    {t('excursions.reserveNow')}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">{t('excursions.largeGroups')}</h2>
          <p className="text-xl text-gray-300 mb-8">
            {t('excursions.largeGroupsDescription')}
          </p>
          <a
            href="https://wa.me/18099395086?text=Hola, necesito información sobre tours personalizados"
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
