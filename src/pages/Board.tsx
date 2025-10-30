import { useEffect, useState } from "react";
import mockAvatar from "../assets/avatarImg.png";
import Player from "../components/Player";
import { useGameStore } from "../store/gameStore";
import type { Board } from "../models/board";
import {
  makeMove,
  offEvent,
  onEvent,
  type MakeMoveRequest,
} from "../services/socketService";
import { SrvEvts, type GameStateData } from "../models/socketEvents";

const initialBoardState: Board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const Board = () => {
  const { username, avatarUrl, currentRoomId, symbol } = useGameStore();
  const [board, setBoard] = useState(initialBoardState);
  const [currentTurn, setCurrentTurn] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<"X" | "O" | null>(null)
  console.log("Board page - username:", username, "avatarUrl:", avatarUrl);

  const makeMoveHandler = (row: number, col: number) => {
    if (!currentRoomId || !symbol) return;
    if (board[row][col] !== "") return;
    if (currentTurn !== symbol) return

    const move: MakeMoveRequest = {
      room_id: currentRoomId,
      row: row as 0 | 1 | 2,
      col: col as 0 | 1 | 2,
      player: symbol,
    };

    console.log(move)

    makeMove(move);
  };

  useEffect(() => {
    // 🔹 Escuchar cuando el servidor envíe un nuevo estado de juego
    const handleGameState = ({board, current_turn, winner}: GameStateData) => {
      console.log(board, current_turn)
      console.log(winner)
      setBoard(board)
      setCurrentTurn(current_turn);
      if(winner !== null){
        setWinner(winner)
      }
    };

    onEvent(SrvEvts.GAME_STATE, handleGameState);

    return () => {
      offEvent(SrvEvts.GAME_STATE, handleGameState);
    };
  }, []);

  return (
    <div className="wrap-lobby">

      {!winner ? currentTurn === symbol ? (
        <p className="text-2xl">YOUR TURN</p>
      ): (
        <p className="text-2xl">OPPONENT'S TURN</p>
      ) : (
        <p className="text-2xl">winner: {winner}</p>
      )}
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
                onClick={() => makeMoveHandler(rowIndex,colIndex)}
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
