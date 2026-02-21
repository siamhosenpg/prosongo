import { create } from "zustand";
import { StoryType } from "@/types/storyType";

interface StoryViewerState {
  stories: StoryType[];
  currentIndex: number;
  isPlaying: boolean;

  setStories: (stories: StoryType[]) => void;
  setCurrentIndex: (index: number) => void;
  next: () => void;
  prev: () => void;
}

export const useStoryViewer = create<StoryViewerState>((set, get) => ({
  stories: [],
  currentIndex: 0,
  isPlaying: true,

  setStories: (stories) => set({ stories }),

  setCurrentIndex: (index) => set({ currentIndex: index }),

  next: () => {
    const { currentIndex, stories } = get();
    if (currentIndex < stories.length - 1) {
      set({ currentIndex: currentIndex + 1 });
    }
  },

  prev: () => {
    const { currentIndex } = get();
    if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1 });
    }
  },
}));
