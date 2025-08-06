import React from 'react';
import { motion } from 'framer-motion';

const ContactSection: React.FC = () => {

  return (
    <section id="contact" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Join Our
            <span className="bg-gradient-to-r from-secondary via-white to-accent bg-clip-text text-transparent block">
              Success Stories?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-balance">
            Envíanos tu proyecto y comencemos a construir el futuro del gaming juntos. 
            Te responderemos en menos de 48 horas.
          </p>
        </motion.div>


      </div>
    </section>
  );
};

export default ContactSection;