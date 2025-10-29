import { useState } from "react";
import mockAvatar from "../assets/avatarImg.png";
import Player from "../components/Player";
import { useGameStore } from "../store/gameStore";
import type { Board } from "../models/board";


const initialBoardState: Board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const Board = () => {
  const { username, avatarUrl } = useGameStore();
  const [board, setBoard] = useState(initialBoardState)
  console.log("Board page - username:", username, "avatarUrl:", avatarUrl);

  return (
    <div className="wrap-lobby">
      <div className="w-full max-w-[1440px] flex justify-around items-center nosifer-regular">
        <Player
          name={username || "Guest"}
          score={0}
          avatarUrl={`assets/images/${avatarUrl}`}
        />
        <div className="grid grid-cols-3 grid-rows-3 gap-2 p-2 w-96 h-96 bg-[#0d0808]/50 border border-orange-400 rounded-xl">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className="flex items-center justify-center border border-orange-500 text-3xl font-bold text-white rounded-lg cursor-pointer hover:bg-[#1a1212] transition-colors"
                data-row={rowIndex}
                data-col={colIndex}
                disabled={cell !== ""}
              >
                {cell}
              </button>
            ))
          )}
        </div>
        <Player name="player 2" score={1} avatarUrl={mockAvatar} />
      </div>
    </div>
  );
};

export default Board;
