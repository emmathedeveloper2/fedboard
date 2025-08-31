import { useEffect, useRef } from "react";
import CopiedItemBlock from "./components/CopiedItemBlock";
import SearchBar from "./components/SearchBar";
import useClipboardStore from "./stores/ClipboardStore";
import { readText } from "@tauri-apps/plugin-clipboard-manager";
import { LiaBroomSolid } from "react-icons/lia";
import { RiPushpinLine } from "react-icons/ri";


function App() {

const items = useClipboardStore((store) => store.items)
const addItem = useClipboardStore((store) => store.addItem)
const searchText = useClipboardStore(store => store.searchText)

const filteredItems = items.filter(item => item.content.toLowerCase().includes(searchText.toLowerCase()))

const timer = useRef<number>(0)

const readClipboard = () => {
  if(timer.current) {
    clearInterval(timer.current)
    timer.current = 0
    return
  }

  timer.current = setInterval(async () => {
    const content = await readText()

    addItem({ id: (new Date()).getTime().toString(), type: 'text' , content , pinned: false })
  } , 1000)
}

useEffect(() => {
  readClipboard()
} , [])

useEffect(() => {
  localStorage.setItem('items' , JSON.stringify(items.filter(item => item.pinned)))
} , [items])

  return (
    <main className="h-svh min-h-0 p-2 grid grid-rows-[auto_1fr_auto] gap-2 border-2 border-black">
      <div data-tauri-drag-region className="h-[50px] w-full bg-foreground text-background flex items-center justify-between px-2 *:select-none">
        <LiaBroomSolid size={24} className="cursor-pointer"/>
        <p className="text-[24px] font-bold pointer-events-none">{filteredItems.length} ITEM{ filteredItems.length == 1 ? '' : 'S' }</p>
        <RiPushpinLine size={24} className="cursor-pointer opacity-0"/>
      </div>
      <div className="overflow-scroll pr-2">
        {filteredItems.map((item , i) => (
          <CopiedItemBlock key={i} item={item}/>
        ))}
      </div>
      <SearchBar />
    </main>
  );
}

export default App;
