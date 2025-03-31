import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SoundType } from '../utils/soundUtils';

export type BlindLevel = {
  id: number;
  smallBlind: number;
  bigBlind: number;
  ante: number;
  duration: number;
  isBreak?: boolean;
};

export interface Prize {
  id: number;
  position: number;
  type: 'JPY' | 'USD' | 'COIN' | 'TICKET' | 'ITEM';
  amount: number | string;
  description?: string;
}

interface DisplaySettings {
  backgroundColor: string;
  textColor: string;
  backgroundImage: string;
  backgroundImageOptions: {
    opacity: number;
    blur: number;
  };
  soundEnabled: boolean;
  warningSoundType: SoundType;
  levelChangeSoundType: SoundType;
}

interface PlayerState {
  initialPlayers: number;
  currentPlayers: number;
  rebuys: number;
  initialStack: number;
  playersOut: number;
}

export interface Tournament {
  id: string;
  name: string;
  createdAt: number;
  blindLevels: BlindLevel[];
}

export interface PokerState {
  currentTime: number;
  isRunning: boolean;
  blindLevels: BlindLevel[];
  currentLevel: number;
  displaySettings: DisplaySettings;
  tournamentName: string;
  savedTournaments: Tournament[];
  playerState: PlayerState;
  prizePool: Prize[];
  saveTournament: (name: string) => void;
  loadTournament: (id: string) => void;
  deleteTournament: (id: string) => void;
  setTournamentName: (name: string) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  nextLevel: () => void;
  previousLevel: () => void;
  getCurrentLevel: () => BlindLevel;
  updateDisplaySettings: (settings: Partial<DisplaySettings>) => void;
  updatePlayerState: (state: Partial<PlayerState>) => void;
  updatePrizePool: (prizes: Prize[]) => void;
  deleteBlindLevel: (id: number) => void;
  updateBlindLevels: (levels: BlindLevel[]) => void;
  addBreak: () => void;
  isBreak: boolean;
  nextBreakTime: number | null;
  getNextBreakTime: () => number;
  updateBlindLevel: (index: number, level: BlindLevel) => void;
  blinds: BlindLevel[];
  currentBlindIndex: number;
  decrementTimer: () => number;
  prizes: Prize[];
  updateSoundSettings: (warningSoundType: SoundType, levelChangeSoundType: SoundType) => void;
}

const initialBlindLevels: BlindLevel[] = [
  { id: 0, smallBlind: 100, bigBlind: 200, ante: 200, duration: 20, isBreak: false },
  { id: 1, smallBlind: 200, bigBlind: 300, ante: 300, duration: 20, isBreak: false },
  { id: 2, smallBlind: 200, bigBlind: 400, ante: 400, duration: 20, isBreak: false },
  { id: 3, smallBlind: 300, bigBlind: 500, ante: 500, duration: 20, isBreak: false },
  { id: 4, smallBlind: 300, bigBlind: 600, ante: 600, duration: 20, isBreak: false },
  { id: 5, smallBlind: 400, bigBlind: 800, ante: 800, duration: 20, isBreak: false },
  { id: 6, smallBlind: 500, bigBlind: 1000, ante: 1000, duration: 20, isBreak: false },
  { id: 7, smallBlind: 600, bigBlind: 1200, ante: 1200, duration: 20, isBreak: false },
  { id: 8, smallBlind: 1000, bigBlind: 1500, ante: 1500, duration: 20, isBreak: false },
  { id: 9, smallBlind: 1000, bigBlind: 2000, ante: 2000, duration: 20, isBreak: false },
  { id: 10, smallBlind: 1500, bigBlind: 2500, ante: 2500, duration: 20, isBreak: false },
  { id: 11, smallBlind: 1500, bigBlind: 3000, ante: 3000, duration: 20, isBreak: false },
  { id: 12, smallBlind: 2000, bigBlind: 4000, ante: 4000, duration: 20, isBreak: false },
  { id: 13, smallBlind: 2500, bigBlind: 5000, ante: 5000, duration: 20, isBreak: false },
  { id: 14, smallBlind: 3000, bigBlind: 6000, ante: 6000, duration: 20, isBreak: false },
  { id: 15, smallBlind: 4000, bigBlind: 8000, ante: 8000, duration: 20, isBreak: false },
  { id: 16, smallBlind: 5000, bigBlind: 10000, ante: 10000, duration: 20, isBreak: false },
  { id: 17, smallBlind: 6000, bigBlind: 12000, ante: 12000, duration: 20, isBreak: false },
  { id: 18, smallBlind: 10000, bigBlind: 15000, ante: 15000, duration: 20, isBreak: false },
  { id: 19, smallBlind: 10000, bigBlind: 20000, ante: 20000, duration: 20, isBreak: false },
  { id: 20, smallBlind: 15000, bigBlind: 25000, ante: 25000, duration: 20, isBreak: false },
  { id: 21, smallBlind: 15000, bigBlind: 30000, ante: 30000, duration: 20, isBreak: false },
  { id: 22, smallBlind: 20000, bigBlind: 40000, ante: 40000, duration: 20, isBreak: false },
  { id: 23, smallBlind: 25000, bigBlind: 50000, ante: 50000, duration: 20, isBreak: false }
];

const initialDisplaySettings: DisplaySettings = {
  backgroundColor: '#1a202c',
  textColor: '#ffffff',
  backgroundImage: '',
  backgroundImageOptions: {
    opacity: 0.5,
    blur: 0
  },
  soundEnabled: false,
  warningSoundType: SoundType.CASINO,
  levelChangeSoundType: SoundType.CASINO
};

const initialPlayerState: PlayerState = {
  initialPlayers: 0,
  currentPlayers: 0,
  rebuys: 0,
  initialStack: 20000,
  playersOut: 0,
};

const initialPrizePool: Prize[] = [
  { id: 1, position: 1, type: 'USD', amount: 0 },
  { id: 2, position: 2, type: 'USD', amount: 0 },
  { id: 3, position: 3, type: 'USD', amount: 0 },
];

const initialPrizePools = [
  { rank: '1st', amount: 0, type: 'money' },
  { rank: '2nd', amount: 0, type: 'money' },
  { rank: '3rd', amount: 0, type: 'money' },
];

export const usePokerStore = create<PokerState>()(
  persist(
    (set, get) => ({
      currentTime: 20 * 60,
      isRunning: false,
      currentLevel: 0,
      blindLevels: initialBlindLevels,
      savedTournaments: [],
      tournamentName: '',
      displaySettings: initialDisplaySettings,
      playerState: initialPlayerState,
      prizePool: initialPrizePool,
      prizePools: initialPrizePools,
      blinds: initialBlindLevels,
      currentBlindIndex: 0,
      prizes: [
        { id: 1, position: 1, amount: 0, type: 'USD' },
        { id: 2, position: 2, amount: 0, type: 'USD' },
        { id: 3, position: 3, amount: 0, type: 'USD' }
      ],
      isBreak: false,
      
      startTimer: () => set({ isRunning: true }),
      
      pauseTimer: () => set({ isRunning: false }),
      
      resetTimer: () => {
        const firstLevel = get().blindLevels[0];
        set({
          currentLevel: 0,
          currentTime: firstLevel.duration * 60,
          isRunning: false,
          prizes: [],
          isBreak: firstLevel.isBreak || false
        });
      },

      nextLevel: () => {
        const { currentLevel, blindLevels } = get();
        if (currentLevel < blindLevels.length - 1) {
          const nextIndex = currentLevel + 1;
          const nextLevel = blindLevels[nextIndex];
          set({ 
            currentLevel: nextIndex,
            currentTime: nextLevel.duration * 60,
            isBreak: nextLevel.isBreak || false,
            isRunning: true
          });
        }
      },

      previousLevel: () => {
        const { currentLevel, blindLevels } = get();
        if (currentLevel > 0) {
          const prevIndex = currentLevel - 1;
          const prevLevel = blindLevels[prevIndex];
          set({ 
            currentLevel: prevIndex,
            currentTime: prevLevel.duration * 60,
            isBreak: prevLevel.isBreak || false,
            isRunning: true
          });
        }
      },

      getCurrentLevel: () => {
        const { currentLevel, blindLevels } = get();
        return blindLevels[currentLevel];
      },

      saveTournament: (name) => {
        const { blindLevels, savedTournaments } = get();
        const newTournament = {
          id: Date.now().toString(),
          name,
          blindLevels: blindLevels.map((level, index) => ({
            ...level,
            id: index
          })),
          createdAt: Date.now(),
        };
        set({ savedTournaments: [...savedTournaments, newTournament] });
      },

      loadTournament: (id) => {
        const { savedTournaments } = get();
        const tournament = savedTournaments.find(t => t.id === id);
        if (tournament) {
          const firstLevel = tournament.blindLevels[0];
          set({
            blindLevels: tournament.blindLevels.map((level, index) => ({
              ...level,
              id: index
            })),
            currentLevel: 0,
            currentTime: firstLevel.duration * 60,
            isRunning: false,
            tournamentName: tournament.name,
            isBreak: firstLevel.isBreak || false
          });
        }
      },

      deleteTournament: (id) => {
        set(state => ({
          savedTournaments: state.savedTournaments.filter(t => t.id !== id)
        }));
      },

      setTournamentName: (name) => set({ tournamentName: name }),

      updatePlayerState: (state: Partial<PlayerState>) =>
        set((current) => ({
          playerState: { ...current.playerState, ...state }
        })),

      updateDisplaySettings: (settings: Partial<DisplaySettings>) =>
        set((state) => ({
          displaySettings: { ...state.displaySettings, ...settings },
        })),

      updatePrizePool: (prizes: Prize[]) => set({ 
        prizePool: prizes,
        prizes: prizes 
      }),

      deleteBlindLevel: (id: number) => {
        set((state) => {
          const filteredLevels = state.blindLevels.filter((_, index) => index !== id);
          
          const updatedLevels = filteredLevels.map((level, index) => ({
            ...level,
            id: index
          }));

          const newCurrentLevel = state.currentLevel >= updatedLevels.length 
            ? updatedLevels.length - 1 
            : state.currentLevel;

          return {
            blindLevels: updatedLevels,
            currentLevel: newCurrentLevel,
            currentTime: updatedLevels[newCurrentLevel]?.duration * 60 || 0,
            isBreak: updatedLevels[newCurrentLevel]?.isBreak || false
          };
        });
      },

      updateBlindLevels: (levels: BlindLevel[]) => {
        const newLevels = levels.map((level, index) => ({
          ...level,
          id: index,
          duration: level.duration || 15,
          isBreak: level.isBreak || false,
          smallBlind: level.isBreak ? 0 : level.smallBlind,
          bigBlind: level.isBreak ? 0 : level.bigBlind,
          ante: level.isBreak ? 0 : level.ante
        }));
        
        set({ 
          blindLevels: newLevels,
          blinds: newLevels,
          currentTime: newLevels[0]?.duration * 60 || 0,
          currentLevel: 0,
          isRunning: false,
          isBreak: newLevels[0]?.isBreak || false
        });
      },

      addBreak: () => {
        const { blindLevels } = get();
        const newBreak = {
          id: blindLevels.length,
          smallBlind: 0,
          bigBlind: 0,
          ante: 0,
          duration: 15,
          isBreak: true
        };

        const updatedLevels = [...blindLevels, newBreak].map((level, index) => ({
          ...level,
          id: index,
          smallBlind: level.isBreak ? 0 : level.smallBlind,
          bigBlind: level.isBreak ? 0 : level.bigBlind,
          ante: level.isBreak ? 0 : level.ante
        }));

        set({
          blindLevels: updatedLevels,
          blinds: updatedLevels,
          isBreak: false
        });
      },

      nextBreakTime: null,

      getNextBreakTime: () => {
        const { blindLevels, currentLevel, currentTime } = get();
        let totalTime = currentTime;
        
        for (let i = currentLevel + 1; i < blindLevels.length; i++) {
          if (blindLevels[i].isBreak) {
            return totalTime;
          }
          totalTime += blindLevels[i].duration * 60;
        }
        
        return -1;
      },

      updateBlindLevel: (index: number, level: BlindLevel) => {
        set((state) => {
          const newLevels = [...state.blindLevels];
          newLevels[index] = {
            ...level,
            id: index,
            smallBlind: level.isBreak ? 0 : level.smallBlind,
            bigBlind: level.isBreak ? 0 : level.bigBlind,
            ante: level.isBreak ? 0 : level.ante
          };
          return {
            blindLevels: newLevels,
            blinds: newLevels,
            isBreak: state.currentLevel === index ? level.isBreak || false : state.isBreak
          };
        });
      },

      decrementTimer: () => {
        const { currentTime, currentLevel, blindLevels } = get();
        if (currentTime > 0) {
          const newTime = currentTime - 1;
          set({ currentTime: newTime });
          if (newTime === 0) {
            const nextLevelIndex = currentLevel + 1;
            if (nextLevelIndex < blindLevels.length) {
              setTimeout(() => {
                set({
                  currentLevel: nextLevelIndex,
                  currentTime: blindLevels[nextLevelIndex].duration * 60,
                  isBreak: blindLevels[nextLevelIndex].isBreak || false
                });
              }, 1000);
            }
          }
          return newTime;
        }
        return currentTime;
      },

      updateSoundSettings: (warningSoundType: SoundType, levelChangeSoundType: SoundType) => {
        set((state) => ({
          displaySettings: {
            ...state.displaySettings,
            warningSoundType,
            levelChangeSoundType
          }
        }));
      },
    }),
    {
      name: 'poker-store-v10',
      partialize: (state) => {
        const displaySettings = {
          ...state.displaySettings,
          backgroundColor: state.displaySettings.backgroundColor,
          textColor: state.displaySettings.textColor,
          backgroundImage: state.displaySettings.backgroundImage || '',
          backgroundImageOptions: state.displaySettings.backgroundImageOptions || {
            opacity: 0.5,
            blur: 0
          }
        };

        if (displaySettings.backgroundImage) {
          const sizeKB = (displaySettings.backgroundImage.length / 1024).toFixed(2);
          console.log("保存する背景画像サイズ:", sizeKB + " KB");
          
          if (displaySettings.backgroundImage.length > 4 * 1024 * 1024) {
            console.error("背景画像サイズが4MB以上です。LocalStorageに保存できない可能性があります。");
          }
        }

        return {
          blindLevels: state.blindLevels,
          currentLevel: state.currentLevel,
          savedTournaments: state.savedTournaments,
          displaySettings,
          tournamentName: state.tournamentName,
          playerState: state.playerState,
          currentTime: state.currentTime,
          isBreak: state.isBreak,
          prizes: state.prizes
        };
      },
    }
  )
); 