import React from 'react';
import { motion } from 'framer-motion';
import { 
  PaperAirplaneIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  UserGroupIcon,
  CogIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

const processSteps = [
  {
    step: 1,
    title: 'Envío de Proyecto',
    description: 'Presenta tu idea a través de nuestro formulario detallado',
    icon: PaperAirplaneIcon,
    details: [
      'Formulario de aplicación online',
      'Descripción del concepto y visión',
      'Documentación técnica existente',
      'Información del equipo y experiencia',
      'Modelo de negocio y proyecciones'
    ],
    duration: '1-2 días',
    color: 'from-blue-500 to-blue-700'
  },
  {
    step: 2,
    title: 'Evaluación Técnica',
    description: 'Nuestro equipo analiza la viabilidad técnica y potencial',
    icon: MagnifyingGlassIcon,
    details: [
      'Revisión de código existente',
      'Análisis de arquitectura propuesta',
      'Evaluación de escalabilidad',
      'Identificación de desafíos técnicos',
      'Estimación de recursos necesarios'
    ],
    duration: '3-5 días',
    color: 'from-purple-500 to-purple-700'
  },
  {
    step: 3,
    title: 'Análisis de Mercado',
    description: 'Evaluamos el potencial comercial y competencia',
    icon: ChartBarIcon,
    details: [
      'Análisis competitivo detallado',
      'Investigación de mercado objetivo',
      'Proyecciones de crecimiento',
      'Estrategias de monetización',
      'Evaluación de riesgos y oportunidades'
    ],
    duration: '2-3 días',
    color: 'from-green-500 to-green-700'
  },
  {
    step: 4,
    title: 'Acuerdo de Sociedad',
    description: 'Definimos términos de colaboración y marcos legales',
    icon: UserGroupIcon,
    details: [
      'Estructuración del acuerdo 50/50',
      'Definición de roles y responsabilidades',
      'Establecimiento de hitos y objetivos',
      'Marco legal y protección IP',
      'Términos de salida y escalas'
    ],
    duration: '1-2 semanas',
    color: 'from-orange-500 to-orange-700'
  },
  {
    step: 5,
    title: 'Fase de Desarrollo',
    description: 'Colaboración activa en el desarrollo del proyecto',
    icon: CogIcon,
    details: [
      'Desarrollo conjunto del producto',
      'Implementación de infraestructura',
      'Sprints y revisiones regulares',
      'Testing y optimización continua',
      'Preparación para lanzamiento'
    ],
    duration: '2-6 meses',
    color: 'from-indigo-500 to-indigo-700'
  },
  {
    step: 6,
    title: 'Lanzamiento y Crecimiento',
    description: 'Lanzamiento al mercado y escalamiento conjunto',
    icon: TrophyIcon,
    details: [
      'Estrategia de lanzamiento coordinada',
      'Marketing y adquisición de usuarios',
      'Monitoreo de métricas y KPIs',
      'Optimización basada en feedback',
      'Planificación de expansión'
    ],
    duration: 'Continuo',
    color: 'from-red-500 to-red-700'
  }
];

const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nuestro Proceso de
            <span className="gradient-text block">Colaboración</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
            Un proceso transparente y estructurado que garantiza el éxito mutuo 
            desde la evaluación inicial hasta el crecimiento sostenible.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform md:-translate-x-px"></div>

          {/* Process Steps */}
          <div className="space-y-12">
            {processSteps.map((process, index) => {
              const IconComponent = process.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={process.step}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:justify-between`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Step Number (Mobile/Desktop center) */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 top-8 md:top-1/2">
                    <div className={`w-12 h-12 bg-gradient-to-br ${process.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      {process.step}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`ml-20 md:ml-0 md:w-5/12 ${isEven ? '' : 'md:text-right'}`}>
                    <motion.div
                      className="bg-white rounded-2xl p-8 card-shadow hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      {/* Icon and Title */}
                      <div className={`flex items-center mb-4 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                        <div className={`w-16 h-16 bg-gradient-to-br ${process.color} rounded-xl flex items-center justify-center mr-4 ${isEven ? '' : 'md:mr-0 md:ml-4'}`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{process.title}</h3>
                          <div className="text-sm text-gray-500 font-medium">{process.duration}</div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 mb-6">{process.description}</p>

                      {/* Details List */}
                      <ul className={`space-y-2 ${isEven ? '' : 'md:text-right'}`}>
                        {process.details.map((detail, detailIndex) => (
                          <motion.li
                            key={detail}
                            className={`flex items-start text-sm text-gray-600 ${isEven ? '' : 'md:flex-row-reverse'}`}
                            initial={{ opacity: 0, x: isEven ? -10 : 10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: (index * 0.2) + (detailIndex * 0.05) }}
                            viewport={{ once: true }}
                          >
                            <div className={`w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0 ${isEven ? 'mr-3' : 'md:mr-0 md:ml-3 mr-3'}`} />
                            <span>{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Spacer for desktop layout */}
                  <div className="hidden md:block md:w-5/12"></div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Success Metrics */}
        <motion.div
          className="mt-20 bg-white rounded-2xl p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Métricas de Éxito Compartidas
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChartBarIcon className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Crecimiento de Usuarios</h4>
              <p className="text-gray-600 text-sm">Métricas claras de adquisición y retención de usuarios</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrophyIcon className="w-8 h-8 text-secondary-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Ingresos Recurrentes</h4>
              <p className="text-gray-600 text-sm">Modelo de monetización sostenible y escalable</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="w-8 h-8 text-accent-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Satisfacción del Usuario</h4>
              <p className="text-gray-600 text-sm">Experiencia de usuario excepcional y engagement alto</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Listo para Comenzar?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            El primer paso es presentar tu proyecto. Nuestro equipo lo revisará 
            y te contactará en menos de 48 horas.
          </p>
          <motion.a
            href="#contact"
            className="gradient-bg text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Enviar Mi Proyecto
            <PaperAirplaneIcon className="ml-2 w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;