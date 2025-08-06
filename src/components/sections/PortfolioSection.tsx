import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  ArrowTopRightOnSquareIcon,
  PlayIcon,
  UserGroupIcon,
  ChartBarIcon,
  PaperAirplaneIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import AchievementNotification from '../ui/AchievementNotification';
import { getFeaturedProjects } from '../../data/portfolioData';

// Contact form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  'cf-turnstile-response': z.string().min(1, 'Por favor completa la verificación de seguridad'),
});

type ContactForm = z.infer<typeof contactSchema>;

// Declare Turnstile types
declare global {
  interface Window {
    turnstile: {
      render: (element: string | HTMLElement, options: {
        sitekey: string;
        callback: (token: string) => void;
        'error-callback'?: () => void;
        'expired-callback'?: () => void;
      }) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}



const PortfolioSection: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [turnstileWidgetId, setTurnstileWidgetId] = useState<string>('');
  
  // Achievement notification state
  const [showAchievement, setShowAchievement] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Get featured projects for display
  const featuredProjects = getFeaturedProjects();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  // Initialize Turnstile when component mounts
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.turnstile) {
        const widgetId = window.turnstile.render('#cf-turnstile', {
          sitekey: '0x4AAAAAAA...', // Replace with your actual Turnstile site key
          callback: (token: string) => {
            setTurnstileToken(token);
            setValue('cf-turnstile-response', token);
          },
          'error-callback': () => {
            setTurnstileToken('');
            setValue('cf-turnstile-response', '');
          },
          'expired-callback': () => {
            setTurnstileToken('');
            setValue('cf-turnstile-response', '');
          }
        });
        setTurnstileWidgetId(widgetId);
      }
    };

    return () => {
      if (window.turnstile && turnstileWidgetId) {
        window.turnstile.remove(turnstileWidgetId);
      }
    };
  }, [setValue]);

  // Intersection Observer for achievement notification
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Entering portfolio section - show notification and keep it visible
            setShowAchievement(true);
          } else {
            // Leaving portfolio section - hide notification
            setShowAchievement(false);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: '0px 0px -20% 0px' // Add margin at bottom to trigger earlier when leaving
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const onSubmit = async (data: ContactForm) => {
    if (!turnstileToken) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    try {
      // Send to Discord webhook
      const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;
      
      if (webhookUrl) {
        const discordPayload = {
          embeds: [
            {
              title: "🚀 Nueva Propuesta de Proyecto",
              color: 0x7dd3fc, // Primary color
              fields: [
                {
                  name: "👤 Nombre",
                  value: data.name,
                  inline: true
                },
                {
                  name: "📧 Email",
                  value: data.email,
                  inline: true
                },
                {
                  name: "💡 Mensaje",
                  value: data.message.length > 1024 ? data.message.substring(0, 1021) + "..." : data.message,
                  inline: false
                }
              ],
              timestamp: new Date().toISOString(),
              footer: {
                text: "HypnoCentral - Project Submission"
              }
            }
          ]
        };

        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(discordPayload),
        });

        if (response.ok) {
          setSubmitStatus('success');
          reset();
          setTurnstileToken('');
          // Reset Turnstile widget
          if (window.turnstile && turnstileWidgetId) {
            window.turnstile.reset(turnstileWidgetId);
          }
        } else {
          throw new Error('Error sending message to Discord');
        }
      } else {
        // Fallback: show success but log that webhook is not configured
        console.warn('Discord webhook URL not configured');
        setSubmitStatus('success');
        reset();
        setTurnstileToken('');
        if (window.turnstile && turnstileWidgetId) {
          window.turnstile.reset(turnstileWidgetId);
        }
      }
    } catch (error) {
      console.error('Error sending to Discord webhook:', error);
      setSubmitStatus('error');
      // Reset Turnstile widget on error
      if (window.turnstile && turnstileWidgetId) {
        window.turnstile.reset(turnstileWidgetId);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      {/* Achievement Notification */}
      <AchievementNotification
        show={showAchievement}
        message="Each project tells a unique story of innovation and success"
        author="- Steve, Portfolio Curator"
        image="/steve_thinking.png"
        onComplete={() => setShowAchievement(false)}
      />
      
      <section ref={sectionRef} id="portfolio" className="py-32 bg-dark-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
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
            <ChartBarIcon className="w-4 h-4 text-accent" />
            <span className="text-gray-300 text-sm font-medium">Our Success Stories</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 font-display">
            Portfolio
            <span className="block gradient-text-primary font-gaming">Showcase</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover the innovative gaming projects we've helped bring to life through our partnership model.
          </p>
        </motion.div>



        {/* Portfolio Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="glass-card rounded-3xl overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Project Header */}
              <div className="h-48 bg-primary/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'Live' ? 'bg-green-500/20 text-green-300' :
                    project.status === 'Growing' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-blue-500/20 text-blue-300'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-medium">
                    {project.platform}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <img 
                    src={project.image} 
                    alt={`${project.title} mascot`}
                    className="w-16 h-16 object-contain opacity-80"
                  />
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 font-tech tracking-wide">{project.title}</h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {project.shortDescription || project.description}
                </p>

                {/* Stats */}
                <div className="flex space-x-4 mb-4">
                  <div className="flex items-center space-x-1 text-gray-400 text-xs">
                    <UserGroupIcon className="w-4 h-4" />
                    <span>{project.stats.players}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400 text-xs">
                    <ChartBarIcon className="w-4 h-4" />
                    <span>{project.stats.revenue}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/5 text-gray-300 text-xs rounded border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <motion.button
                    className="flex-1 btn-primary px-4 py-2 rounded-xl text-sm font-semibold flex items-center justify-center space-x-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <PlayIcon className="w-4 h-4" />
                    <span>Demo</span>
                  </motion.button>
                  <motion.button
                    className="btn-ghost px-4 py-2 rounded-xl flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* See All Portfolio Button */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => navigate('/portfolio')}
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 text-white font-semibold hover:from-primary/20 hover:to-accent/20 hover:border-primary/50 transition-all duration-300 group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <EyeIcon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
            <span>Ver Todo el Portfolio</span>
            <ArrowTopRightOnSquareIcon className="w-5 h-5 text-accent group-hover:text-white transition-colors" />
          </motion.button>
          <p className="text-gray-400 text-sm mt-3">
            Descubre todos nuestros proyectos y encuentra inspiración para el tuyo
          </p>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          id="portfolio-contact"
          className="glass-card p-8 md:p-12 rounded-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Join Our
              <span className="gradient-text-secondary block">Success Stories?</span>
            </h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Let's discuss how we can transform your gaming vision into the next breakthrough project.
            </p>
          </div>

          {/* Contact Form & Image */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contact Form */}
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h4 className="text-xl font-bold text-white mb-6">
                  Envíanos tu Proyecto
                </h4>

                {submitStatus === 'success' && (
                  <motion.div
                    className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="text-green-300">
                      ¡Mensaje enviado exitosamente! Te contactaremos pronto.
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="text-red-300">
                      Hubo un error al enviar el mensaje. Inténtalo nuevamente.
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nombre *
                    </label>
                    <input
                      {...register('name')}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-white placeholder-gray-400"
                      placeholder="Tu nombre completo"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-white placeholder-gray-400"
                      placeholder="tu@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-white placeholder-gray-400 resize-none"
                      placeholder="Cuéntanos sobre tu proyecto, idea o cómo podemos ayudarte..."
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Cloudflare Turnstile */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Verificación de Seguridad *
                    </label>
                    <div id="cf-turnstile" className="mb-2"></div>
                    {errors['cf-turnstile-response'] && (
                      <p className="text-red-400 text-sm">{errors['cf-turnstile-response'].message}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Mensaje
                        <PaperAirplaneIcon className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Steve Image */}
            <motion.div
              className="order-1 lg:order-2 flex items-center justify-center"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="relative z-10">
                  <img 
                    src="/steve_showing_with_is_hands.png" 
                    alt="Steve showing with his hands" 
                    className="w-full max-w-sm h-auto object-contain drop-shadow-2xl"
                  />
                </div>
                {/* Glow effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-full blur-3xl scale-75 -z-10"></div>
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-2xl -z-20"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default PortfolioSection;