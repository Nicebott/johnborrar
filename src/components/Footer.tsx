import { Link } from 'react-router-dom';
import { Plane, Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const services = [
    { name: t('footer.servicesList.airportTransfers'), path: '/transfers' },
    { name: t('footer.servicesList.excursions'), path: '/excursions' },
    { name: t('footer.servicesList.corporate'), path: '/contact' },
  ];

  const destinations = [
    'Punta Cana',
    'La Romana',
    'Las Terrenas',
    'Puerto Plata',
    'Samaná',
    'Santo Domingo',
  ];

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-3 md:mb-4">
              <Plane className="h-6 w-6 md:h-8 md:w-8 text-gold flex-shrink-0" />
              <span className="text-lg md:text-xl font-bold">JP Transfers</span>
            </div>
            <p className="text-gray-300 text-xs md:text-sm mb-3 md:mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/juanpimentel2265?mibextid=wwXIfr&rdid=stwtsCZT5Tzr3b7q&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16XS5WzZs4%2F%3Fmibextid%3DwwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors p-1"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 md:h-5 md:w-5" />
              </a>
              <a
                href="https://www.instagram.com/jptransporte_juan_pimentel?igsh=MTQ1Mnp5ZHl1cmVndQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors p-1"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 md:h-5 md:w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-gold">
              {t('footer.services')}
            </h3>
            <ul className="space-y-1 md:space-y-2">
              {services.map((service) => (
                <li key={service.path}>
                  <Link
                    to={service.path}
                    className="text-gray-300 hover:text-gold transition-colors text-xs md:text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-gold">
              {t('footer.destinations')}
            </h3>
            <ul className="space-y-1 md:space-y-2">
              {destinations.map((destination) => (
                <li key={destination}>
                  <span className="text-gray-300 text-xs md:text-sm">{destination}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-gold">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="h-3 w-3 md:h-4 md:w-4 text-gold flex-shrink-0" />
                <a
                  href="tel:+18099395086"
                  className="text-gray-300 hover:text-gold transition-colors text-xs md:text-sm break-all"
                >
                  +1 (809) 939-5086
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-3 w-3 md:h-4 md:w-4 text-gold flex-shrink-0" />
                <a
                  href="mailto:info@jptransfers.com"
                  className="text-gray-300 hover:text-gold transition-colors text-xs md:text-sm break-all"
                >
                  info@jptransfers.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-3 w-3 md:h-4 md:w-4 text-gold mt-0.5 md:mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-xs md:text-sm">
                  Santo Domingo, República Dominicana
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 md:mt-8 pt-6 md:pt-8 text-center">
          <p className="text-gray-400 text-xs md:text-sm">
            &copy; {new Date().getFullYear()} JP Transfers. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
