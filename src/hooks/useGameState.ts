import { useState, useCallback } from 'react';
import { GameState, Planet, Upgrade, PlanetRarity, PlanetGenerationData } from '../types/game';

const planetData: PlanetGenerationData = {
  names: ['Xerion', 'Valtara', 'Zephyria', 'Nebulox', 'Crystalis', 'Ethereal', 'Voidheart', 'Starweaver', 'Lumina', 'Astralux'],
  types: ['Gas Giant', 'Rocky', 'Ice World', 'Lava Planet', 'Crystal World', 'Void Sphere', 'Plasma Core', 'Ethereal Realm'],
  atmospheres: ['Toxic', 'Breathable', 'Corrosive', 'Crystalline', 'Void', 'Plasma', 'Ethereal', 'Harmonic'],
  terrains: ['Volcanic', 'Frozen', 'Crystalline', 'Void Rifts', 'Plasma Fields', 'Ethereal Gardens', 'Starlight Plains'],
  temperatures: ['Scorching', 'Frigid', 'Temperate', 'Absolute Zero', 'Plasma Hot', 'Ethereal', 'Harmonic'],
  traits: ['Magnetic Storms', 'Time Dilation', 'Gravity Wells', 'Crystal Formations', 'Void Portals', 'Plasma Geysers', 'Ethereal Mists'],
  colors: ['#9C27B0', '#00BCD4', '#FFEB3B', '#E91E63', '#4CAF50', '#FF9800', '#3F51B5', '#F44336']
};

const initialUpgrades: Upgrade[] = [
  {
    id: 'quantum-prism',
    name: 'Quantum Prism',
    type: 'probability',
    effect: '+5% chance to find Rare planets',
    description: 'Bends probability waves to reveal rare worlds',
    flavorText: 'Through the quantum prism, reality becomes malleable...',
    cost: 100,
    owned: false,
    probabilityModifier: { rare: 0.05 }
  },
  {
    id: 'graviton-pulse',
    name: 'Graviton Pulse',
    type: 'animation',
    effect: 'Adds gravity-drop animation to planet reveal',
    description: 'Enhances discovery visualization',
    flavorText: 'Watch worlds fall into your reality...',
    cost: 150,
    owned: false,
    specialEffect: 'gravity-drop'
  },
  {
    id: 'echo-analyzer',
    name: 'Echo Analyzer',
    type: 'visual',
    effect: 'Highlights rare traits on discovered planets',
    description: 'Reveals hidden planetary characteristics',
    flavorText: 'Every world echoes with untold secrets...',
    cost: 200,
    owned: false,
    specialEffect: 'highlight-traits'
  },
  {
    id: 'celestial-lens',
    name: 'Celestial Lens',
    type: 'luck',
    effect: 'Unlocks 0.5% chance for Celestial planet tier',
    description: 'Opens pathways to the rarest worlds',
    flavorText: 'Through the celestial lens, the impossible becomes possible...',
    cost: 500,
    owned: false,
    probabilityModifier: { celestial: 0.005 }
  },
  {
    id: 'nebula-splicer',
    name: 'Nebula Splicer',
    type: 'aesthetic',
    effect: 'Adds soft fog glow and warp ribbon trails',
    description: 'Enhances visual effects with cosmic beauty',
    flavorText: 'Reality shimmers with nebular grace...',
    cost: 250,
    owned: false,
    specialEffect: 'nebula-effects'
  },
  {
    id: 'chrono-capsule',
    name: 'Chrono Capsule',
    type: 'reroll',
    effect: 'Allows 1 reroll per day for better tier odds',
    description: 'Manipulates temporal probability streams',
    flavorText: 'Time bends to your will, offering second chances...',
    cost: 300,
    owned: false,
    specialEffect: 'daily-reroll'
  },
  {
    id: 'nova-synth',
    name: 'Nova Synth',
    type: 'modifier',
    effect: 'Converts Uncommon planets to Rare if rolls land within 5% margin',
    description: 'Amplifies discovery potential',
    flavorText: 'When stars align, the ordinary becomes extraordinary...',
    cost: 400,
    owned: false,
    specialEffect: 'tier-boost'
  }
];

const baseProbabilities = {
  common: 0.5,
  uncommon: 0.3,
  rare: 0.15,
  mythic: 0.045,
  celestial: 0.000 // Unlocked by Celestial Lens upgrade
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    planets: [],
    upgrades: initialUpgrades,
    rollCount: 0,
    dailyRerolls: 1, // Start with 1 daily reroll
    baseProbabilities,
    modifiedProbabilities: { ...baseProbabilities },
    currentPlanet: null,
    showPlanetModal: false,
    showUpgradePanel: false
  });

  const generatePlanet = useCallback((forceRarity?: PlanetRarity): Planet => {
    const probabilities = gameState.modifiedProbabilities;
    let rarity: PlanetRarity = 'common';
    
    if (forceRarity) {
      rarity = forceRarity;
    } else {
      const roll = Math.random();
      let cumulative = 0;
      
      for (const [tier, prob] of Object.entries(probabilities) as [PlanetRarity, number][]) {
        cumulative += prob;
        if (roll <= cumulative) {
          rarity = tier;
          break;
        }
      }
    }

    // Apply Nova Synth upgrade effect
    if (gameState.upgrades.find(u => u.id === 'nova-synth' && u.owned) && rarity === 'uncommon') {
      const marginRoll = Math.random();
      if (marginRoll <= 0.05) {
        rarity = 'rare';
      }
    }

    const planet: Planet = {
      id: `planet-${Date.now()}-${Math.random()}`,
      name: planetData.names[Math.floor(Math.random() * planetData.names.length)],
      rarity,
      type: planetData.types[Math.floor(Math.random() * planetData.types.length)],
      atmosphere: planetData.atmospheres[Math.floor(Math.random() * planetData.atmospheres.length)],
      terrain: planetData.terrains[Math.floor(Math.random() * planetData.terrains.length)],
      temperature: planetData.temperatures[Math.floor(Math.random() * planetData.temperatures.length)],
      discoveredAt: new Date(),
      traits: [
        planetData.traits[Math.floor(Math.random() * planetData.traits.length)],
        ...(rarity !== 'common' ? [planetData.traits[Math.floor(Math.random() * planetData.traits.length)]] : [])
      ],
      color: planetData.colors[Math.floor(Math.random() * planetData.colors.length)],
      size: Math.random() * 100 + 50
    };

    return planet;
  }, [gameState.modifiedProbabilities, gameState.upgrades]);

  const rollPlanet = useCallback(() => {
    const planet = generatePlanet();
    
    setGameState(prev => ({
      ...prev,
      planets: [planet, ...prev.planets].slice(0, 50), // Keep last 50 planets
      currentPlanet: planet,
      rollCount: prev.rollCount + 1,
      showPlanetModal: true
    }));
  }, [generatePlanet]);

  const closePlanetModal = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showPlanetModal: false
    }));
  }, []);

  const toggleUpgradePanel = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showUpgradePanel: !prev.showUpgradePanel
    }));
  }, []);

  const purchaseUpgrade = useCallback((upgradeId: string) => {
    setGameState(prev => {
      const upgrade = prev.upgrades.find(u => u.id === upgradeId);
      if (!upgrade || upgrade.owned) return prev;

      const newUpgrades = prev.upgrades.map(u =>
        u.id === upgradeId ? { ...u, owned: true } : u
      );

      // Calculate new probabilities
      let newProbabilities = { ...prev.baseProbabilities };
      
      newUpgrades.forEach(u => {
        if (u.owned && u.probabilityModifier) {
          Object.entries(u.probabilityModifier).forEach(([rarity, modifier]) => {
            newProbabilities[rarity as PlanetRarity] += modifier!;
          });
        }
      });

      // Normalize probabilities
      const total = Object.values(newProbabilities).reduce((sum, prob) => sum + prob, 0);
      if (total > 1) {
        Object.keys(newProbabilities).forEach(rarity => {
          newProbabilities[rarity as PlanetRarity] /= total;
        });
      }

      // Special upgrade effects
      let newDailyRerolls = prev.dailyRerolls;
      if (upgradeId === 'chrono-capsule') {
        newDailyRerolls = 1; // Grant 1 daily reroll when purchased
      }

      return {
        ...prev,
        upgrades: newUpgrades,
        modifiedProbabilities: newProbabilities,
        dailyRerolls: newDailyRerolls
      };
    });
  }, []);

  const useReroll = useCallback(() => {
    if (gameState.dailyRerolls > 0) {
      const planet = generatePlanet();
      setGameState(prev => ({
        ...prev,
        planets: [planet, ...prev.planets.slice(1)].slice(0, 50),
        currentPlanet: planet,
        dailyRerolls: prev.dailyRerolls - 1,
        showPlanetModal: true
      }));
    }
  }, [gameState.dailyRerolls, generatePlanet]);

  const showPlanetDetails = useCallback((planet: Planet) => {
    setGameState(prev => ({
      ...prev,
      currentPlanet: planet,
      showPlanetModal: true
    }));
  }, []);

  return {
    gameState,
    rollPlanet,
    closePlanetModal,
    toggleUpgradePanel,
    purchaseUpgrade,
    useReroll,
    showPlanetDetails
  };
};