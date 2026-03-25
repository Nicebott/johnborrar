import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle, Calendar, MapPin, Users, Plane } from 'lucide-react';
import emailjs from '@emailjs/browser';
import PaymentMethods from '../components/PaymentMethods';
import { useLanguage } from '../contexts/LanguageContext';

const step1Schema = z.object({
  origin: z.string().min(1, 'Origin required'),
  destination: z.string().min(1, 'Destination required'),
  date: z.string().min(1, 'Date required'),
  time: z.string().min(1, 'Time required'),
  serviceType: z.enum(['transfer', 'excursion']),
});

const step2Schema = z.object({
  passengers: z.string().min(1, 'Passengers required'),
  flightNumber: z.string().optional(),
  vehicleType: z.enum(['sedan', 'van', 'hiace']),
});

const step3Schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone required'),
  comments: z.string().optional(),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;

export default function Reservation() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null);

  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      serviceType: 'transfer',
    },
  });

  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      vehicleType: 'van',
    },
  });

  const step3Form = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
  });

  const onStep1Submit = (data: Step1Data) => {
    setStep1Data(data);
    setCurrentStep(2);
  };

  const onStep2Submit = (data: Step2Data) => {
    setStep2Data(data);
    setCurrentStep(3);
  };

  const onStep3Submit = async (data: Step3Data) => {
    const fullData = {
      ...step1Data,
      ...step2Data,
      ...data,
    };

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          from_name: fullData.name,
          from_email: fullData.email,
          phone: fullData.phone,
          origin: fullData.origin,
          destination: fullData.destination,
          date: fullData.date,
          time: fullData.time,
          passengers: fullData.passengers,
          flight_number: fullData.flightNumber || 'N/A',
          vehicle_type: fullData.vehicleType,
          service_type: fullData.serviceType,
          comments: fullData.comments || 'N/A',
        },
        'YOUR_PUBLIC_KEY'
      );
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Hubo un error al enviar la reserva. Por favor, contáctanos por WhatsApp.');
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center"
        >
          <div className="inline-block p-4 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            {t('reservation.success.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {t('reservation.success.message')}
          </p>
          <p className="text-gray-600 mb-8">
            {t('reservation.success.followUp')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/18099395086?text=Hola, acabo de enviar una reserva"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
            >
              {t('reservation.success.whatsapp')}
            </a>
            <a
              href="/"
              className="bg-navy hover:bg-navy/90 text-white px-8 py-3 rounded-lg font-semibold transition-all"
            >
              {t('reservation.success.home')}
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20 md:py-24 mt-16 md:mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            {t('reservation.title')}
          </h1>
          <p className="text-xl text-gray-600">{t('reservation.subtitle')}</p>
        </motion.div>

        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    currentStep >= step
                      ? 'bg-gold text-navy'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 md:w-32 h-1 ${
                      currentStep > step ? 'bg-gold' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm text-gray-600 max-w-md mx-auto">
            <span>{t('reservation.steps.service')}</span>
            <span>{t('reservation.steps.details')}</span>
            <span>{t('reservation.steps.contact')}</span>
          </div>
        </div>

        <motion.div
          key={currentStep}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
        >
          {currentStep === 1 && (
            <form onSubmit={step1Form.handleSubmit(onStep1Submit)} className="space-y-6">
              <h2 className="text-2xl font-bold text-navy mb-6 flex items-center">
                <MapPin className="mr-2 text-gold" />
                {t('reservation.step1.title')}
              </h2>

              <div>
                <label className="block text-sm font-semibold text-navy mb-2">
                  {t('reservation.step1.serviceType')}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer hover:border-gold transition-colors">
                    <input
                      type="radio"
                      value="transfer"
                      {...step1Form.register('serviceType')}
                      className="absolute opacity-0"
                    />
                    <span className="font-semibold">{t('reservation.step1.transfer')}</span>
                  </label>
                  <label className="relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer hover:border-gold transition-colors">
                    <input
                      type="radio"
                      value="excursion"
                      {...step1Form.register('serviceType')}
                      className="absolute opacity-0"
                    />
                    <span className="font-semibold">{t('reservation.step1.excursion')}</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy mb-2">{t('reservation.step1.origin')}</label>
                <input
                  {...step1Form.register('origin')}
                  type="text"
                  placeholder="Ej: Aeropuerto SDQ"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                />
                {step1Form.formState.errors.origin && (
                  <p className="text-red-600 text-sm mt-1">
                    {step1Form.formState.errors.origin.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy mb-2">{t('reservation.step1.destination')}</label>
                <input
                  {...step1Form.register('destination')}
                  type="text"
                  placeholder="Ej: Punta Cana"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                />
                {step1Form.formState.errors.destination && (
                  <p className="text-red-600 text-sm mt-1">
                    {step1Form.formState.errors.destination.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">{t('reservation.step1.date')}</label>
                  <input
                    {...step1Form.register('date')}
                    type="date"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                  />
                  {step1Form.formState.errors.date && (
                    <p className="text-red-600 text-sm mt-1">
                      {step1Form.formState.errors.date.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">{t('reservation.step1.time')}</label>
                  <input
                    {...step1Form.register('time')}
                    type="time"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                  />
                  {step1Form.formState.errors.time && (
                    <p className="text-red-600 text-sm mt-1">
                      {step1Form.formState.errors.time.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold/90 text-navy px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center"
              >
                {t('reservation.step1.continue')}
                <ArrowRight className="ml-2" />
              </button>
            </form>
          )}

          {currentStep === 2 && (
            <form onSubmit={step2Form.handleSubmit(onStep2Submit)} className="space-y-6">
              <h2 className="text-2xl font-bold text-navy mb-6 flex items-center">
                <Users className="mr-2 text-gold" />
                {t('reservation.step2.title')}
              </h2>

              <div>
                <label className="block text-sm font-semibold text-navy mb-2">
                  {t('reservation.step2.passengers')}
                </label>
                <input
                  {...step2Form.register('passengers')}
                  type="number"
                  min="1"
                  placeholder="Ej: 4"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                />
                {step2Form.formState.errors.passengers && (
                  <p className="text-red-600 text-sm mt-1">
                    {step2Form.formState.errors.passengers.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy mb-2">
                  {t('reservation.step2.flightNumber')}
                </label>
                <input
                  {...step2Form.register('flightNumber')}
                  type="text"
                  placeholder="Ej: AA1234"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy mb-2">
                  {t('reservation.step2.vehicleType')}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="relative flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer hover:border-gold transition-colors">
                    <input
                      type="radio"
                      value="sedan"
                      {...step2Form.register('vehicleType')}
                      className="absolute opacity-0"
                    />
                    <span className="font-semibold mb-1">{t('reservation.step2.sedan')}</span>
                    <span className="text-sm text-gray-600">{t('reservation.step2.upTo')} 3 {t('reservation.step2.pax')}</span>
                  </label>
                  <label className="relative flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer hover:border-gold transition-colors">
                    <input
                      type="radio"
                      value="van"
                      {...step2Form.register('vehicleType')}
                      className="absolute opacity-0"
                    />
                    <span className="font-semibold mb-1">{t('reservation.step2.van')}</span>
                    <span className="text-sm text-gray-600">{t('reservation.step2.upTo')} 8 {t('reservation.step2.pax')}</span>
                  </label>
                  <label className="relative flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer hover:border-gold transition-colors">
                    <input
                      type="radio"
                      value="hiace"
                      {...step2Form.register('vehicleType')}
                      className="absolute opacity-0"
                    />
                    <span className="font-semibold mb-1">{t('reservation.step2.hiace')}</span>
                    <span className="text-sm text-gray-600">{t('reservation.step2.upTo')} 14 {t('reservation.step2.pax')}</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-navy px-8 py-4 rounded-lg font-semibold transition-all flex items-center justify-center"
                >
                  <ArrowLeft className="mr-2" />
                  {t('reservation.step2.back')}
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gold hover:bg-gold/90 text-navy px-8 py-4 rounded-lg font-semibold transition-all flex items-center justify-center"
                >
                  {t('reservation.step2.continue')}
                  <ArrowRight className="ml-2" />
                </button>
              </div>
            </form>
          )}

          {currentStep === 3 && (
            <form onSubmit={step3Form.handleSubmit(onStep3Submit)} className="space-y-6">
              <h2 className="text-2xl font-bold text-navy mb-6 flex items-center">
                <Plane className="mr-2 text-gold" />
                {t('reservation.step3.title')}
              </h2>

              <div>
                <label className="block text-sm font-semibold text-navy mb-2">
                  {t('reservation.step3.name')}
                </label>
                <input
                  {...step3Form.register('name')}
                  type="text"
                  placeholder="Juan Pérez"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                />
                {step3Form.formState.errors.name && (
                  <p className="text-red-600 text-sm mt-1">
                    {step3Form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy mb-2">{t('reservation.step3.email')}</label>
                <input
                  {...step3Form.register('email')}
                  type="email"
                  placeholder="juan@ejemplo.com"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                />
                {step3Form.formState.errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {step3Form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy mb-2">{t('reservation.step3.phone')}</label>
                <input
                  {...step3Form.register('phone')}
                  type="tel"
                  placeholder="+1 (809) 123-4567"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                />
                {step3Form.formState.errors.phone && (
                  <p className="text-red-600 text-sm mt-1">
                    {step3Form.formState.errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy mb-2">
                  {t('reservation.step3.comments')}
                </label>
                <textarea
                  {...step3Form.register('comments')}
                  rows={4}
                  placeholder={t('reservation.step3.commentsPlaceholder')}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-navy px-8 py-4 rounded-lg font-semibold transition-all flex items-center justify-center"
                >
                  <ArrowLeft className="mr-2" />
                  {t('reservation.step3.back')}
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gold hover:bg-gold/90 text-navy px-8 py-4 rounded-lg font-semibold transition-all flex items-center justify-center"
                >
                  {t('reservation.step3.submit')}
                  <CheckCircle className="ml-2" />
                </button>
              </div>
            </form>
          )}
        </motion.div>

        {!isSubmitted && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <PaymentMethods />
          </motion.div>
        )}
      </div>
    </div>
  );
}
