import { create } from "zustand";

type GameStore = {
    username: string | null;
    avatarUrl: string | null;
    setUsername: (username: string) => void;
    setAvatarUrl: (avatarUrl: string) => void;
    resetUser: () => void;
    wins: number;
    losses: number;
    ties: number;
    incrementWins: () => void;
    incrementLosses: () => void;
    incrementTies: () => void;
    resetScores: () => void;
};

export const useGameStore = create<GameStore>((set) => ({
    username: null,
    avatarUrl: null,
    setUsername: (username) => set({ username }),
    setAvatarUrl: (avatarUrl) => set({ avatarUrl }),
    resetUser: () => set({ username: null, avatarUrl: null }),
    wins: 0,
    losses: 0,
    ties: 0,
    incrementWins: () => set((state) => ({ wins: state.wins + 1 })),
    incrementLosses: () => set((state) => ({ losses: state.losses + 1 })),
    incrementTies: () => set((state) => ({ ties: state.ties + 1 })),
    resetScores: () => set({ wins: 0, losses: 0, ties: 0 }),
}));
