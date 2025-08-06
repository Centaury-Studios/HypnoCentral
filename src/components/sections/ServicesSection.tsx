import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  PaintBrushIcon, 
  CodeBracketIcon, 
  CpuChipIcon, 
  BuildingOffice2Icon,
  UserGroupIcon,
  SparklesIcon,
  RocketLaunchIcon 
} from '@heroicons/react/24/outline';

const services = [
  {
    title: "Lorian's Workspace",
    subtitle: "Creative Studio",
    description: "Un espacio creativo especializado en proyectos artísticos y tecnológicos innovadores, combinando arte digital con desarrollo de software avanzado.",
    features: ["Ilustraciones digitales", "AI Development", "Software Development"],
    icon: PaintBrushIcon,
    logo: "/logo.png",
    gradient: "from-primary to-accent",
    buttonStyle: "btn-primary",
    isDiscord: true
  },
  {
    title: "Centaury Studio", 
    subtitle: "Professional Studio",
    description: "Un estudio profesional centrado en ámbitos más amplios, ofreciendo servicios especializados para proyectos grandes y soluciones empresariales de alta calidad.",
    features: ["Proyectos empresariales", "Desarrollo a gran escala", "Soluciones profesionales"],
    icon: BuildingOffice2Icon,
    logo: "/logo_centaury.jpg",
    gradient: "from-secondary to-primary",
    buttonStyle: "btn-ghost",
    isDiscord: false
  }
];

// Discord Widget Hook
const useDiscordWidget = (serverId: string) => {
  const [discordData, setDiscordData] = useState<{
    presence_count?: number;
    name?: string;
    instant_invite?: string;
  } | null>(null);

  useEffect(() => {
    const fetchDiscordData = async () => {
      try {
        // Using Discord's widget API
        const response = await fetch(`https://discord.com/api/guilds/${serverId}/widget.json`);
        if (response.ok) {
          const data = await response.json();
          setDiscordData(data);
        }
      } catch (error) {
        console.error('Error fetching Discord data:', error);
        // Fallback data
        setDiscordData({
          presence_count: 42, // Placeholder
          name: "Lorian's Workspace",
          instant_invite: "https://discord.gg/vs7hD2DqHC"
        });
      }
    };

    if (serverId) {
      fetchDiscordData();
    }
  }, [serverId]);

  return discordData;
};

const ServicesSection: React.FC = () => {
  // Lorian's Workspace Discord server
  const discordWidget = useDiscordWidget('1397247820922097704');

  return (
    <section id="services" className="py-32 bg-dark-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <RocketLaunchIcon className="w-4 h-4 text-accent" />
            <span className="text-gray-300 text-sm font-medium">Our Services</span>
          </motion.div>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Actualmente en nuestro trabajo no está el ofrecer servicios a terceros con los que no tengamos partner, 
            pero puedes pedírselo a nuestros dirigentes.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8 mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.title}
                className="glass-card p-8 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <img 
                      src={service.logo} 
                      alt={`${service.title} Logo`}
                      className={`w-12 h-12 object-cover ${service.title === 'Centaury Studio' ? 'rounded-2xl' : 'rounded-lg'}`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-2xl mb-1">{service.title}</h3>
                    <p className="text-accent text-sm font-medium">{service.subtitle}</p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {service.title === "Lorian's Workspace" ? (
                  <div className="space-y-3">
                    {/* Discord Server Info */}
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>Discord Server</span>
                      </div>
                      {discordWidget?.presence_count && (
                        <span className="text-accent font-medium">
                          {discordWidget.presence_count} online
                        </span>
                      )}
                    </div>
                    
                    <motion.button
                      className="w-full py-3 px-6 rounded-xl font-semibold bg-[#5865F2] hover:bg-[#4752C4] text-white border-0 transition-all duration-300 flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.open(discordWidget?.instant_invite || 'https://discord.gg/vs7hD2DqHC', '_blank')}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.120.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                      <span>Join Discord Server</span>
                    </motion.button>
                  </div>
                ) : (
                  <motion.button
                    className={`${service.buttonStyle} w-full py-3 px-6 rounded-xl font-semibold`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open('https://centaury.net', '_blank')}
                  >
                    Visit Centaury.net
                  </motion.button>
                )}
              </motion.div>
            );
          })}
        </motion.div>


      </div>
    </section>
  );
};

export default ServicesSection;