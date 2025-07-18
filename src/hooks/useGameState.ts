import { useState, useCallback, useEffect } from 'react';
import { GameState, Planet, Upgrade, PlanetRarity, PlanetGenerationData } from '../types/game';

const planetData: PlanetGenerationData = {
  names: ['Xerion', 'Valtara', 'Zephyria', 'Nebulox', 'Crystalis', 'Ethereal', 'Voidheart', 'Starweaver', 'Lumina', 'Astralux', 'Solaris', 'Quantus', 'Nexus Prime', 'Stellaris', 'Omniplex', 'Infinity', 'Paradox', 'Zenith', 'Cosmos', 'Elysium', 'Thanatos', 'Hyperion', 'Andromeda', 'Galactus', 'Vesper', 'Orion', 'Altair', 'Rigel', 'Polaris', 'Sirius', 'Vega', 'Arcturus', 'Betelgeuse', 'Aldebaran', 'Antares'],
  types: ['Gas Giant', 'Rocky', 'Ice World', 'Lava Planet', 'Crystal World', 'Void Sphere', 'Plasma Core', 'Ethereal Realm', 'Quantum Sphere', 'Nebula Core', 'Stellar Forge', 'Temporal Nexus', 'Dimensional Hub', 'Cosmic Egg', 'Infinity Well', 'Paradox Zone', 'Omniversal Node', 'Transcendent Sphere', 'Reality Anchor', 'Existence Core'],
  atmospheres: ['Toxic', 'Breathable', 'Corrosive', 'Crystalline', 'Void', 'Plasma', 'Ethereal', 'Harmonic', 'Quantum', 'Temporal', 'Dimensional', 'Cosmic', 'Omniversal', 'Transcendent', 'Reality-Warping', 'Existence-Bending', 'Infinity-Touched', 'Paradox-Stable', 'Void-Touched', 'Star-Blessed'],
  terrains: ['Volcanic', 'Frozen', 'Crystalline', 'Void Rifts', 'Plasma Fields', 'Ethereal Gardens', 'Starlight Plains', 'Quantum Valleys', 'Temporal Canyons', 'Dimensional Peaks', 'Cosmic Deserts', 'Infinity Seas', 'Paradox Forests', 'Omniversal Meadows', 'Transcendent Peaks', 'Reality Wells', 'Existence Stones', 'Void Oceans', 'Star Meadows', 'Nebula Forests'],
  temperatures: ['Scorching', 'Frigid', 'Temperate', 'Absolute Zero', 'Plasma Hot', 'Ethereal', 'Harmonic', 'Quantum Flux', 'Temporal Variable', 'Dimensional Shift', 'Cosmic Constant', 'Infinity Stable', 'Paradox Balanced', 'Omniversal Perfect', 'Transcendent Pure', 'Reality Constant', 'Existence Stable', 'Void Cold', 'Star Warm', 'Nebula Cool'],
  traits: ['Magnetic Storms', 'Time Dilation', 'Gravity Wells', 'Crystal Formations', 'Void Portals', 'Plasma Geysers', 'Ethereal Mists', 'Quantum Tunnels', 'Temporal Loops', 'Dimensional Rifts', 'Cosmic Winds', 'Infinity Spirals', 'Paradox Zones', 'Omniversal Gates', 'Transcendent Auras', 'Reality Anchors', 'Existence Cores', 'Void Whispers', 'Star Fragments', 'Nebula Veins', 'Galactic Nexus', 'Universal Axis', 'Multiverse Bridge', 'Hyperspace Conduit', 'Subspace Anomaly'],
  colors: ['#9C27B0', '#00BCD4', '#FFEB3B', '#E91E63', '#4CAF50', '#FF9800', '#3F51B5', '#F44336', '#9C27B0', '#E91E63', '#FF5722', '#795548', '#607D8B', '#00E676', '#FF6D00', '#6200EA', '#C51162', '#AA00FF', '#D500F9', '#651FFF', '#3D5AFE', '#2979FF', '#00B0FF', '#00E5FF', '#1DE9B6', '#00C853', '#64DD17', '#AEEA00', '#FFD600', '#FFAB00', '#FF6F00', '#FF3D00', '#DD2C00', '#BF360C', '#3E2723']
};

const initialUpgrades: Upgrade[] = [
  // Original upgrades
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
  },
  // New advanced upgrades
  {
    id: 'stellar-amplifier',
    name: 'Stellar Amplifier',
    type: 'probability',
    effect: '+2% luck boost to all rarities',
    description: 'Amplifies cosmic resonance across all discovery tiers',
    flavorText: 'The stars sing louder when you listen...',
    cost: 150,
    owned: false,
    probabilityModifier: { rare: 0.02, epic: 0.02, mythic: 0.02 }
  },
  {
    id: 'void-scanner',
    name: 'Void Scanner',
    type: 'probability',
    effect: '+3% chance for Epic planets',
    description: 'Pierces the veil between dimensions',
    flavorText: 'In the void, all possibilities exist...',
    cost: 300,
    owned: false,
    probabilityModifier: { epic: 0.03 }
  },
  {
    id: 'mythic-resonator',
    name: 'Mythic Resonator',
    type: 'probability',
    effect: '+1.5% chance for Mythic planets',
    description: 'Attunes to legendary frequency waves',
    flavorText: 'Legends whisper to those who dare to listen...',
    cost: 600,
    owned: false,
    probabilityModifier: { mythic: 0.015 }
  },
  {
    id: 'legendary-beacon',
    name: 'Legendary Beacon',
    type: 'luck',
    effect: 'Unlocks 0.3% chance for Legendary planets',
    description: 'Calls forth worlds of legend',
    flavorText: 'A beacon in the cosmic dark, drawing forth the impossible...',
    cost: 1000,
    owned: false,
    probabilityModifier: { legendary: 0.003 }
  },
  {
    id: 'transcendent-key',
    name: 'Transcendent Key',
    type: 'luck',
    effect: 'Unlocks 0.1% chance for Transcendent planets',
    description: 'Opens gateways beyond reality',
    flavorText: 'Some doors should never be opened... but curiosity demands it...',
    cost: 2000,
    owned: false,
    probabilityModifier: { transcendent: 0.001 }
  },
  {
    id: 'cosmic-attunement',
    name: 'Cosmic Attunement',
    type: 'luck',
    effect: 'Unlocks 0.05% chance for Cosmic planets',
    description: 'Harmonizes with the universe itself',
    flavorText: 'To know the cosmos is to become one with infinity...',
    cost: 5000,
    owned: false,
    probabilityModifier: { cosmic: 0.0005 }
  },
  {
    id: 'omniversal-crown',
    name: 'Omniversal Crown',
    type: 'luck',
    effect: 'Unlocks 0.01% chance for Omniversal planets',
    description: 'Grants dominion over all realities',
    flavorText: 'The crown of creation itself, worn by the worthy...',
    cost: 10000,
    owned: false,
    probabilityModifier: { omniversal: 0.0001 }
  },
  {
    id: 'probability-matrix',
    name: 'Probability Matrix',
    type: 'modifier',
    effect: 'Common planets have 10% chance to become Uncommon',
    description: 'Restructures the fabric of chance',
    flavorText: 'When probability becomes art, even the mundane transforms...',
    cost: 250,
    owned: false,
    specialEffect: 'common-boost'
  },
  {
    id: 'quantum-leap',
    name: 'Quantum Leap',
    type: 'modifier',
    effect: 'Rare planets have 15% chance to become Epic',
    description: 'Enables quantum jumps across rarity tiers',
    flavorText: 'In quantum space, all possibilities exist simultaneously...',
    cost: 500,
    owned: false,
    specialEffect: 'rare-boost'
  },
  {
    id: 'epic-catalyst',
    name: 'Epic Catalyst',
    type: 'modifier',
    effect: 'Epic planets have 20% chance to become Mythic',
    description: 'Catalyzes legendary transformations',
    flavorText: 'The spark that ignites ordinary worlds into legend...',
    cost: 800,
    owned: false,
    specialEffect: 'epic-boost'
  },
  {
    id: 'stellar-fortune',
    name: 'Stellar Fortune',
    type: 'probability',
    effect: '+1% luck to all tiers above Common',
    description: 'Blessed by stellar alignment',
    flavorText: 'When stars align, fortune follows...',
    cost: 200,
    owned: false,
    probabilityModifier: { uncommon: 0.01, rare: 0.01, epic: 0.01, mythic: 0.01 }
  },
  {
    id: 'cosmic-multiplier',
    name: 'Cosmic Multiplier',
    type: 'probability',
    effect: '+50% to all existing probability bonuses',
    description: 'Amplifies all cosmic enhancements',
    flavorText: 'The universe rewards those who dare to reach further...',
    cost: 1500,
    owned: false,
    specialEffect: 'probability-amplifier'
  },
  {
    id: 'time-dilation-field',
    name: 'Time Dilation Field',
    type: 'reroll',
    effect: 'Grants 2 additional rerolls per day',
    description: 'Manipulates temporal flow for multiple chances',
    flavorText: 'Time is but a river, and you hold the dam...',
    cost: 600,
    owned: false,
    specialEffect: 'extra-rerolls'
  },
  {
    id: 'reality-anchor',
    name: 'Reality Anchor',
    type: 'modifier',
    effect: 'Prevents downgrades, all tier boosts guaranteed',
    description: 'Stabilizes probability fluctuations',
    flavorText: 'Reality bends, but never breaks in your presence...',
    cost: 1200,
    owned: false,
    specialEffect: 'stability-anchor'
  },
  {
    id: 'dimensional-splitter',
    name: 'Dimensional Splitter',
    type: 'probability',
    effect: '+2% chance to each tier when rolling Mythic or above',
    description: 'Splits reality to multiply possibilities',
    flavorText: 'In infinite dimensions, all outcomes converge...',
    cost: 2500,
    owned: false,
    specialEffect: 'dimensional-split'
  },
  {
    id: 'infinity-loop',
    name: 'Infinity Loop',
    type: 'modifier',
    effect: 'Legendary planets have 5% chance to become Celestial',
    description: 'Creates endless probability cycles',
    flavorText: 'At the edge of infinity, legend becomes divine...',
    cost: 3000,
    owned: false,
    specialEffect: 'legendary-boost'
  },
  {
    id: 'paradox-engine',
    name: 'Paradox Engine',
    type: 'modifier',
    effect: 'All failed high-tier rolls get second chance at +1 tier',
    description: 'Harnesses impossible contradictions',
    flavorText: 'Where logic fails, paradox succeeds...',
    cost: 4000,
    owned: false,
    specialEffect: 'paradox-chance'
  },
  {
    id: 'omniscient-eye',
    name: 'Omniscient Eye',
    type: 'visual',
    effect: 'Shows hidden planet statistics and future potential',
    description: 'Perceives all possibilities simultaneously',
    flavorText: 'To see all is to understand the infinite dance of creation...',
    cost: 800,
    owned: false,
    specialEffect: 'omniscient-view'
  },
  {
    id: 'stellar-forge',
    name: 'Stellar Forge',
    type: 'aesthetic',
    effect: 'Planets gain unique visual effects based on rarity',
    description: 'Forges beauty from cosmic materials',
    flavorText: 'In the forge of stars, beauty is born from chaos...',
    cost: 500,
    owned: false,
    specialEffect: 'stellar-beauty'
  },
  {
    id: 'harmony-resonance',
    name: 'Harmony Resonance',
    type: 'aesthetic',
    effect: 'Synchronizes all animations to cosmic rhythm',
    description: 'Attunes all movement to universal harmony',
    flavorText: 'When all things move as one, the universe sings...',
    cost: 700,
    owned: false,
    specialEffect: 'harmonic-sync'
  },
  {
    id: 'luck-cascade',
    name: 'Luck Cascade',
    type: 'probability',
    effect: 'Each rare planet found increases all probabilities by 0.1%',
    description: 'Creates cascading waves of fortune',
    flavorText: 'Fortune breeds fortune, in endless cascade...',
    cost: 1000,
    owned: false,
    specialEffect: 'luck-accumulator'
  },
  {
    id: 'cosmic-symphony',
    name: 'Cosmic Symphony',
    type: 'aesthetic',
    effect: 'Adds dynamic music that changes with discoveries',
    description: 'Orchestrates the music of the spheres',
    flavorText: 'Every discovery adds a note to the eternal symphony...',
    cost: 600,
    owned: false,
    specialEffect: 'dynamic-music'
  },
  {
    id: 'auto-discovery',
    name: 'Auto-Discovery',
    type: 'automation',
    effect: 'Unlocks auto-roll after 100 manual discoveries',
    description: 'Automates the discovery process',
    flavorText: 'The universe reveals itself to those who seek constantly...',
    cost: 2000,
    owned: false,
    specialEffect: 'auto-roll'
  },
  {
    id: 'probability-storm',
    name: 'Probability Storm',
    type: 'modifier',
    effect: 'Every 50th roll guarantees Epic or higher',
    description: 'Summons storms of pure possibility',
    flavorText: 'In the eye of the storm, certainty is born...',
    cost: 3500,
    owned: false,
    specialEffect: 'guaranteed-epic'
  },
  {
    id: 'universal-key',
    name: 'Universal Key',
    type: 'luck',
    effect: 'Unlocks access to all rarity tiers simultaneously',
    description: 'Opens all doors across the multiverse',
    flavorText: 'One key to unlock infinite worlds...',
    cost: 5000,
    owned: false,
    specialEffect: 'universal-access'
  },
  {
    id: 'eternity-engine',
    name: 'Eternity Engine',
    type: 'modifier',
    effect: 'All upgrades become 25% more effective',
    description: 'Powers enhancement through eternity itself',
    flavorText: 'In eternity, all improvements echo forever...',
    cost: 7500,
    owned: false,
    specialEffect: 'eternal-amplifier'
  },
  {
    id: 'genesis-core',
    name: 'Genesis Core',
    type: 'probability',
    effect: 'Doubles all base probabilities permanently',
    description: 'Harnesses the power of creation itself',
    flavorText: 'At the heart of creation, all things become possible...',
    cost: 10000,
    owned: false,
    specialEffect: 'genesis-boost'
  },
  {
    id: 'infinite-potential',
    name: 'Infinite Potential',
    type: 'modifier',
    effect: 'Removes all probability caps and limitations',
    description: 'Unleashes boundless possibility',
    flavorText: 'When limits dissolve, infinite potential awakens...',
    cost: 15000,
    owned: false,
    specialEffect: 'infinite-unleash'
  }
];

const baseProbabilities = {
  common: 0.45,
  uncommon: 0.28,
  rare: 0.15,
  epic: 0.08,
  mythic: 0.03,
  legendary: 0.008,
  celestial: 0.000, // Unlocked by upgrades
  transcendent: 0.000,
  cosmic: 0.000,
  omniversal: 0.000
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem('planetfall-game-state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          planets: parsed.planets?.map((planet: any) => ({
            ...planet,
            discoveredAt: new Date(planet.discoveredAt)
          })) || [],
          upgrades: initialUpgrades.map(upgrade => ({
            ...upgrade,
            owned: parsed.upgrades?.find((u: Upgrade) => u.id === upgrade.id)?.owned || false
          }))
        };
      } catch (e) {
        console.error('Failed to parse saved game state:', e);
      }
    }
    return {
      planets: [],
      upgrades: initialUpgrades,
      rollCount: 0,
      dailyRerolls: 1,
      baseProbabilities,
      modifiedProbabilities: { ...baseProbabilities },
      currentPlanet: null,
      showPlanetModal: false,
      showUpgradePanel: false
    };
  });

  const [autoRollEnabled, setAutoRollEnabled] = useState(false);
  const [autoRollInterval, setAutoRollInterval] = useState<NodeJS.Timeout | null>(null);

  // Save to localStorage whenever game state changes
  useEffect(() => {
    localStorage.setItem('planetfall-game-state', JSON.stringify(gameState));
  }, [gameState]);

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

    // Apply upgrade effects
    const hasNovasynth = gameState.upgrades.find(u => u.id === 'nova-synth' && u.owned);
    const hasProbabilityMatrix = gameState.upgrades.find(u => u.id === 'probability-matrix' && u.owned);
    const hasQuantumLeap = gameState.upgrades.find(u => u.id === 'quantum-leap' && u.owned);
    const hasEpicCatalyst = gameState.upgrades.find(u => u.id === 'epic-catalyst' && u.owned);
    const hasInfinityLoop = gameState.upgrades.find(u => u.id === 'infinity-loop' && u.owned);
    const hasUniversalKey = gameState.upgrades.find(u => u.id === 'universal-key' && u.owned);
    const hasGuaranteedEpic = gameState.upgrades.find(u => u.id === 'probability-storm' && u.owned);

    // Apply tier boost upgrades
    if (hasNovasynth && rarity === 'uncommon' && Math.random() <= 0.05) {
      rarity = 'rare';
    }
    if (hasProbabilityMatrix && rarity === 'common' && Math.random() <= 0.1) {
      rarity = 'uncommon';
    }
    if (hasQuantumLeap && rarity === 'rare' && Math.random() <= 0.15) {
      rarity = 'epic';
    }
    if (hasEpicCatalyst && rarity === 'epic' && Math.random() <= 0.2) {
      rarity = 'mythic';
    }
    if (hasInfinityLoop && rarity === 'legendary' && Math.random() <= 0.05) {
      rarity = 'celestial';
    }

    // Guaranteed epic every 50th roll
    if (hasGuaranteedEpic && gameState.rollCount % 50 === 49) {
      const highTiers: PlanetRarity[] = ['epic', 'mythic', 'legendary', 'celestial'];
      rarity = highTiers[Math.floor(Math.random() * highTiers.length)];
    }

    // Universal key allows all tiers
    if (hasUniversalKey && Math.random() <= 0.001) {
      const allTiers: PlanetRarity[] = ['common', 'uncommon', 'rare', 'epic', 'mythic', 'legendary', 'celestial', 'transcendent', 'cosmic', 'omniversal'];
      rarity = allTiers[Math.floor(Math.random() * allTiers.length)];
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
        ...(rarity !== 'common' ? [planetData.traits[Math.floor(Math.random() * planetData.traits.length)]] : []),
        ...(rarity === 'mythic' || rarity === 'legendary' || rarity === 'celestial' ? [planetData.traits[Math.floor(Math.random() * planetData.traits.length)]] : [])
      ].filter((trait, index, arr) => arr.indexOf(trait) === index), // Remove duplicates
      color: planetData.colors[Math.floor(Math.random() * planetData.colors.length)],
      size: Math.random() * 100 + 50
    };

    return planet;
  }, [gameState.modifiedProbabilities, gameState.upgrades, gameState.rollCount]);

  const rollPlanet = useCallback(() => {
    const planet = generatePlanet();
    
    setGameState(prev => ({
      ...prev,
      planets: [planet, ...prev.planets].slice(0, 50), // Keep last 50 planets
      currentPlanet: planet,
      rollCount: prev.rollCount + 1,
      showPlanetModal: true
    }));

    // Enable auto-roll after 100 rolls if upgrade is owned
    if (gameState.rollCount + 1 >= 100 && gameState.upgrades.find(u => u.id === 'auto-discovery' && u.owned)) {
      setAutoRollEnabled(true);
    }
  }, [generatePlanet, gameState.rollCount, gameState.upgrades]);

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

      // Apply probability amplifiers
      const hasCosmicMultiplier = newUpgrades.find(u => u.id === 'cosmic-multiplier' && u.owned);
      const hasEternityEngine = newUpgrades.find(u => u.id === 'eternity-engine' && u.owned);
      const hasGenesisCore = newUpgrades.find(u => u.id === 'genesis-core' && u.owned);
      
      if (hasCosmicMultiplier) {
        // +50% to all probability bonuses
        Object.keys(newProbabilities).forEach(rarity => {
          const bonus = newProbabilities[rarity as PlanetRarity] - prev.baseProbabilities[rarity as PlanetRarity];
          newProbabilities[rarity as PlanetRarity] = prev.baseProbabilities[rarity as PlanetRarity] + (bonus * 1.5);
        });
      }
      
      if (hasEternityEngine) {
        // +25% to all upgrades
        Object.keys(newProbabilities).forEach(rarity => {
          const bonus = newProbabilities[rarity as PlanetRarity] - prev.baseProbabilities[rarity as PlanetRarity];
          newProbabilities[rarity as PlanetRarity] = prev.baseProbabilities[rarity as PlanetRarity] + (bonus * 1.25);
        });
      }
      
      if (hasGenesisCore) {
        // Double all base probabilities
        Object.keys(newProbabilities).forEach(rarity => {
          newProbabilities[rarity as PlanetRarity] *= 2;
        });
      }

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
      if (upgradeId === 'time-dilation-field') {
        newDailyRerolls += 2; // Add 2 more rerolls
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

  const toggleAutoRoll = useCallback(() => {
    if (autoRollEnabled) {
      setAutoRollEnabled(false);
      if (autoRollInterval) {
        clearInterval(autoRollInterval);
        setAutoRollInterval(null);
      }
    } else {
      setAutoRollEnabled(true);
      const interval = setInterval(() => {
        rollPlanet();
      }, 3000);
      setAutoRollInterval(interval);
    }
  }, [autoRollEnabled, autoRollInterval, rollPlanet]);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (autoRollInterval) {
        clearInterval(autoRollInterval);
      }
    };
  }, [autoRollInterval]);

  return {
    gameState,
    rollPlanet,
    closePlanetModal,
    toggleUpgradePanel,
    purchaseUpgrade,
    useReroll,
    showPlanetDetails,
    autoRollEnabled,
    toggleAutoRoll
  };
};