import * as React from "react";
import useClipboardStore, {
  type ClipboardItem,
} from "../stores/ClipboardStore";
import { LiaTrashAlt } from "react-icons/lia";
import { RiPushpinFill, RiPushpinLine } from "react-icons/ri";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";

interface CopiedItemBlockProps {
  item: ClipboardItem;
}

const CopiedItemBlock: React.FC<CopiedItemBlockProps> = ({ item }) => {
  const togglePinnedItem = useClipboardStore((store) => store.togglePinnedItem);
  const deletePinnedItem = useClipboardStore((store) => store.deletePinnedItem);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = async (e) => {

    if((e.target as HTMLElement).hasAttribute('data-box')) await writeText(item.content)
  };

  return (
    <div
      onClick={handleClick}
      data-box
      className="flex flex-col gap-4 h-min w-full bg-primary text-primary-foreground border-2 border-primary-foreground p-2 select-none rounded overflow-hidden mb-4"
    >
      <div className="flex items-center justify-end gap-4">

        <button onClick={_ => deletePinnedItem(item.id)}>
          <LiaTrashAlt className="cursor-pointer" size={20} />
        </button>

        <button onClick={(_) => togglePinnedItem(item.id)}>
          {item.pinned ? (
            <RiPushpinFill className="cursor-pointer" size={20} />
          ) : (
            <RiPushpinLine className="cursor-pointer" size={20} />
          )}
        </button>
      </div>
      <p className="pointer-events-none">{item.content}</p>
    </div>
  );
};

export default CopiedItemBlock;
