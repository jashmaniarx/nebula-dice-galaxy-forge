import { Planet } from '../types/game';
import { motion } from 'framer-motion';
import ParticleAura from './ParticleAura';

interface EquippedPlanetDisplayProps {
  planet: Planet | null;
}

const EquippedPlanetDisplay = ({ planet }: EquippedPlanetDisplayProps) => {
  if (!planet) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {/* Orbital Ring */}
      <motion.div
        className="absolute inset-0 border-2 border-primary/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{
          width: '200px',
          height: '200px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      {/* Planet */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{ 
          rotate: 360,
          y: [0, -5, 0],
        }}
        transition={{ 
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Planet Core */}
        <div
          className="w-16 h-16 rounded-full relative overflow-hidden"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${planet.color}40, ${planet.color}80, ${planet.color}ff)`,
            boxShadow: `0 0 20px ${planet.color}80, inset 0 0 20px ${planet.color}40`,
          }}
        >
          {/* Planet Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div
              className="w-full h-full rounded-full"
              style={{
                background: `linear-gradient(45deg, transparent 30%, ${planet.color}60 50%, transparent 70%)`,
                transform: 'rotate(45deg)',
              }}
            />
          </div>
          
          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)`,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Particle Aura */}
        <ParticleAura rarity={planet.rarity} />
      </motion.div>
    </div>
  );
};

export default EquippedPlanetDisplay;