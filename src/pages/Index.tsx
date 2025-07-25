import { useState, useEffect } from 'react';
import { Settings, History } from 'lucide-react';
import { useGameState } from '../hooks/useGameState';
import Starfield from '../components/Starfield';
import RollButton from '../components/RollButton';
import ChanceMeter from '../components/ChanceMeter';
import PlanetModal from '../components/PlanetModal';
import UpgradePanel from '../components/UpgradePanel';
import PlanetHistory from '../components/PlanetHistory';
import CollapsibleStats from '../components/CollapsibleStats';
import SaveToast from '../components/SaveToast';
import EquippedPlanetDisplay from '../components/EquippedPlanetDisplay';
import SettingsModal, { GameSettings } from '../components/SettingsModal';

const Index = () => {
  const {
    gameState,
    rollPlanet,
    closePlanetModal,
    toggleUpgradePanel,
    purchaseUpgrade,
    useReroll,
    showPlanetDetails,
    autoRollEnabled,
    toggleAutoRoll
  } = useGameState();

  const [showSaveToast, setShowSaveToast] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    soundEnabled: true,
    soundVolume: 50,
    visualEffects: true,
    particleEffects: true,
    animationSpeed: 100,
    showUI: true,
    autoSave: true,
    showTooltips: true,
    reducedMotion: false,
    highContrast: false,
    theme: 'dark',
    showRollHistory: true,
    showChanceMeter: true,
    compactMode: false,
  });

  const hasEchoAnalyzer = gameState.upgrades.find(u => u.id === 'echo-analyzer')?.owned || false;
  const hasChronoCapsule = gameState.upgrades.find(u => u.id === 'chrono-capsule')?.owned || false;
  const hasAutoDiscovery = gameState.upgrades.find(u => u.id === 'auto-discovery')?.owned || false;
  const canAutoRoll = gameState.rollCount >= 100;

  // Get the best planet (highest rarity)
  const bestPlanet = gameState.planets.length > 0 ? gameState.planets.reduce((best, planet) => {
    const rarityOrder = ['common', 'uncommon', 'rare', 'epic', 'mythic', 'legendary', 'celestial', 'transcendent', 'cosmic', 'omniversal'];
    const bestIndex = rarityOrder.indexOf(best.rarity);
    const planetIndex = rarityOrder.indexOf(planet.rarity);
    return planetIndex > bestIndex ? planet : best;
  }, gameState.planets[0]) : null;

  // Show save toast when game state changes
  useEffect(() => {
    if (gameState.rollCount > 0) {
      setSaveMessage('✨ Progress Saved');
      setShowSaveToast(true);
    }
  }, [gameState.rollCount, gameState.upgrades]);

  const handleRoll = () => {
    rollPlanet();
    setSaveMessage('🪐 New Planet Discovered');
    setShowSaveToast(true);
  };

  const handlePurchaseUpgrade = (upgradeId: string) => {
    purchaseUpgrade(upgradeId);
    setSaveMessage('⚡ Upgrade Activated');
    setShowSaveToast(true);
  };

  return (
    <div className="min-h-screen relative">
      {/* Starfield Background */}
      <Starfield />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-3">
            <img src="/lovable-uploads/4335c46e-78c3-4f52-8a32-18443ec8b21d.png" className="w-8 h-8" alt="Planetfall Logo" />
            <h1 className="text-2xl font-bold text-foreground">Planetfall: Nebula Dice</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSettingsModal(true)}
              className="glass-button px-4 py-2 flex items-center space-x-2 hover:bg-accent/20"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
            <button
              onClick={toggleUpgradePanel}
              className="glass-button px-4 py-2 flex items-center space-x-2 hover:bg-primary/20"
            >
              <Settings className="w-4 h-4" />
              <span>Upgrades</span>
            </button>
          </div>
        </header>


        {/* Main Game Area */}
        <div className="flex-1 flex flex-col lg:flex-row gap-6 p-6">
          {/* Left Panel - Chance Meter */}
          {gameSettings.showUI && (
            <div className="lg:w-80 space-y-6">
              {gameSettings.showChanceMeter && (
                <ChanceMeter probabilities={gameState.modifiedProbabilities} />
              )}
              
              {/* Collapsible Stats */}
              <CollapsibleStats
                rollCount={gameState.rollCount}
                planetCount={gameState.planets.length}
                dailyRerolls={gameState.dailyRerolls}
                hasChronoCapsule={hasChronoCapsule}
              />
            </div>
          )}

          {/* Center - Roll Button */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-8 relative">
              {/* Equipped Planet Display - Above title, slightly to the right */}
              {bestPlanet && (
                <div className="absolute -top-32 left-1/2 transform translate-x-8 -translate-y-1/2 z-10">
                  <EquippedPlanetDisplay planet={bestPlanet} />
                </div>
              )}
              
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-foreground">
                  Discover New Worlds
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Roll the cosmic dice to uncover mysterious planets across the galaxy. 
                  Each world holds unique secrets waiting to be discovered.
                </p>
              </div>
              
              <RollButton onRoll={handleRoll} />
              
              {/* Auto-roll Toggle */}
              {canAutoRoll && (
                <div className="glass-panel p-4 mt-4">
                  <h3 className="text-sm font-semibold mb-2 text-accent">Auto-Discovery Available</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    {autoRollEnabled ? 'Rolling automatically every 1.5 seconds' : 'Automatically roll every 1.5 seconds'}
                  </p>
                  <button
                    className={`glass-button px-4 py-2 text-sm transition-all ${
                      autoRollEnabled 
                        ? 'bg-destructive/20 hover:bg-destructive/30 text-destructive' 
                        : 'bg-accent/20 hover:bg-accent/30 text-accent'
                    }`}
                    onClick={toggleAutoRoll}
                  >
                    {autoRollEnabled ? 'Disable Auto-Roll' : 'Enable Auto-Roll'}
                  </button>
                </div>
              )}
              
              {/* Reroll Button */}
              {hasChronoCapsule && gameState.dailyRerolls > 0 && gameState.currentPlanet && (
                <button
                  onClick={useReroll}
                  className="glass-button px-6 py-3 text-accent hover:bg-accent/20 transition-colors"
                >
                  <History className="w-4 h-4 inline mr-2" />
                  Use Chrono Reroll ({gameState.dailyRerolls} left)
                </button>
              )}
            </div>
          </div>

          {/* Right Panel - Planet History */}
          {gameSettings.showUI && gameSettings.showRollHistory && (
            <div className="lg:w-80">
              <PlanetHistory
                planets={gameState.planets}
                onPlanetClick={showPlanetDetails}
                bestPlanet={bestPlanet}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="p-6 text-center text-sm text-muted-foreground">
          <p>Explore the infinite cosmos • Collect rare worlds • Upgrade your discovery capabilities</p>
        </footer>
      </div>

      {/* Modals */}
      <PlanetModal
        planet={gameState.currentPlanet}
        isOpen={gameState.showPlanetModal}
        onClose={closePlanetModal}
        hasEchoAnalyzer={hasEchoAnalyzer}
      />

      <UpgradePanel
        isOpen={gameState.showUpgradePanel}
        onClose={toggleUpgradePanel}
        upgrades={gameState.upgrades}
        onPurchase={handlePurchaseUpgrade}
        rollCount={gameState.rollCount}
      />

      {/* Save Toast */}
      <SaveToast
        show={showSaveToast}
        message={saveMessage}
        onHide={() => setShowSaveToast(false)}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        settings={gameSettings}
        onSettingsChange={setGameSettings}
      />
    </div>
  );
};

export default Index;
