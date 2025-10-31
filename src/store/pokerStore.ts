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

export interface TournamentTemplate {
  id: string;
  name: string;
  description: string;
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
  updateAllBlindTimes: (time: number) => void;
  applyTournamentTemplate: (template: TournamentTemplate) => void;
  addBreak: () => void;
  isBreak: boolean;
  nextBreakTime: number | null;
  getNextBreakTime: () => number;
  updateBlindLevel: (index: number, level: BlindLevel) => void;
  blinds: BlindLevel[];
  currentBlindIndex: number;
  decrementTimer: () => number;
  updateSoundSettings: (warningSoundType: SoundType, levelChangeSoundType: SoundType) => void;
  resetPlayerState: () => void;
  resetPrizePool: () => void;
}

const initialBlindLevels: BlindLevel[] = [
  { id: 0, smallBlind: 100, bigBlind: 200, ante: 200, duration: 15, isBreak: false },
  { id: 1, smallBlind: 200, bigBlind: 300, ante: 300, duration: 15, isBreak: false },
  { id: 2, smallBlind: 300, bigBlind: 500, ante: 500, duration: 15, isBreak: false },
  { id: 3, smallBlind: 500, bigBlind: 1000, ante: 1000, duration: 7, isBreak: false },
  { id: 4, smallBlind: 1000, bigBlind: 1500, ante: 1500, duration: 7, isBreak: false },
  { id: 5, smallBlind: 1000, bigBlind: 2000, ante: 2000, duration: 7, isBreak: false },
  { id: 6, smallBlind: 1500, bigBlind: 3000, ante: 3000, duration: 7, isBreak: false },
  { id: 7, smallBlind: 2000, bigBlind: 4000, ante: 4000, duration: 7, isBreak: false },
  { id: 8, smallBlind: 3000, bigBlind: 6000, ante: 6000, duration: 7, isBreak: false },
  { id: 9, smallBlind: 4000, bigBlind: 8000, ante: 8000, duration: 7, isBreak: false },
  { id: 10, smallBlind: 5000, bigBlind: 10000, ante: 10000, duration: 30, isBreak: false },
  { id: 11, smallBlind: 10000, bigBlind: 15000, ante: 15000, duration: 30, isBreak: false },
  { id: 12, smallBlind: 10000, bigBlind: 20000, ante: 20000, duration: 30, isBreak: false }
];

// トーナメントテンプレート
const tournamentTemplates: TournamentTemplate[] = [
  {
    id: 'turbo-100',
    name: 'ターボ100',
    description: '100/200から始まるターボトーナメント（120分想定）',
    blindLevels: [
      { id: 0, smallBlind: 100, bigBlind: 200, ante: 200, duration: 15, isBreak: false },
      { id: 1, smallBlind: 200, bigBlind: 300, ante: 300, duration: 15, isBreak: false },
      { id: 2, smallBlind: 300, bigBlind: 500, ante: 500, duration: 15, isBreak: false },
      { id: 3, smallBlind: 500, bigBlind: 1000, ante: 1000, duration: 7, isBreak: false },
      { id: 4, smallBlind: 1000, bigBlind: 1500, ante: 1500, duration: 7, isBreak: false },
      { id: 5, smallBlind: 1000, bigBlind: 2000, ante: 2000, duration: 7, isBreak: false },
      { id: 6, smallBlind: 1500, bigBlind: 3000, ante: 3000, duration: 7, isBreak: false },
      { id: 7, smallBlind: 2000, bigBlind: 4000, ante: 4000, duration: 7, isBreak: false },
      { id: 8, smallBlind: 3000, bigBlind: 6000, ante: 6000, duration: 7, isBreak: false },
      { id: 9, smallBlind: 4000, bigBlind: 8000, ante: 8000, duration: 7, isBreak: false },
      { id: 10, smallBlind: 5000, bigBlind: 10000, ante: 10000, duration: 30, isBreak: false },
      { id: 11, smallBlind: 10000, bigBlind: 15000, ante: 15000, duration: 30, isBreak: false },
      { id: 12, smallBlind: 10000, bigBlind: 20000, ante: 20000, duration: 30, isBreak: false }
    ]
  },
  {
    id: 'turbo-10',
    name: 'ターボ10',
    description: '10/20から始まるターボトーナメント（120分想定）',
    blindLevels: [
      { id: 0, smallBlind: 10, bigBlind: 20, ante: 20, duration: 15, isBreak: false },
      { id: 1, smallBlind: 20, bigBlind: 30, ante: 30, duration: 15, isBreak: false },
      { id: 2, smallBlind: 30, bigBlind: 50, ante: 50, duration: 15, isBreak: false },
      { id: 3, smallBlind: 50, bigBlind: 100, ante: 100, duration: 7, isBreak: false },
      { id: 4, smallBlind: 100, bigBlind: 150, ante: 150, duration: 7, isBreak: false },
      { id: 5, smallBlind: 100, bigBlind: 200, ante: 200, duration: 7, isBreak: false },
      { id: 6, smallBlind: 150, bigBlind: 300, ante: 300, duration: 7, isBreak: false },
      { id: 7, smallBlind: 200, bigBlind: 400, ante: 400, duration: 7, isBreak: false },
      { id: 8, smallBlind: 300, bigBlind: 600, ante: 600, duration: 7, isBreak: false },
      { id: 9, smallBlind: 400, bigBlind: 800, ante: 800, duration: 7, isBreak: false },
      { id: 10, smallBlind: 500, bigBlind: 1000, ante: 1000, duration: 30, isBreak: false },
      { id: 11, smallBlind: 1000, bigBlind: 1500, ante: 1500, duration: 30, isBreak: false },
      { id: 12, smallBlind: 1000, bigBlind: 2000, ante: 2000, duration: 30, isBreak: false }
    ]
  },
  {
    id: 'turbo-1',
    name: 'ターボ1',
    description: '1/2から始まるターボトーナメント（120分想定）',
    blindLevels: [
      { id: 0, smallBlind: 1, bigBlind: 2, ante: 2, duration: 15, isBreak: false },
      { id: 1, smallBlind: 2, bigBlind: 3, ante: 3, duration: 15, isBreak: false },
      { id: 2, smallBlind: 3, bigBlind: 5, ante: 5, duration: 15, isBreak: false },
      { id: 3, smallBlind: 5, bigBlind: 10, ante: 10, duration: 7, isBreak: false },
      { id: 4, smallBlind: 10, bigBlind: 15, ante: 15, duration: 7, isBreak: false },
      { id: 5, smallBlind: 10, bigBlind: 20, ante: 20, duration: 7, isBreak: false },
      { id: 6, smallBlind: 15, bigBlind: 30, ante: 30, duration: 7, isBreak: false },
      { id: 7, smallBlind: 20, bigBlind: 40, ante: 40, duration: 7, isBreak: false },
      { id: 8, smallBlind: 30, bigBlind: 60, ante: 60, duration: 7, isBreak: false },
      { id: 9, smallBlind: 40, bigBlind: 80, ante: 80, duration: 7, isBreak: false },
      { id: 10, smallBlind: 50, bigBlind: 100, ante: 100, duration: 30, isBreak: false },
      { id: 11, smallBlind: 100, bigBlind: 150, ante: 150, duration: 30, isBreak: false },
      { id: 12, smallBlind: 100, bigBlind: 200, ante: 200, duration: 30, isBreak: false }
    ]
  },
  {
    id: 'long-structure',
    name: 'ロングストラクチャー',
    description: '100/200から始まる店舗用ロングストラクチャー',
    blindLevels: [
      { id: 0, smallBlind: 100, bigBlind: 200, ante: 0, duration: 20, isBreak: false },
      { id: 1, smallBlind: 200, bigBlind: 400, ante: 0, duration: 20, isBreak: false },
      { id: 2, smallBlind: 300, bigBlind: 600, ante: 0, duration: 20, isBreak: false },
      { id: 3, smallBlind: 500, bigBlind: 1000, ante: 0, duration: 20, isBreak: false },
      { id: 4, smallBlind: 800, bigBlind: 1600, ante: 0, duration: 20, isBreak: false },
      { id: 5, smallBlind: 1200, bigBlind: 2400, ante: 0, duration: 20, isBreak: false },
      { id: 6, smallBlind: 2000, bigBlind: 4000, ante: 0, duration: 20, isBreak: false },
      { id: 7, smallBlind: 3000, bigBlind: 6000, ante: 0, duration: 20, isBreak: false },
      { id: 8, smallBlind: 5000, bigBlind: 10000, ante: 0, duration: 20, isBreak: false },
      { id: 9, smallBlind: 8000, bigBlind: 16000, ante: 0, duration: 20, isBreak: false },
      { id: 10, smallBlind: 12000, bigBlind: 24000, ante: 0, duration: 20, isBreak: false },
      { id: 11, smallBlind: 20000, bigBlind: 40000, ante: 0, duration: 20, isBreak: false },
      { id: 12, smallBlind: 30000, bigBlind: 60000, ante: 0, duration: 20, isBreak: false },
      { id: 13, smallBlind: 50000, bigBlind: 100000, ante: 0, duration: 20, isBreak: false },
      { id: 14, smallBlind: 80000, bigBlind: 160000, ante: 0, duration: 20, isBreak: false },
      { id: 15, smallBlind: 120000, bigBlind: 240000, ante: 0, duration: 20, isBreak: false },
      { id: 16, smallBlind: 200000, bigBlind: 400000, ante: 0, duration: 20, isBreak: false },
      { id: 17, smallBlind: 300000, bigBlind: 600000, ante: 0, duration: 20, isBreak: false },
      { id: 18, smallBlind: 500000, bigBlind: 1000000, ante: 0, duration: 20, isBreak: false },
      { id: 19, smallBlind: 800000, bigBlind: 1600000, ante: 0, duration: 20, isBreak: false },
      { id: 20, smallBlind: 1200000, bigBlind: 2400000, ante: 0, duration: 20, isBreak: false },
      { id: 21, smallBlind: 2000000, bigBlind: 4000000, ante: 0, duration: 20, isBreak: false },
      { id: 22, smallBlind: 3000000, bigBlind: 6000000, ante: 0, duration: 20, isBreak: false },
      { id: 23, smallBlind: 5000000, bigBlind: 10000000, ante: 0, duration: 20, isBreak: false },
      { id: 24, smallBlind: 8000000, bigBlind: 16000000, ante: 0, duration: 20, isBreak: false },
      { id: 25, smallBlind: 12000000, bigBlind: 24000000, ante: 0, duration: 20, isBreak: false },
      { id: 26, smallBlind: 20000000, bigBlind: 40000000, ante: 0, duration: 20, isBreak: false },
      { id: 27, smallBlind: 30000000, bigBlind: 60000000, ante: 0, duration: 20, isBreak: false },
      { id: 28, smallBlind: 50000000, bigBlind: 100000000, ante: 0, duration: 20, isBreak: false },
      { id: 29, smallBlind: 80000000, bigBlind: 160000000, ante: 0, duration: 20, isBreak: false },
      { id: 30, smallBlind: 120000000, bigBlind: 240000000, ante: 0, duration: 20, isBreak: false }
    ]
  }
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
  initialStack: 30000,
  playersOut: 0,
};

const initialPrizePool: Prize[] = [
  { id: 1, position: 1, type: 'JPY', amount: 0 },
  { id: 2, position: 2, type: 'JPY', amount: 0 },
  { id: 3, position: 3, type: 'JPY', amount: 0 },
];


export const usePokerStore = create<PokerState>()(
  persist(
    (set, get) => ({
      currentTime: 15 * 60,
      isRunning: false,
      currentLevel: 0,
      blindLevels: initialBlindLevels,
      savedTournaments: [],
      tournamentName: '',
      displaySettings: initialDisplaySettings,
      playerState: initialPlayerState,
      prizePool: initialPrizePool,
      blinds: initialBlindLevels,
      currentBlindIndex: 0,
      isBreak: false,
      
      startTimer: () => set({ isRunning: true }),
      
      pauseTimer: () => set({ isRunning: false }),
      
      resetTimer: () => {
        const firstLevel = get().blindLevels[0];
        set({
          currentLevel: 0,
          currentTime: firstLevel.duration * 60,
          isRunning: false,
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
        prizePool: prizes
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
          duration: level.duration || 0, // デフォルト値を15から0に変更
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

      updateAllBlindTimes: (time: number) => {
        set((state) => {
          const updatedLevels = state.blindLevels.map(level => ({
            ...level,
            duration: time
          }));
          
          return {
            blindLevels: updatedLevels,
            blinds: updatedLevels,
            currentTime: state.currentLevel === 0 ? time * 60 : state.currentTime
          };
        });
      },

      applyTournamentTemplate: (template: TournamentTemplate) => {
        set((state) => {
          const newLevels = template.blindLevels.map((level, index) => ({
            ...level,
            id: index
          }));
          
          return {
            blindLevels: newLevels,
            blinds: newLevels,
            currentLevel: 0,
            currentTime: newLevels[0]?.duration * 60 || 0,
            isRunning: false,
            isBreak: newLevels[0]?.isBreak || false
          };
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

      resetPlayerState: () => {
        set({ playerState: initialPlayerState });
      },

      resetPrizePool: () => {
        set({ 
          prizePool: initialPrizePool
        });
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
          prizePool: state.prizePool
        };
      },
    }
  )
); 