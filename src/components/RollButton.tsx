import { Sparkles } from 'lucide-react';

interface RollButtonProps {
  onRoll: () => void;
  disabled?: boolean;
}

const RollButton = ({ onRoll, disabled = false }: RollButtonProps) => {
  return (
    <div className="relative flex items-center justify-center">
      
      {/* Orbit Ring */}
      <div className="absolute w-32 h-32 rounded-full border border-primary/30 orbit-ring">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-secondary rounded-full"></div>
      </div>
      
      {/* Main Roll Button */}
      <button
        onClick={onRoll}
        disabled={disabled}
        className="roll-button relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Sparkles className="w-6 h-6 mb-1" />
        <span>ROLL</span>
      </button>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full animate-stardust"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RollButton;