import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AchievementNotificationProps {
  show: boolean;
  message: string;
  author: string;
  image: string;
  onComplete?: () => void;
}

const AchievementNotification: React.FC<AchievementNotificationProps> = ({
  show,
  message,
  author,
  image,
  onComplete
}) => {

  return (
    <motion.div
      className="fixed top-32 right-8 z-40 max-w-sm pointer-events-none"
      animate={{ 
        opacity: show ? 1 : 0,
        x: show ? 0 : 100,
        scale: show ? 1 : 0.8
      }}
      transition={{ 
        type: "spring",
        stiffness: 600,
        damping: 35,
        duration: 0.15
      }}
      style={{
        pointerEvents: show ? 'auto' : 'none'
      }}
    >
      {/* Glass-style Achievement Card - Always rendered */}
      <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-primary/30 shadow-2xl">
        {/* Content */}
        <div className="flex items-center space-x-4">
          {/* Achievement Icon */}
          <div className="relative flex-shrink-0">
            <img 
              src={image} 
              alt="Steve" 
              className="w-16 h-16 object-contain"
            />
          </div>

          {/* Text Content */}
          <div className="flex-1 min-w-0">
            <div className="text-primary font-bold text-sm mb-1 font-tech">
              Portfolio Insight
            </div>
            <p className="text-white text-xs italic leading-tight mb-2">
              "{message}"
            </p>
            <p className="text-gray-300 text-xs font-medium">
              {author}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementNotification;