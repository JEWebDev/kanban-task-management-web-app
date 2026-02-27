import Link from "next/link";
import IconBoard from "../icons/IconBoard";
import { Board } from "@/types/data";
interface BoardItemProps {
  board: Board;
  onClick: () => void;
  active: boolean;
}

function BoardItem({ board, active, onClick }: BoardItemProps) {
  return (
    <li
      className={`heading-m text-grey-400 rounded-tr-[100px] rounded-br-[100px] ${
        active
          ? "bg-purple-500 text-white  cursor-default"
          : "hover:cursor-pointer hover:bg-grey-200 dark:hover:bg-white hover:text-purple-500"
      }
                
        `}
    >
      <Link
        href={`/${board.id}`}
        className="py-3.75 pl-6 flex items-center gap-4 w-full h-full"
        onClick={onClick}
      >
        <IconBoard className="w-4 h-4" />
        {board.name}
      </Link>
    </li>
  );
}

export default BoardItem;
