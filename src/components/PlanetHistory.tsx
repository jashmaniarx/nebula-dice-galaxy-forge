import { Planet } from '../types/game';

interface PlanetHistoryProps {
  planets: Planet[];
  onPlanetClick: (planet: Planet) => void;
  bestPlanet?: Planet | null;
}

const PlanetHistory = ({ planets, onPlanetClick, bestPlanet }: PlanetHistoryProps) => {
  if (planets.length === 0) {
    return (
      <div className="glass-panel p-6 text-center">
        <p className="text-muted-foreground">No planets discovered yet</p>
        <p className="text-sm text-muted-foreground mt-2">Roll the dice to begin your cosmic journey!</p>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Recent Discoveries</h3>
      <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
        {planets.slice(0, 10).map((planet) => {
          const isBest = bestPlanet?.id === planet.id;
          return (
            <div
              key={planet.id}
              onClick={() => onPlanetClick(planet)}
              className={`planet-card cursor-pointer flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                isBest 
                  ? 'bg-accent/20 ring-2 ring-accent/50 shadow-lg shadow-accent/20 hover:bg-accent/30' 
                  : 'hover:bg-muted/20'
              }`}
            >
            <div
              className={`w-8 h-8 rounded-full flex-shrink-0 rarity-${planet.rarity} ${
                isBest ? 'ring-2 ring-accent/50' : ''
              }`}
              style={{
                background: `radial-gradient(circle at 30% 30%, ${planet.color}40, ${planet.color}80)`,
                boxShadow: isBest 
                  ? `0 0 20px ${planet.color}60, 0 0 10px hsl(var(--accent))` 
                  : `0 0 10px ${planet.color}40`,
                border: `1px solid ${planet.color}60`
              }}
            />
            <div className="flex-1 min-w-0">
              <div className={`font-medium rarity-${planet.rarity} truncate ${
                isBest ? 'text-accent' : ''
              }`}>
                {planet.name}
                {isBest && <span className="ml-2 text-xs">👑</span>}
              </div>
              <div className="text-xs text-muted-foreground">
                {planet.rarity} • {planet.type}
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              {new Date(planet.discoveredAt).toLocaleDateString()}
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlanetHistory;