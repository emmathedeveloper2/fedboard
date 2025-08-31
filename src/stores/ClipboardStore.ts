import { create } from "zustand";

export type ClipboardItem = {
  id: string,
  type: 'text' | 'image',
  content: string,
  pinned: boolean
}

const useClipboardStore = create<{
  items: ClipboardItem[],
  searchText: string,
  setSearchText: (value: string) => void,
  addItem: (items: ClipboardItem) => void,
  togglePinnedItem: (id: string) => void,
  deletePinnedItem: (id: string) => void,
  clearClipboard: () => void,
}>((set) => ({
  items: JSON.parse(localStorage.getItem('items') ?? '[]'),
  searchText: '',
  setSearchText: (value: string) => set({ searchText: value }),
  addItem: (item: ClipboardItem) => set(state => {

    const found = state.items.find(i => i.content == item.content)

    if(found) return { items: [found , ...state.items.filter(i => i.id != found.id)] }

    return { items: [item , ...state.items] }
  }),
  togglePinnedItem: (id: string) => set(state => {

    const item = state.items.find(item => item.id == id)

    if(item) item.pinned = !item.pinned

    return { items: [...state.items] }
  }),
  deletePinnedItem: (id: string) => set(state => ({ items: state.items.filter(item => item.id != id) })),
  clearClipboard: () => set({ items: [] })
}))


export default useClipboardStore
