import { motion } from 'framer-motion';
import { PlanetRarity } from '../types/game';

interface ParticleAuraProps {
  rarity: PlanetRarity;
}

const ParticleAura = ({ rarity }: ParticleAuraProps) => {
  const getAuraConfig = () => {
    switch (rarity) {
      case 'rare':
        return {
          particles: 6,
          color: '#9C27B0',
          size: 2,
          range: 40,
          type: 'mist'
        };
      case 'epic':
        return {
          particles: 8,
          color: '#E91E63',
          size: 3,
          range: 45,
          type: 'sparks'
        };
      case 'mythic':
        return {
          particles: 10,
          color: '#FF6D00',
          size: 4,
          range: 50,
          type: 'rings'
        };
      case 'legendary':
        return {
          particles: 12,
          color: '#FFD600',
          size: 5,
          range: 55,
          type: 'flares'
        };
      case 'celestial':
      case 'transcendent':
      case 'cosmic':
      case 'omniversal':
        return {
          particles: 15,
          color: '#00E5FF',
          size: 6,
          range: 60,
          type: 'bursts'
        };
      default:
        return null;
    }
  };

  const config = getAuraConfig();
  if (!config) return null;

  const renderParticles = () => {
    const particles = [];
    for (let i = 0; i < config.particles; i++) {
      const angle = (i / config.particles) * 360;
      const delay = i * 0.1;
      
      particles.push(
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: config.color,
            boxShadow: `0 0 ${config.size * 2}px ${config.color}`,
            left: '50%',
            top: '50%',
          }}
          animate={{
            x: [0, Math.cos(angle * Math.PI / 180) * config.range, 0],
            y: [0, Math.sin(angle * Math.PI / 180) * config.range, 0],
            scale: [0.5, 1, 0.5],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut",
          }}
        />
      );
    }
    return particles;
  };

  const renderSpecialEffects = () => {
    if (config.type === 'rings') {
      return (
        <motion.div
          className="absolute inset-0 rounded-full border-2 opacity-40"
          style={{
            borderColor: config.color,
            width: '80px',
            height: '80px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      );
    }
    
    if (config.type === 'bursts') {
      return (
        <motion.div
          className="absolute inset-0"
          style={{
            width: '100px',
            height: '100px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-6 rounded-full"
              style={{
                backgroundColor: config.color,
                boxShadow: `0 0 10px ${config.color}`,
                left: '50%',
                top: '50%',
                transformOrigin: 'bottom center',
                transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
              }}
              animate={{
                scaleY: [0.5, 1.2, 0.5],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      );
    }
    
    return null;
  };

  return (
    <div className="absolute inset-0">
      {renderParticles()}
      {renderSpecialEffects()}
    </div>
  );
};

export default ParticleAura;