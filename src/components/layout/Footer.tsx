import React from 'react';
import { motion } from 'framer-motion';
import { 
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  ArrowTopRightOnSquareIcon,
  HeartIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const navigation = [
    { label: 'Home', href: '#home' },
    { label: 'Studio', href: '#studio' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { 
      label: 'GitHub', 
      href: 'https://github.com/hypnocentral',
      icon: CodeBracketIcon 
    },
    { 
      label: 'Discord', 
      href: 'https://discord.gg/hypnocentral',
      icon: ArrowTopRightOnSquareIcon 
    },
  ];

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      label: 'Email',
      value: 'info@hypnocentral.com',
      href: 'mailto:info@hypnocentral.com'
    },
    {
      icon: MapPinIcon,
      label: 'Location',
      value: 'Global (Remote)',
      href: null
    }
  ];

  return (
    <footer className="relative bg-gray-950 border-t border-white/10">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/50 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <motion.div
          className="py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="p-8 md:p-12">
            <div className="grid lg:grid-cols-3 gap-12 items-start">
              
              {/* Brand Section */}
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                {/* Logo */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 relative flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-primary/30 rounded-full animate-glow"></div>
                    </div>
                    <img 
                      src="/logo.png" 
                      alt="HypnoCentral Logo" 
                      className="w-full h-full object-contain filter drop-shadow-lg relative z-10"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-white font-sans tracking-wider">
                      HypnoCentral
                    </h3>
                    <p className="text-xs text-gray-400 -mt-1 font-tech">Gaming Studio</p>
                  </div>
                </div>

                <p className="text-gray-300 mb-8 leading-relaxed">
                  Transformamos proyectos gaming prometedores en ventures exitosos 
                  a través de inversión equitativa y soporte técnico integral.
                </p>

                {/* Contact Info */}
                <div className="space-y-4">
                  {contactInfo.map((contact, index) => (
                    <motion.div
                      key={contact.label}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <contact.icon className="w-5 h-5 text-primary" />
                      {contact.href ? (
                        <a 
                          href={contact.href}
                          className="text-gray-300 hover:text-white transition-colors duration-200"
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <span className="text-gray-300">{contact.value}</span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Navigation & Social */}
              <motion.div
                className="lg:col-span-2 grid md:grid-cols-2 gap-12"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {/* Navigation Links */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-6">Navegación</h4>
                  <div className="space-y-3">
                    {navigation.map((item, index) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        className="block text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-all duration-200 group"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex items-center justify-between">
                          <span>{item.label}</span>
                          <ArrowTopRightOnSquareIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Social Links & Connect */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-6">Conecta con Nosotros</h4>
                  <div className="space-y-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 text-gray-300 hover:text-white px-4 py-3 rounded-lg hover:bg-white/5 transition-all duration-200 group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ x: 5 }}
                      >
                        <social.icon className="w-5 h-5 text-primary" />
                        <span>{social.label}</span>
                        <ArrowTopRightOnSquareIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.a>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    className="mt-8"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <a
                      href="#contact"
                      className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-semibold text-primary bg-transparent border border-primary/50 hover:border-primary/70 transition-all duration-200 relative overflow-hidden launcher-btn"
                    >
                      <div className="absolute inset-0 blur-[1px]" style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(125, 211, 252, 0.6) 1px, transparent 0)`,
                        backgroundSize: '4px 4px',
                        maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
                        maskComposite: 'intersect',
                        WebkitMaskComposite: 'source-in'
                      }}></div>
                      <HeartIcon className="w-4 h-4 relative z-10 drop-shadow-sm" />
                      <span className="relative z-10 drop-shadow-sm">Trabajemos Juntos</span>
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="py-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm flex items-center space-x-2">
              <span>© {currentYear} HypnoCentral.</span>
              <span className="flex items-center space-x-1">
                <span>Hecho con</span>
                <HeartIcon className="w-4 h-4 text-red-400" />
                <span>para la comunidad gaming</span>
              </span>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a
                href="#privacy"
                className="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                Privacidad
              </a>
              <a
                href="#terms"
                className="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                Términos
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;