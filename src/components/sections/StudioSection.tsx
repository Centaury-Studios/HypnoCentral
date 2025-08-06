import React from 'react';
import { motion } from 'framer-motion';
import { 
  CodeBracketIcon, 
  RocketLaunchIcon, 
  UserGroupIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import Model3DBackground from '../3d/ArcadeMachine';



const expertise = [
  {
    title: "Game Development",
    description: "Full-stack game development from concept to launch, specializing in multiplayer experiences and innovative gameplay mechanics.",
    technologies: ["Unity", "Unreal Engine", "React", "Node.js", "MongoDB"],
    icon: CodeBracketIcon,
    gradient: "from-primary to-accent"
  },
  {
    title: "Technical Partnership",
    description: "We don't just invest - we become your technical co-founder, providing hands-on development and strategic guidance.",
    technologies: ["50/50 Equity", "Technical Leadership", "Code Reviews", "Architecture"],
    icon: UserGroupIcon,
    gradient: "from-secondary to-primary"
  },
  {
    title: "Platform Expertise",
    description: "Deep expertise in gaming platforms and emerging technologies, ensuring your project reaches its maximum potential.",
    technologies: ["Minecraft", "Roblox", "Steam", "Mobile", "Web3"],
    icon: ChartBarIcon,
    gradient: "from-accent to-secondary"
  },
];

const StudioSection: React.FC = () => {
  return (
    <section id="studio" className="py-32 bg-dark-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3D Model Background Elements */}
        <Model3DBackground 
          className="top-8 -left-8 lg:-left-16 z-0" 
          imageSrc="/3d_arcade.png"
        />
        <Model3DBackground 
          className="top-80 right-8 lg:right-20 z-0 scale-75 opacity-40" 
          imageSrc="/3d_model.png"
        />

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
            <span className="text-gray-300 text-sm font-medium">About Our Studio</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 font-display">
            We Build
            <span className="block gradient-text-primary font-gaming">Gaming Futures</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            HypnoCentral is more than a studio - we're your strategic gaming partner. 
            We combine creative vision with technical excellence to create extraordinary experiences.
          </p>
        </motion.div>



        {/* Expertise Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Steve Character */}
            <motion.div
              className="relative mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-4 glass-card p-6 rounded-2xl">
                <div className="relative">
                  <img 
                    src="/steve_showing_with_is_hands.png" 
                    alt="Steve presenting partnership" 
                    className="w-16 h-16 object-contain"
                  />
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-white text-xs font-bold">!</span>
                  </motion.div>
                </div>
                <div>
                  <p className="text-gray-300 text-sm italic">
                    "Partnership, not just investment!"
                  </p>
                  <p className="text-gray-400 text-xs mt-1">- Steve, Partnership Expert</p>
                </div>
              </div>
            </motion.div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display">
                Our Unique
                <span className="gradient-text-secondary block font-gaming">Partnership Model</span>
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Unlike traditional investors or agencies, we become true partners in your vision. 
                Our 50/50 equity model ensures we're as invested in your success as you are.
              </p>
            </div>

            {/* Partnership Benefits */}
            <div className="space-y-4">
              {[
                "Shared ownership and shared success",
                "Hands-on technical development",
                "Strategic guidance and mentorship", 
                "Access to our network and resources",
                "Long-term partnership commitment"
              ].map((benefit, index) => (
                <motion.div
                  key={benefit}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-gray-300">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              className="btn-primary px-8 py-4 rounded-xl font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn About Partnership
            </motion.button>
          </motion.div>

          {/* Right Content - Expertise Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {expertise.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="glass-card p-6 rounded-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-lg mb-2">{item.title}</h4>
                      <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-white/5 text-gray-300 text-xs rounded-lg border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="glass-card p-12 rounded-3xl text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Something 
              <span className="gradient-text-primary block">Extraordinary?</span>
            </h3>
            <p className="text-gray-300 text-lg mb-8">
              Join our ecosystem of successful gaming projects and let's create the next big thing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="btn-primary px-8 py-4 rounded-xl font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setTimeout(() => {
                    const targetElement = document.getElementById('portfolio-contact');
                    if (targetElement) {
                      const headerHeight = 80;
                      const elementRect = targetElement.getBoundingClientRect();
                      const absoluteElementTop = elementRect.top + window.pageYOffset;
                      const targetPosition = absoluteElementTop - headerHeight;
                      window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                      });
                    } else {
                      // Fallback: scroll to portfolio section end
                      const portfolioSection = document.getElementById('portfolio');
                      if (portfolioSection) {
                        const portfolioRect = portfolioSection.getBoundingClientRect();
                        const portfolioTop = portfolioRect.top + window.pageYOffset;
                        window.scrollTo({
                          top: portfolioTop + portfolioSection.offsetHeight - 600,
                          behavior: 'smooth'
                        });
                      }
                    }
                  }, 100);
                }}
              >
                Start Your Project
              </motion.button>
              <motion.button
                className="btn-ghost px-8 py-4 rounded-xl font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Our Portfolio
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StudioSection;