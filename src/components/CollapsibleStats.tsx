import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CollapsibleStatsProps {
  rollCount: number;
  planetCount: number;
  dailyRerolls: number;
  hasChronoCapsule: boolean;
}

const CollapsibleStats = ({ rollCount, planetCount, dailyRerolls, hasChronoCapsule }: CollapsibleStatsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      {/* Collapsed View - Translucent Chip */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="glass-panel p-3 cursor-pointer hover:bg-primary/10 transition-colors"
            onClick={() => setIsExpanded(true)}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-muted-foreground">Stats</span>
                <span className="text-accent font-medium">{rollCount}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded View */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="glass-panel p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">Discovery Stats</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-2 text-sm">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex justify-between"
              >
                <span className="text-muted-foreground">Total Rolls:</span>
                <span className="text-foreground font-medium">{rollCount}</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-between"
              >
                <span className="text-muted-foreground">Planets Found:</span>
                <span className="text-foreground font-medium">{planetCount}</span>
              </motion.div>
              
              {hasChronoCapsule && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-between"
                >
                  <span className="text-muted-foreground">Rerolls Left:</span>
                  <span className="text-accent font-medium">{dailyRerolls}</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollapsibleStats;