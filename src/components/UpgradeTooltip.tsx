import { motion, AnimatePresence } from 'framer-motion';
import { Upgrade } from '../types/game';

interface UpgradeTooltipProps {
  upgrade: Upgrade;
  show: boolean;
  position: { x: number; y: number };
}

const UpgradeTooltip = ({ upgrade, show, position }: UpgradeTooltipProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          className="fixed z-50 pointer-events-none"
          style={{
            left: position.x,
            top: position.y - 10,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="glass-panel p-3 max-w-xs">
            <h4 className="font-semibold text-sm text-foreground mb-1">
              {upgrade.name}
            </h4>
            <p className="text-xs text-accent mb-2">
              {upgrade.effect}
            </p>
            <p className="text-xs text-muted-foreground italic">
              {upgrade.flavorText}
            </p>
            <div className="mt-2 pt-2 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Cost:</span>
                <span className="text-xs font-medium text-primary">
                  {upgrade.cost} rolls
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpgradeTooltip;