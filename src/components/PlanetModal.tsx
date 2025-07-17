import { X, Globe, Thermometer, Wind, Mountain, Sparkles } from 'lucide-react';
import { Planet } from '../types/game';

interface PlanetModalProps {
  planet: Planet | null;
  isOpen: boolean;
  onClose: () => void;
  hasEchoAnalyzer?: boolean;
}

const PlanetModal = ({ planet, isOpen, onClose, hasEchoAnalyzer = false }: PlanetModalProps) => {
  if (!planet || !isOpen) return null;

  const rarityClass = `rarity-${planet.rarity}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop">
      <div className="glass-panel relative w-full max-w-md mx-4 p-6 animate-scale-in">
        {/* Close Button - Centered at top */}
        <button
          onClick={onClose}
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-destructive/80 hover:bg-destructive text-white transition-colors flex items-center justify-center z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Planet Visualization */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div
              className={`w-32 h-32 rounded-full animate-float ${rarityClass}`}
              style={{
                background: `radial-gradient(circle at 30% 30%, ${planet.color}40, ${planet.color}80)`,
                boxShadow: `0 0 30px ${planet.color}60`,
                border: `2px solid ${planet.color}80`
              }}
            />
            {/* Rotating rings for rare planets */}
            {['rare', 'mythic', 'celestial'].includes(planet.rarity) && (
              <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-spin" 
                   style={{ animationDuration: '8s' }} />
            )}
          </div>
        </div>

        {/* Planet Info */}
        <div className="text-center mb-6">
          <h2 className={`text-2xl font-bold mb-2 ${rarityClass}`}>
            {planet.name}
          </h2>
          <div className="text-sm text-muted-foreground uppercase tracking-wide">
            {planet.rarity} • {planet.type}
          </div>
        </div>

        {/* Planet Details */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Wind className="w-5 h-5 text-secondary" />
            <div>
              <div className="font-medium">Atmosphere</div>
              <div className="text-sm text-muted-foreground">{planet.atmosphere}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Mountain className="w-5 h-5 text-secondary" />
            <div>
              <div className="font-medium">Terrain</div>
              <div className="text-sm text-muted-foreground">{planet.terrain}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Thermometer className="w-5 h-5 text-secondary" />
            <div>
              <div className="font-medium">Temperature</div>
              <div className="text-sm text-muted-foreground">{planet.temperature}</div>
            </div>
          </div>

          {/* Traits */}
          {planet.traits.length > 0 && (
            <div className="flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium">Unique Traits</div>
                <div className="space-y-1">
                  {planet.traits.map((trait, index) => (
                    <div
                      key={index}
                      className={`text-sm px-2 py-1 rounded-full bg-accent/20 text-accent inline-block mr-1 ${
                        hasEchoAnalyzer ? 'shadow-glow-accent animate-pulse-glow' : ''
                      }`}
                    >
                      {trait}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Discovery Info */}
          <div className="text-center text-xs text-muted-foreground mt-6 pt-4 border-t border-border">
            Discovered on {planet.discoveredAt.toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetModal;