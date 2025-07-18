import { useState } from 'react';
import { X, Zap, Eye, Palette, Dice1, RefreshCw, TrendingUp, Lock } from 'lucide-react';
import { Upgrade } from '../types/game';
import UpgradeTooltip from './UpgradeTooltip';

interface UpgradePanelProps {
  isOpen: boolean;
  onClose: () => void;
  upgrades: Upgrade[];
  onPurchase: (upgradeId: string) => void;
  rollCount: number;
}

const upgradeIcons = {
  probability: Zap,
  animation: RefreshCw,
  visual: Eye,
  luck: Dice1,
  aesthetic: Palette,
  reroll: RefreshCw,
  modifier: TrendingUp,
  automation: Lock
};

const UpgradePanel = ({ isOpen, onClose, upgrades, onPurchase, rollCount }: UpgradePanelProps) => {
  const [hoveredUpgrade, setHoveredUpgrade] = useState<Upgrade | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  if (!isOpen) return null;

  const canAfford = (upgrade: Upgrade) => rollCount >= upgrade.cost;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop">
      <div className="glass-panel relative w-full max-w-2xl mx-4 p-6 max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Cosmic Upgrades</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-destructive/80 hover:bg-destructive text-white transition-colors flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Roll Count */}
        <div className="mb-6 text-center">
          <div className="text-sm text-muted-foreground">Discovery Points</div>
          <div className="text-2xl font-bold text-accent">{rollCount}</div>
        </div>

        {/* Upgrades Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upgrades.map((upgrade) => {
            const Icon = upgradeIcons[upgrade.type];
            const affordable = canAfford(upgrade);
            const owned = upgrade.owned;

            return (
              <div
                key={upgrade.id}
                className={`upgrade-chip relative p-4 ${
                  owned ? 'bg-primary/20 border-primary/50' : 
                  affordable ? 'hover:bg-primary/10' : 'opacity-50'
                }`}
              >
                {/* Owned Badge */}
                {owned && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                )}

                {/* Upgrade Content */}
                <div className="flex items-start space-x-3">
                  <Icon className={`w-6 h-6 flex-shrink-0 ${owned ? 'text-primary' : 'text-secondary'}`} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">{upgrade.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{upgrade.effect}</p>
                    <p className="text-xs text-muted-foreground/80 mb-3 italic">
                      "{upgrade.flavorText}"
                    </p>
                  </div>
                </div>

                {/* Purchase Button */}
                {!owned && (
                  <button
                    onClick={() => onPurchase(upgrade.id)}
                    disabled={!affordable}
                    onMouseEnter={(e) => {
                      setHoveredUpgrade(upgrade);
                      setMousePosition({ x: e.clientX, y: e.clientY });
                    }}
                    onMouseLeave={() => setHoveredUpgrade(null)}
                    onMouseMove={(e) => {
                      setMousePosition({ x: e.clientX, y: e.clientY });
                    }}
                    className={`w-full mt-3 py-2 px-4 rounded-lg font-medium transition-all ${
                      affordable
                        ? 'bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30'
                        : 'bg-muted/20 text-muted-foreground cursor-not-allowed border border-muted/30'
                    }`}
                  >
                    {affordable ? (
                      <>
                        <Zap className="w-4 h-4 inline mr-2" />
                        Activate ({upgrade.cost} points)
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 inline mr-2" />
                        Requires {upgrade.cost} points
                      </>
                    )}
                  </button>
                )}

                {owned && (
                  <div className="w-full mt-3 py-2 px-4 rounded-lg bg-primary/10 text-primary text-center font-medium">
                    <Zap className="w-4 h-4 inline mr-2" />
                    Activated
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          Upgrades are permanent and stack with each other
        </div>
      </div>
      
      {/* Upgrade Tooltip */}
      <UpgradeTooltip
        upgrade={hoveredUpgrade!}
        show={!!hoveredUpgrade}
        position={mousePosition}
      />
    </div>
  );
};

export default UpgradePanel;