import Link from "next/link";
import IconBoard from "../icons/IconBoard";
import useActiveBoard from "@/hooks/useActiveBoard";

function BoardsList() {
  const { boards, activeBoardId, setActiveBoard } = useActiveBoard();
  return (
    <ul>
      {boards.map((board) => {
        return (
          <li
            key={board.id}
            className={`heading-m text-grey-400 rounded-tr-[100px] rounded-br-[100px] ${
              activeBoardId === board.id
                ? "bg-purple-500 text-white  cursor-default"
                : "hover:cursor-pointer hover:bg-grey-200 dark:hover:bg-white hover:text-purple-500"
            }
                
                `}
          >
            <Link
              href={`/${board.id}`}
              className="py-3.75 pl-6 flex items-center gap-4 w-full h-full"
              onClick={() => setActiveBoard(board.id)}
            >
              <IconBoard className="w-4 h-4" />
              {board.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
export default BoardsList;
