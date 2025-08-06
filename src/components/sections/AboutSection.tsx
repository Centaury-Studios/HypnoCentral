import React from 'react';
import { motion } from 'framer-motion';
import { 
  RocketLaunchIcon, 
  UserGroupIcon, 
  TrophyIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';



const values = [
  {
    icon: ShieldCheckIcon,
    title: 'Transparencia Total',
    description: 'Compartimos completamente el proceso de desarrollo y las métricas de éxito.'
  },
  {
    icon: TrophyIcon,
    title: 'Excelencia Técnica',
    description: 'Nuestro equipo de expertos garantiza la más alta calidad en cada proyecto.'
  },
  {
    icon: UserGroupIcon,
    title: 'Colaboración Real',
    description: 'Trabajamos codo a codo contigo, no somos solo inversores pasivos.'
  },
  {
    icon: RocketLaunchIcon,
    title: 'Visión a Largo Plazo',
    description: 'Construimos relaciones duraderas y apoyamos el crecimiento sostenible.'
  },
];

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-gray-50">
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
            Más que inversión -
            <span className="gradient-text block">Somos tu socio técnico</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
            HypnoCentral transforma proyectos gaming prometedores en ventures exitosos, 
            proporcionando no solo capital, sino expertise técnico completo y soporte estratégico.
          </p>
        </motion.div>



        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Nuestra Misión: Democratizar el Éxito en Gaming
            </h3>
            <div className="space-y-6 text-gray-600">
              <p>
                Creemos que las mejores ideas gaming no siempre vienen de grandes estudios. 
                Desarrolladores independientes y equipos pequeños a menudo tienen la innovación 
                y pasión para crear experiencias increíbles.
              </p>
              <p>
                Nuestro modelo único combina inversión equitativa (50/50) con soporte técnico 
                completo: desarrollo de software, infraestructura, gestión de proyectos y 
                orientación estratégica.
              </p>
              <p>
                No solo invertimos dinero - invertimos nuestro tiempo, experiencia y red de 
                contactos para asegurar que tu proyecto alcance su máximo potencial.
              </p>
            </div>

            {/* Unique Approach */}
            <div className="mt-8 p-6 bg-primary-50 rounded-xl">
              <h4 className="font-semibold text-primary-900 mb-3">
                ¿Qué nos hace diferentes?
              </h4>
              <ul className="space-y-2 text-primary-800">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Participación equitativa 50/50 en lugar de términos abusivos</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Soporte técnico activo con nuestro equipo de desarrollo</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Enfoque en plataformas gaming específicas (Minecraft, Roblox, etc.)</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Relaciones a largo plazo más allá del proyecto inicial</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Content - Values */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Nuestros Valores
            </h3>
            <div className="space-y-6">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    className="flex items-start space-x-4 p-6 bg-white rounded-xl card-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="flex-shrink-0">
                      <IconComponent className="w-8 h-8 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{value.title}</h4>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-12 text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-4">
            ¿Listo para transformar tu idea en realidad?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Únete a nuestro ecosistema de desarrolladores y hagamos historia juntos.
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Comenzar Conversación
            <RocketLaunchIcon className="ml-2 w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;