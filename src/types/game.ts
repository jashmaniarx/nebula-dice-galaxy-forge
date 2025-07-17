export type PlanetRarity = 'common' | 'uncommon' | 'rare' | 'mythic' | 'celestial';

export interface Planet {
  id: string;
  name: string;
  rarity: PlanetRarity;
  type: string;
  atmosphere: string;
  terrain: string;
  temperature: string;
  discoveredAt: Date;
  traits: string[];
  color: string;
  size: number;
}

export interface Upgrade {
  id: string;
  name: string;
  type: 'probability' | 'animation' | 'visual' | 'luck' | 'aesthetic' | 'reroll' | 'modifier';
  effect: string;
  description: string;
  flavorText: string;
  cost: number;
  owned: boolean;
  probabilityModifier?: { [key in PlanetRarity]?: number };
  specialEffect?: string;
}

export interface GameState {
  planets: Planet[];
  upgrades: Upgrade[];
  rollCount: number;
  dailyRerolls: number;
  baseProbabilities: { [key in PlanetRarity]: number };
  modifiedProbabilities: { [key in PlanetRarity]: number };
  currentPlanet: Planet | null;
  showPlanetModal: boolean;
  showUpgradePanel: boolean;
}

export interface PlanetGenerationData {
  names: string[];
  types: string[];
  atmospheres: string[];
  terrains: string[];
  temperatures: string[];
  traits: string[];
  colors: string[];
}