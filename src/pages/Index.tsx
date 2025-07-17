import { Settings, History, Sparkles } from 'lucide-react';
import { useGameState } from '../hooks/useGameState';
import Starfield from '../components/Starfield';
import RollButton from '../components/RollButton';
import ChanceMeter from '../components/ChanceMeter';
import PlanetModal from '../components/PlanetModal';
import UpgradePanel from '../components/UpgradePanel';
import PlanetHistory from '../components/PlanetHistory';

const Index = () => {
  const {
    gameState,
    rollPlanet,
    closePlanetModal,
    toggleUpgradePanel,
    purchaseUpgrade,
    useReroll,
    showPlanetDetails
  } = useGameState();

  const hasEchoAnalyzer = gameState.upgrades.find(u => u.id === 'echo-analyzer')?.owned || false;
  const hasChronoCapsule = gameState.upgrades.find(u => u.id === 'chrono-capsule')?.owned || false;
  const hasAutoDiscovery = gameState.upgrades.find(u => u.id === 'auto-discovery')?.owned || false;
  const canAutoRoll = gameState.rollCount >= 100 && hasAutoDiscovery;

  return (
    <div className="min-h-screen relative">
      {/* Starfield Background */}
      <Starfield />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-8 h-8 text-accent" />
            <h1 className="text-2xl font-bold text-foreground">Planetfall: Nebula Dice</h1>
          </div>
          <button
            onClick={toggleUpgradePanel}
            className="glass-button px-4 py-2 flex items-center space-x-2 hover:bg-primary/20"
          >
            <Settings className="w-4 h-4" />
            <span>Upgrades</span>
          </button>
        </header>

        {/* Main Game Area */}
        <div className="flex-1 flex flex-col lg:flex-row gap-6 p-6">
          {/* Left Panel - Chance Meter */}
          <div className="lg:w-80 space-y-6">
            <ChanceMeter probabilities={gameState.modifiedProbabilities} />
            
            {/* Stats */}
            <div className="glass-panel p-4">
              <h3 className="font-semibold mb-3 text-foreground">Discovery Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Rolls:</span>
                  <span className="text-foreground font-medium">{gameState.rollCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Planets Found:</span>
                  <span className="text-foreground font-medium">{gameState.planets.length}</span>
                </div>
                {hasChronoCapsule && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rerolls Left:</span>
                    <span className="text-accent font-medium">{gameState.dailyRerolls}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Center - Roll Button */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-foreground">
                  Discover New Worlds
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Roll the cosmic dice to uncover mysterious planets across the galaxy. 
                  Each world holds unique secrets waiting to be discovered.
                </p>
              </div>
              
              <RollButton onRoll={rollPlanet} />
              
              {/* Auto-roll Toggle */}
              {canAutoRoll && (
                <div className="glass-panel p-4 mt-4">
                  <h3 className="text-sm font-semibold mb-2 text-accent">Auto-Discovery Available</h3>
                  <p className="text-xs text-muted-foreground mb-3">Automatically roll every 3 seconds</p>
                  <button
                    className="glass-button px-4 py-2 text-sm bg-accent/20 hover:bg-accent/30 text-accent"
                    onClick={() => {/* Auto-roll logic will be added */}}
                  >
                    Enable Auto-Roll
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
          <div className="lg:w-80">
            <PlanetHistory
              planets={gameState.planets}
              onPlanetClick={showPlanetDetails}
            />
          </div>
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
        onPurchase={purchaseUpgrade}
        rollCount={gameState.rollCount}
      />
    </div>
  );
};

export default Index;
