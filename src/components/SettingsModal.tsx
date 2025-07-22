import { useState } from 'react';
import { X, Volume2, VolumeX, Eye, EyeOff, Sparkles, Settings, Palette, Gamepad2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Button } from './ui/button';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GameSettings;
  onSettingsChange: (settings: GameSettings) => void;
}

export interface GameSettings {
  soundEnabled: boolean;
  soundVolume: number;
  visualEffects: boolean;
  particleEffects: boolean;
  animationSpeed: number;
  showUI: boolean;
  autoSave: boolean;
  showTooltips: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  theme: 'dark' | 'light' | 'cosmic';
  showRollHistory: boolean;
  showChanceMeter: boolean;
  compactMode: boolean;
}

const SettingsModal = ({ isOpen, onClose, settings, onSettingsChange }: SettingsModalProps) => {
  const [localSettings, setLocalSettings] = useState<GameSettings>(settings);

  const updateSetting = <K extends keyof GameSettings>(key: K, value: GameSettings[K]) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const resetToDefaults = () => {
    const defaultSettings: GameSettings = {
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
    };
    setLocalSettings(defaultSettings);
    onSettingsChange(defaultSettings);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-modal max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-accent" />
            <span>Game Settings</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general" className="flex items-center space-x-1">
              <Settings className="w-4 h-4" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center space-x-1">
              <Volume2 className="w-4 h-4" />
              <span>Audio</span>
            </TabsTrigger>
            <TabsTrigger value="visual" className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>Visual</span>
            </TabsTrigger>
            <TabsTrigger value="interface" className="flex items-center space-x-1">
              <Palette className="w-4 h-4" />
              <span>Interface</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto-save Progress</Label>
                  <p className="text-sm text-muted-foreground">Automatically save your game progress</p>
                </div>
                <Switch
                  checked={localSettings.autoSave}
                  onCheckedChange={(value) => updateSetting('autoSave', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Show Tooltips</Label>
                  <p className="text-sm text-muted-foreground">Display helpful tooltips and hints</p>
                </div>
                <Switch
                  checked={localSettings.showTooltips}
                  onCheckedChange={(value) => updateSetting('showTooltips', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Compact Mode</Label>
                  <p className="text-sm text-muted-foreground">Reduce spacing and use smaller components</p>
                </div>
                <Switch
                  checked={localSettings.compactMode}
                  onCheckedChange={(value) => updateSetting('compactMode', value)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="audio" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex items-center space-x-2">
                  {localSettings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <Label className="text-base">Sound Effects</Label>
                </div>
                <Switch
                  checked={localSettings.soundEnabled}
                  onCheckedChange={(value) => updateSetting('soundEnabled', value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-base">Sound Volume</Label>
                <div className="px-3">
                  <Slider
                    value={[localSettings.soundVolume]}
                    onValueChange={(value) => updateSetting('soundVolume', value[0])}
                    max={100}
                    step={5}
                    disabled={!localSettings.soundEnabled}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0%</span>
                    <span>{localSettings.soundVolume}%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="visual" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base flex items-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Visual Effects</span>
                  </Label>
                  <p className="text-sm text-muted-foreground">Enable particle effects and animations</p>
                </div>
                <Switch
                  checked={localSettings.visualEffects}
                  onCheckedChange={(value) => updateSetting('visualEffects', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Particle Effects</Label>
                  <p className="text-sm text-muted-foreground">Show floating particles and auras</p>
                </div>
                <Switch
                  checked={localSettings.particleEffects}
                  onCheckedChange={(value) => updateSetting('particleEffects', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Reduced Motion</Label>
                  <p className="text-sm text-muted-foreground">Reduce animations for accessibility</p>
                </div>
                <Switch
                  checked={localSettings.reducedMotion}
                  onCheckedChange={(value) => updateSetting('reducedMotion', value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-base">Animation Speed</Label>
                <div className="px-3">
                  <Slider
                    value={[localSettings.animationSpeed]}
                    onValueChange={(value) => updateSetting('animationSpeed', value[0])}
                    min={25}
                    max={200}
                    step={25}
                    disabled={localSettings.reducedMotion}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Slow</span>
                    <span>{localSettings.animationSpeed}%</span>
                    <span>Fast</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="interface" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base flex items-center space-x-2">
                    {localSettings.showUI ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    <span>Show UI Elements</span>
                  </Label>
                  <p className="text-sm text-muted-foreground">Toggle visibility of interface elements</p>
                </div>
                <Switch
                  checked={localSettings.showUI}
                  onCheckedChange={(value) => updateSetting('showUI', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Show Roll History</Label>
                  <p className="text-sm text-muted-foreground">Display recent planet discoveries</p>
                </div>
                <Switch
                  checked={localSettings.showRollHistory}
                  onCheckedChange={(value) => updateSetting('showRollHistory', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Show Chance Meter</Label>
                  <p className="text-sm text-muted-foreground">Display probability indicators</p>
                </div>
                <Switch
                  checked={localSettings.showChanceMeter}
                  onCheckedChange={(value) => updateSetting('showChanceMeter', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">High Contrast</Label>
                  <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                </div>
                <Switch
                  checked={localSettings.highContrast}
                  onCheckedChange={(value) => updateSetting('highContrast', value)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={resetToDefaults}>
            Reset to Defaults
          </Button>
          <Button onClick={onClose}>
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;