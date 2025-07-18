import { motion } from 'framer-motion';
import { PlanetRarity } from '../types/game';

interface PlanetMutationsProps {
  rarity: PlanetRarity;
  planetColor: string;
}

const PlanetMutations = ({ rarity, planetColor }: PlanetMutationsProps) => {
  const getMutationConfig = () => {
    switch (rarity) {
      case 'uncommon':
        return {
          type: 'wind',
          color: '#87CEEB',
          particles: 4,
          size: 1,
        };
      case 'rare':
        return {
          type: 'coral',
          color: '#FF7F50',
          particles: 6,
          size: 2,
        };
      case 'epic':
        return {
          type: 'lightning',
          color: '#FFD700',
          particles: 8,
          size: 3,
        };
      case 'mythic':
        return {
          type: 'fire',
          color: '#FF4500',
          particles: 10,
          size: 4,
        };
      case 'legendary':
        return {
          type: 'plasma',
          color: '#DA70D6',
          particles: 12,
          size: 5,
        };
      case 'celestial':
        return {
          type: 'cosmic',
          color: '#00CED1',
          particles: 15,
          size: 6,
        };
      case 'transcendent':
        return {
          type: 'void',
          color: '#8A2BE2',
          particles: 18,
          size: 7,
        };
      case 'cosmic':
        return {
          type: 'dimensional',
          color: '#00FFFF',
          particles: 20,
          size: 8,
        };
      case 'omniversal':
        return {
          type: 'omniversal',
          color: '#FFD700',
          particles: 25,
          size: 10,
        };
      default:
        return null;
    }
  };

  const config = getMutationConfig();
  if (!config) return null;

  const renderWindEffect = () => (
    <div className="absolute inset-0">
      {[...Array(config.particles)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-0.5 rounded-full opacity-40"
          style={{
            backgroundColor: config.color,
            left: `${10 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
            boxShadow: `0 0 10px ${config.color}`,
          }}
          animate={{
            x: [0, 30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  const renderCoralEffect = () => (
    <div className="absolute inset-0">
      {[...Array(config.particles)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-6 rounded-full opacity-60"
          style={{
            backgroundColor: config.color,
            left: `${20 + i * 10}%`,
            top: `${60 + (i % 2) * 10}%`,
            transformOrigin: 'bottom center',
            boxShadow: `0 0 8px ${config.color}`,
          }}
          animate={{
            scaleY: [0.8, 1.2, 0.8],
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            duration: 3 + Math.random(),
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  const renderLightningEffect = () => (
    <div className="absolute inset-0">
      {[...Array(config.particles)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-12 opacity-80"
          style={{
            background: `linear-gradient(180deg, ${config.color}, transparent)`,
            left: `${15 + i * 8}%`,
            top: `${10 + (i % 4) * 20}%`,
            boxShadow: `0 0 15px ${config.color}`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scaleY: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 0.3 + Math.random() * 0.2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  const renderFireEffect = () => (
    <div className="absolute inset-0">
      {[...Array(config.particles)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-8 rounded-full opacity-70"
          style={{
            background: `linear-gradient(180deg, ${config.color}, #FF6347, transparent)`,
            left: `${10 + i * 8}%`,
            top: `${50 + (i % 3) * 15}%`,
            boxShadow: `0 0 20px ${config.color}`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.8, 0.4],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 1.5 + Math.random() * 0.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  const renderPlasmaEffect = () => (
    <div className="absolute inset-0">
      {[...Array(config.particles)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: config.color,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: `0 0 25px ${config.color}`,
          }}
          animate={{
            scale: [0, 2, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  const renderEffect = () => {
    switch (config.type) {
      case 'wind':
        return renderWindEffect();
      case 'coral':
        return renderCoralEffect();
      case 'lightning':
        return renderLightningEffect();
      case 'fire':
        return renderFireEffect();
      case 'plasma':
      case 'cosmic':
      case 'void':
      case 'dimensional':
      case 'omniversal':
        return renderPlasmaEffect();
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {renderEffect()}
    </div>
  );
};

export default PlanetMutations;