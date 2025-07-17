import { PlanetRarity } from '../types/game';

interface ChanceMeterProps {
  probabilities: { [key in PlanetRarity]: number };
}

const rarityLabels = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  epic: 'Epic',
  mythic: 'Mythic',
  legendary: 'Legendary',
  celestial: 'Celestial',
  transcendent: 'Transcendent',
  cosmic: 'Cosmic',
  omniversal: 'Omniversal'
};

const rarityColors = {
  common: 'text-gray-400',
  uncommon: 'text-green-400',
  rare: 'text-blue-400',
  epic: 'text-purple-400',
  mythic: 'text-pink-400',
  legendary: 'text-yellow-400',
  celestial: 'text-amber-400',
  transcendent: 'text-fuchsia-400',
  cosmic: 'text-cyan-400',
  omniversal: 'text-violet-400'
};

const ChanceMeter = ({ probabilities }: ChanceMeterProps) => {
  return (
    <div className="chance-meter">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Discovery Odds</h3>
      <div className="space-y-3">
        {Object.entries(probabilities).map(([rarity, probability]) => (
          <div key={rarity} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${rarityColors[rarity as PlanetRarity]}`}
                style={{ backgroundColor: 'currentColor' }}
              />
              <span className={`font-medium ${rarityColors[rarity as PlanetRarity]}`}>
                {rarityLabels[rarity as PlanetRarity]}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${rarityColors[rarity as PlanetRarity]} transition-all duration-300`}
                  style={{
                    width: `${Math.min(probability * 100 * 2, 100)}%`,
                    backgroundColor: 'currentColor'
                  }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-12 text-right">
                {(probability * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChanceMeter;