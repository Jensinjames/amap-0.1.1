import { create } from 'zustand';
import { GeneratedContent } from '../lib/supabase';

interface ContentState {
  contents: GeneratedContent[];
  currentContent: GeneratedContent | null;
  loading: boolean;
  setContents: (contents: GeneratedContent[]) => void;
  setCurrentContent: (content: GeneratedContent | null) => void;
  addContent: (content: GeneratedContent) => void;
  updateContent: (id: string, updates: Partial<GeneratedContent>) => void;
  deleteContent: (id: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useContentStore = create<ContentState>((set, get) => ({
  contents: [],
  currentContent: null,
  loading: false,
  setContents: (contents) => set({ contents }),
  setCurrentContent: (content) => set({ currentContent: content }),
  addContent: (content) => set((state) => ({ 
    contents: [content, ...state.contents] 
  })),
  updateContent: (id, updates) => set((state) => ({
    contents: state.contents.map((content) =>
      content.id === id ? { ...content, ...updates } : content
    ),
    currentContent: state.currentContent?.id === id 
      ? { ...state.currentContent, ...updates }
      : state.currentContent
  })),
  deleteContent: (id) => set((state) => ({
    contents: state.contents.filter((content) => content.id !== id),
    currentContent: state.currentContent?.id === id ? null : state.currentContent
  })),
  setLoading: (loading) => set({ loading }),
}));