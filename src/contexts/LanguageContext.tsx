import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'es' | 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

const translations = {
  es: {
    nav: {
      home: 'Inicio',
      transfers: 'Traslados',
      excursions: 'Excursiones',
      reservation: 'Reservar',
      contact: 'Contacto',
    },
    home: {
      hero: {
        title: 'El mejor servicio de traslados',
        subtitle: 'en República Dominicana',
        description: 'Confiable, seguro y puntual. Su comodidad es nuestra prioridad.',
        reserveNow: 'Reservar Ahora',
        whatsapp: 'WhatsApp',
      },
      features: {
        onTime: {
          title: 'Siempre a Tiempo',
          description: 'Puntualidad garantizada en todos nuestros servicios',
        },
        secure: {
          title: 'Reserva Segura',
          description: 'Sistema de reservas confiable y protegido',
        },
        flexible: {
          title: 'Pago Flexible',
          description: 'Pague el día del servicio, sin complicaciones',
        },
      },
      destinations: {
        title: 'Destinos Populares',
        subtitle: 'Llevamos a los mejores lugares de República Dominicana',
        puntaCana: {
          name: 'Punta Cana',
          description: 'Playas paradisíacas y resorts de lujo',
        },
        laRomana: {
          name: 'La Romana',
          description: 'Golf, playas y cultura',
        },
        lasTerrenas: {
          name: 'Las Terrenas',
          description: 'Pueblo costero encantador',
        },
        puertoPlata: {
          name: 'Puerto Plata',
          description: 'Arquitectura colonial y aventuras',
        },
        viewAll: 'Ver Todos los Traslados',
      },
      excursions: {
        title: 'Excursiones Destacadas',
        subtitle: 'Vive experiencias inolvidables',
        reserve: 'Reservar',
        viewAll: 'Ver Todas las Excursiones',
      },
      cta: {
        title: 'Contactenos Y Reserve Sus Traslados Para Tu Próximo Viaje.',
        description: 'Capacidad para cualquier número de pasajeros. Los mejores precios. Unidades totalmente aseguradas y autorizadas.',
        button: 'Reserve Por Whatsapp',
      },
    },
    transfers: {
      title: 'Traslados',
      subtitle: 'Privados',
      description: 'Servicio de transporte confiable entre aeropuertos y destinos turísticos',
      availableRoutes: 'Rutas Disponibles',
      pricesPerVehicle: 'Precios por vehículo, no por persona',
      reserveTransfer: 'Reservar Traslado',
      needAnotherDestination: '¿Necesitas otro destino?',
      customQuote: 'Ofrecemos traslados a cualquier destino en República Dominicana. Contáctanos para una cotización personalizada.',
      requestQuote: 'Solicitar Cotización',
    },
    excursions: {
      title: 'Excursiones',
      subtitle: 'Inolvidables',
      description: 'Descubre la belleza natural y cultural de República Dominicana',
      all: 'Todas',
      beach: 'Playa',
      cultural: 'Cultural',
      adventure: 'Aventura',
      allExcursions: 'Todas las Excursiones',
      beachExcursions: 'Excursiones de Playa',
      culturalExcursions: 'Excursiones Culturales',
      adventureExcursions: 'Excursiones de Aventura',
      available: 'excursiones disponibles',
      availableSingle: 'excursión disponible',
      includes: 'Incluye:',
      reserveNow: 'Reservar Ahora',
      largeGroups: 'Grupos Grandes o Tours Personalizados',
      largeGroupsDescription: '¿Viajan más de 10 personas? ¿Quieres crear tu propia excursión? Contáctanos para un paquete personalizado.',
    },
    reservation: {
      title: 'Reserva tu Servicio',
      subtitle: 'Completa el formulario en 3 sencillos pasos',
      step1: {
        title: 'Información del Servicio',
        serviceType: 'Tipo de Servicio',
        transfer: 'Traslado',
        excursion: 'Excursión',
        origin: 'Origen',
        destination: 'Destino',
        date: 'Fecha',
        time: 'Hora',
        continue: 'Continuar',
      },
      step2: {
        title: 'Detalles del Viaje',
        passengers: 'Número de Pasajeros',
        flightNumber: 'Número de Vuelo (opcional)',
        vehicleType: 'Tipo de Vehículo',
        sedan: 'Sedan',
        van: 'Van',
        hiace: 'Hiace',
        upTo: 'Hasta',
        pax: 'pax',
        back: 'Atrás',
        continue: 'Continuar',
      },
      step3: {
        title: 'Información de Contacto',
        name: 'Nombre Completo',
        email: 'Email',
        phone: 'Teléfono',
        comments: 'Comentarios Adicionales (opcional)',
        commentsPlaceholder: 'Cualquier información adicional que debamos saber...',
        back: 'Atrás',
        submit: 'Enviar Reserva',
      },
      success: {
        title: '¡Reserva Recibida!',
        message: 'Gracias por confiar en JP Transfers. Hemos recibido tu solicitud de reserva.',
        followUp: 'Nos pondremos en contacto contigo en las próximas horas para confirmar todos los detalles. También puedes contactarnos directamente por WhatsApp.',
        whatsapp: 'WhatsApp',
        home: 'Volver al Inicio',
      },
      steps: {
        service: 'Servicio',
        details: 'Detalles',
        contact: 'Contacto',
      },
    },
    contact: {
      title: 'Contáctanos',
      subtitle: 'Estamos aquí para ayudarte. Envíanos un mensaje o llámanos directamente.',
      phone: 'Teléfono',
      email: 'Email',
      location: 'Ubicación',
      schedule: 'Horario',
      scheduleValue: '24/7 - Siempre disponibles',
      locationValue: 'Santo Domingo, República Dominicana',
      sendMessage: 'Envíanos un Mensaje',
      name: 'Nombre Completo',
      subject: 'Asunto',
      message: 'Mensaje',
      messagePlaceholder: 'Escribe tu mensaje aquí...',
      submitMessage: 'Enviar Mensaje',
      successMessage: '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.',
      preferWhatsApp: '¿Prefieres WhatsApp?',
      whatsAppDescription: 'Obtén respuestas instantáneas a través de nuestro WhatsApp disponible 24/7.',
      openWhatsApp: 'Abrir WhatsApp',
      ourLocation: 'Nuestra Ubicación',
      whyChooseUs: '¿Por qué elegirnos?',
      reasons: {
        experience: 'Más de 10 años de experiencia en el sector turístico',
        drivers: 'Conductores profesionales certificados',
        fleet: 'Flota moderna y mantenida regularmente',
        support: 'Atención al cliente 24/7',
        payment: 'Pago flexible el día del servicio',
        pricing: 'Precios competitivos sin cargos ocultos',
      },
    },
    footer: {
      description: 'El mejor servicio de traslados y excursiones en República Dominicana. Confiable, seguro y profesional.',
      services: 'Servicios',
      destinations: 'Destinos',
      contact: 'Contacto',
      rights: 'Todos los derechos reservados.',
      servicesList: {
        airportTransfers: 'Traslados Aeropuerto',
        excursions: 'Excursiones',
        corporate: 'Servicio Corporativo',
        vehicleRental: 'Renta de Vehículos',
      },
    },
    payment: {
      title: 'Formas de Pago',
      subtitle: 'Aceptamos múltiples métodos de pago para tu comodidad',
      methods: {
        card: {
          name: 'Tarjeta de Crédito/Débito',
          description: 'Visa, Mastercard, American Express',
        },
        bank: {
          name: 'Transferencia Bancaria',
          description: 'Depósito o transferencia directa',
        },
        paypal: {
          name: 'PayPal',
          description: 'Pago seguro en línea',
        },
        cash: {
          name: 'Efectivo',
          description: 'Pago el día del servicio',
        },
      },
      flexible: {
        title: 'Pago Flexible',
        description: 'Reserva ahora y paga el día del servicio. Sin cargos por adelantado, sin complicaciones.',
        note: 'Para transferencias bancarias o PayPal, contáctanos para recibir los detalles de pago.',
      },
    },
    common: {
      fullDay: 'Día completo',
      hours: 'horas',
      hour: 'hora',
      from: 'desde',
      to: 'hasta',
      perPerson: 'por persona',
      perVehicle: 'por vehículo',
    },
  },
  en: {
    nav: {
      home: 'Home',
      transfers: 'Transfers',
      excursions: 'Excursions',
      reservation: 'Book',
      contact: 'Contact',
    },
    home: {
      hero: {
        title: 'The best transfer service',
        subtitle: 'in Dominican Republic',
        description: 'Reliable, safe and punctual. Your comfort is our priority.',
        reserveNow: 'Book Now',
        whatsapp: 'WhatsApp',
      },
      features: {
        onTime: {
          title: 'Always On Time',
          description: 'Punctuality guaranteed in all our services',
        },
        secure: {
          title: 'Secure Booking',
          description: 'Reliable and protected reservation system',
        },
        flexible: {
          title: 'Flexible Payment',
          description: 'Pay on the day of service, no hassle',
        },
      },
      destinations: {
        title: 'Popular Destinations',
        subtitle: 'We take you to the best places in Dominican Republic',
        puntaCana: {
          name: 'Punta Cana',
          description: 'Paradise beaches and luxury resorts',
        },
        laRomana: {
          name: 'La Romana',
          description: 'Golf, beaches and culture',
        },
        lasTerrenas: {
          name: 'Las Terrenas',
          description: 'Charming coastal town',
        },
        puertoPlata: {
          name: 'Puerto Plata',
          description: 'Colonial architecture and adventures',
        },
        viewAll: 'View All Transfers',
      },
      excursions: {
        title: 'Featured Excursions',
        subtitle: 'Live unforgettable experiences',
        reserve: 'Book',
        viewAll: 'View All Excursions',
      },
      cta: {
        title: 'Contact Us And Book Your Transfers For Your Next Trip.',
        description: 'Capacity for any number of passengers. The best prices. Fully insured and authorized units.',
        button: 'Book Via WhatsApp',
      },
    },
    transfers: {
      title: 'Transfers',
      subtitle: 'Private',
      description: 'Reliable transportation service between airports and tourist destinations',
      availableRoutes: 'Available Routes',
      pricesPerVehicle: 'Prices per vehicle, not per person',
      reserveTransfer: 'Book Transfer',
      needAnotherDestination: 'Need another destination?',
      customQuote: 'We offer transfers to any destination in Dominican Republic. Contact us for a personalized quote.',
      requestQuote: 'Request Quote',
    },
    excursions: {
      title: 'Excursions',
      subtitle: 'Unforgettable',
      description: 'Discover the natural and cultural beauty of Dominican Republic',
      all: 'All',
      beach: 'Beach',
      cultural: 'Cultural',
      adventure: 'Adventure',
      allExcursions: 'All Excursions',
      beachExcursions: 'Beach Excursions',
      culturalExcursions: 'Cultural Excursions',
      adventureExcursions: 'Adventure Excursions',
      available: 'excursions available',
      availableSingle: 'excursion available',
      includes: 'Includes:',
      reserveNow: 'Book Now',
      largeGroups: 'Large Groups or Custom Tours',
      largeGroupsDescription: 'Traveling with more than 10 people? Want to create your own excursion? Contact us for a custom package.',
    },
    reservation: {
      title: 'Book Your Service',
      subtitle: 'Complete the form in 3 easy steps',
      step1: {
        title: 'Service Information',
        serviceType: 'Service Type',
        transfer: 'Transfer',
        excursion: 'Excursion',
        origin: 'Origin',
        destination: 'Destination',
        date: 'Date',
        time: 'Time',
        continue: 'Continue',
      },
      step2: {
        title: 'Trip Details',
        passengers: 'Number of Passengers',
        flightNumber: 'Flight Number (optional)',
        vehicleType: 'Vehicle Type',
        sedan: 'Sedan',
        van: 'Van',
        hiace: 'Hiace',
        upTo: 'Up to',
        pax: 'pax',
        back: 'Back',
        continue: 'Continue',
      },
      step3: {
        title: 'Contact Information',
        name: 'Full Name',
        email: 'Email',
        phone: 'Phone',
        comments: 'Additional Comments (optional)',
        commentsPlaceholder: 'Any additional information we should know...',
        back: 'Back',
        submit: 'Submit Booking',
      },
      success: {
        title: 'Booking Received!',
        message: 'Thank you for trusting JP Transfers. We have received your booking request.',
        followUp: 'We will contact you in the next few hours to confirm all details. You can also contact us directly via WhatsApp.',
        whatsapp: 'WhatsApp',
        home: 'Back to Home',
      },
      steps: {
        service: 'Service',
        details: 'Details',
        contact: 'Contact',
      },
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'We are here to help you. Send us a message or call us directly.',
      phone: 'Phone',
      email: 'Email',
      location: 'Location',
      schedule: 'Schedule',
      scheduleValue: '24/7 - Always available',
      locationValue: 'Santo Domingo, Dominican Republic',
      sendMessage: 'Send Us a Message',
      name: 'Full Name',
      subject: 'Subject',
      message: 'Message',
      messagePlaceholder: 'Write your message here...',
      submitMessage: 'Send Message',
      successMessage: 'Message sent successfully! We will contact you soon.',
      preferWhatsApp: 'Prefer WhatsApp?',
      whatsAppDescription: 'Get instant answers through our 24/7 available WhatsApp.',
      openWhatsApp: 'Open WhatsApp',
      ourLocation: 'Our Location',
      whyChooseUs: 'Why choose us?',
      reasons: {
        experience: 'Over 10 years of experience in the tourism sector',
        drivers: 'Certified professional drivers',
        fleet: 'Modern and regularly maintained fleet',
        support: '24/7 customer support',
        payment: 'Flexible payment on the day of service',
        pricing: 'Competitive prices with no hidden charges',
      },
    },
    footer: {
      description: 'The best transfer and excursion service in Dominican Republic. Reliable, safe and professional.',
      services: 'Services',
      destinations: 'Destinations',
      contact: 'Contact',
      rights: 'All rights reserved.',
      servicesList: {
        airportTransfers: 'Airport Transfers',
        excursions: 'Excursions',
        corporate: 'Corporate Service',
        vehicleRental: 'Vehicle Rental',
      },
    },
    payment: {
      title: 'Payment Methods',
      subtitle: 'We accept multiple payment methods for your convenience',
      methods: {
        card: {
          name: 'Credit/Debit Card',
          description: 'Visa, Mastercard, American Express',
        },
        bank: {
          name: 'Bank Transfer',
          description: 'Direct deposit or transfer',
        },
        paypal: {
          name: 'PayPal',
          description: 'Secure online payment',
        },
        cash: {
          name: 'Cash',
          description: 'Payment on the day of service',
        },
      },
      flexible: {
        title: 'Flexible Payment',
        description: 'Book now and pay on the day of service. No upfront charges, no hassle.',
        note: 'For bank transfers or PayPal, contact us to receive payment details.',
      },
    },
    common: {
      fullDay: 'Full day',
      hours: 'hours',
      hour: 'hour',
      from: 'from',
      to: 'to',
      perPerson: 'per person',
      perVehicle: 'per vehicle',
    },
  },
  de: {
    nav: {
      home: 'Startseite',
      transfers: 'Transfers',
      excursions: 'Ausflüge',
      reservation: 'Buchen',
      contact: 'Kontakt',
    },
    home: {
      hero: {
        title: 'Der beste Transfer-Service',
        subtitle: 'in der Dominikanischen Republik',
        description: 'Zuverlässig, sicher und pünktlich. Ihr Komfort ist unsere Priorität.',
        reserveNow: 'Jetzt buchen',
        whatsapp: 'WhatsApp',
      },
      features: {
        onTime: {
          title: 'Immer pünktlich',
          description: 'Pünktlichkeit garantiert in allen unseren Dienstleistungen',
        },
        secure: {
          title: 'Sichere Buchung',
          description: 'Zuverlässiges und geschütztes Buchungssystem',
        },
        flexible: {
          title: 'Flexible Zahlung',
          description: 'Zahlen Sie am Tag der Dienstleistung, unkompliziert',
        },
      },
      destinations: {
        title: 'Beliebte Reiseziele',
        subtitle: 'Wir bringen Sie zu den besten Orten der Dominikanischen Republik',
        puntaCana: {
          name: 'Punta Cana',
          description: 'Paradiesische Strände und Luxusresorts',
        },
        laRomana: {
          name: 'La Romana',
          description: 'Golf, Strände und Kultur',
        },
        lasTerrenas: {
          name: 'Las Terrenas',
          description: 'Charmante Küstenstadt',
        },
        puertoPlata: {
          name: 'Puerto Plata',
          description: 'Kolonialarchitektur und Abenteuer',
        },
        viewAll: 'Alle Transfers anzeigen',
      },
      excursions: {
        title: 'Empfohlene Ausflüge',
        subtitle: 'Erleben Sie unvergessliche Erfahrungen',
        reserve: 'Buchen',
        viewAll: 'Alle Ausflüge anzeigen',
      },
      cta: {
        title: 'Kontaktieren Sie uns und buchen Sie Ihre Transfers für Ihre nächste Reise.',
        description: 'Kapazität für beliebige Anzahl von Passagieren. Die besten Preise. Vollständig versicherte und autorisierte Fahrzeuge.',
        button: 'Per WhatsApp buchen',
      },
    },
    transfers: {
      title: 'Transfers',
      subtitle: 'Privat',
      description: 'Zuverlässiger Transportservice zwischen Flughäfen und Touristenzielen',
      availableRoutes: 'Verfügbare Routen',
      pricesPerVehicle: 'Preise pro Fahrzeug, nicht pro Person',
      reserveTransfer: 'Transfer buchen',
      needAnotherDestination: 'Benötigen Sie ein anderes Ziel?',
      customQuote: 'Wir bieten Transfers zu jedem Ziel in der Dominikanischen Republik. Kontaktieren Sie uns für ein personalisiertes Angebot.',
      requestQuote: 'Angebot anfordern',
    },
    excursions: {
      title: 'Ausflüge',
      subtitle: 'Unvergesslich',
      description: 'Entdecken Sie die natürliche und kulturelle Schönheit der Dominikanischen Republik',
      all: 'Alle',
      beach: 'Strand',
      cultural: 'Kulturell',
      adventure: 'Abenteuer',
      allExcursions: 'Alle Ausflüge',
      beachExcursions: 'Strandausflüge',
      culturalExcursions: 'Kulturelle Ausflüge',
      adventureExcursions: 'Abenteuerausflüge',
      available: 'Ausflüge verfügbar',
      availableSingle: 'Ausflug verfügbar',
      includes: 'Beinhaltet:',
      reserveNow: 'Jetzt buchen',
      largeGroups: 'Große Gruppen oder maßgeschneiderte Touren',
      largeGroupsDescription: 'Reisen Sie mit mehr als 10 Personen? Möchten Sie Ihren eigenen Ausflug erstellen? Kontaktieren Sie uns für ein individuelles Paket.',
    },
    reservation: {
      title: 'Buchen Sie Ihren Service',
      subtitle: 'Füllen Sie das Formular in 3 einfachen Schritten aus',
      step1: {
        title: 'Service-Informationen',
        serviceType: 'Service-Typ',
        transfer: 'Transfer',
        excursion: 'Ausflug',
        origin: 'Abfahrtsort',
        destination: 'Zielort',
        date: 'Datum',
        time: 'Uhrzeit',
        continue: 'Weiter',
      },
      step2: {
        title: 'Reisedetails',
        passengers: 'Anzahl der Passagiere',
        flightNumber: 'Flugnummer (optional)',
        vehicleType: 'Fahrzeugtyp',
        sedan: 'Limousine',
        van: 'Van',
        hiace: 'Hiace',
        upTo: 'Bis zu',
        pax: 'Pax',
        back: 'Zurück',
        continue: 'Weiter',
      },
      step3: {
        title: 'Kontaktinformationen',
        name: 'Vollständiger Name',
        email: 'E-Mail',
        phone: 'Telefon',
        comments: 'Zusätzliche Kommentare (optional)',
        commentsPlaceholder: 'Weitere Informationen, die wir wissen sollten...',
        back: 'Zurück',
        submit: 'Buchung absenden',
      },
      success: {
        title: 'Buchung erhalten!',
        message: 'Vielen Dank, dass Sie JP Transfers vertrauen. Wir haben Ihre Buchungsanfrage erhalten.',
        followUp: 'Wir werden Sie in den nächsten Stunden kontaktieren, um alle Details zu bestätigen. Sie können uns auch direkt per WhatsApp kontaktieren.',
        whatsapp: 'WhatsApp',
        home: 'Zurück zur Startseite',
      },
      steps: {
        service: 'Service',
        details: 'Details',
        contact: 'Kontakt',
      },
    },
    contact: {
      title: 'Kontaktieren Sie uns',
      subtitle: 'Wir sind hier, um Ihnen zu helfen. Senden Sie uns eine Nachricht oder rufen Sie uns direkt an.',
      phone: 'Telefon',
      email: 'E-Mail',
      location: 'Standort',
      schedule: 'Öffnungszeiten',
      scheduleValue: '24/7 - Immer verfügbar',
      locationValue: 'Santo Domingo, Dominikanische Republik',
      sendMessage: 'Senden Sie uns eine Nachricht',
      name: 'Vollständiger Name',
      subject: 'Betreff',
      message: 'Nachricht',
      messagePlaceholder: 'Schreiben Sie hier Ihre Nachricht...',
      submitMessage: 'Nachricht senden',
      successMessage: 'Nachricht erfolgreich gesendet! Wir werden uns bald bei Ihnen melden.',
      preferWhatsApp: 'Bevorzugen Sie WhatsApp?',
      whatsAppDescription: 'Erhalten Sie sofortige Antworten über unser 24/7 verfügbares WhatsApp.',
      openWhatsApp: 'WhatsApp öffnen',
      ourLocation: 'Unser Standort',
      whyChooseUs: 'Warum uns wählen?',
      reasons: {
        experience: 'Über 10 Jahre Erfahrung im Tourismussektor',
        drivers: 'Zertifizierte professionelle Fahrer',
        fleet: 'Moderne und regelmäßig gewartete Flotte',
        support: '24/7 Kundensupport',
        payment: 'Flexible Zahlung am Tag der Dienstleistung',
        pricing: 'Wettbewerbsfähige Preise ohne versteckte Gebühren',
      },
    },
    footer: {
      description: 'Der beste Transfer- und Ausflugsservice in der Dominikanischen Republik. Zuverlässig, sicher und professionell.',
      services: 'Dienstleistungen',
      destinations: 'Reiseziele',
      contact: 'Kontakt',
      rights: 'Alle Rechte vorbehalten.',
      servicesList: {
        airportTransfers: 'Flughafen-Transfers',
        excursions: 'Ausflüge',
        corporate: 'Firmenservice',
        vehicleRental: 'Fahrzeugvermietung',
      },
    },
    payment: {
      title: 'Zahlungsmethoden',
      subtitle: 'Wir akzeptieren mehrere Zahlungsmethoden für Ihre Bequemlichkeit',
      methods: {
        card: {
          name: 'Kredit-/Debitkarte',
          description: 'Visa, Mastercard, American Express',
        },
        bank: {
          name: 'Banküberweisung',
          description: 'Direkte Einzahlung oder Überweisung',
        },
        paypal: {
          name: 'PayPal',
          description: 'Sichere Online-Zahlung',
        },
        cash: {
          name: 'Bargeld',
          description: 'Zahlung am Tag der Dienstleistung',
        },
      },
      flexible: {
        title: 'Flexible Zahlung',
        description: 'Jetzt buchen und am Tag der Dienstleistung bezahlen. Keine Vorauszahlung, kein Aufwand.',
        note: 'Für Banküberweisungen oder PayPal kontaktieren Sie uns, um Zahlungsdetails zu erhalten.',
      },
    },
    common: {
      fullDay: 'Ganztägig',
      hours: 'Stunden',
      hour: 'Stunde',
      from: 'von',
      to: 'nach',
      perPerson: 'pro Person',
      perVehicle: 'pro Fahrzeug',
    },
  },
};
