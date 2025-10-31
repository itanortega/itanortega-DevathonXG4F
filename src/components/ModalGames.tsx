import React from "react";
import { type RoomInfo } from "../models/socketEvents";

interface ModalGamesProps {
  games: RoomInfo[] | null;
  onClose: () => void;
  onJoinGame: (roomId: string) => void;
  show: boolean;
}

function ModalGames({ games, onClose, onJoinGame, show }: ModalGamesProps) {
  if (!show) return null;

  const hasGames = games && games.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-[90%] xl:w-[40%] flex flex-col items-center justify-center bg-black/50 border border-orange-400 rounded-3xl shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-primary/20 border-orange-400 w-full">
          <h2 className="font-display text-4xl text-primary text-orange-500">
            Join a Spooky Game
          </h2>
          <button className="text-white/70 hover:text-white" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="w-full max-h-80 flex flex-col gap-2 p-4 border-b border-orange-400 overflow-y-auto">
          {hasGames ? (
            games!.map((game) => (
              <div
                key={game.room_id}
                className="flex items-center justify-between p-4 bg-black/30 rounded-lg"
              >
                <div className="flex flex-col">
                  <p className="text-base text-white/70">
                    Host:{" "}
                    <span className="font-bold text-white">
                      
                    </span>
                  </p>
                  <p className="text-sm text-white/60">
                    {game.player_count}/2 players
                  </p>
                </div>
                <button
                  className="flex h-10 min-w-[84px] items-center justify-center gap-2 rounded-3xl bg-orange-500 px-4 text-sm font-bold text-white hover:bg-orange-600 transition-colors"
                  onClick={() => onJoinGame(game.room_id)}
                >
                  <span className="material-symbols-outlined text-base">
                    skull
                  </span>
                  <span>Join</span>
                </button>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center p-4 text-center">
              <p className="text-white/60">
                No spooky rooms available.
                <br />
                <button className="text-orange-400 font-bold hover:underline">
                  Start your own haunted match!
                </button>
              </p>
            </div>
          )}
        </div>

        <div className="w-full flex items-center justify-center px-4 py-3">
          <button className="btn btn-brown w-full" onClick={onClose}>
            <span className="truncate">Close</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalGames;