interface Game {
  host: string;
  players: number;
  maxPlayers: number;
  id: number;
}

interface ModalGamesProps {
  games: Game[];
  onClose: () => void;
  onJoinGame: (gameId: number) => void;
  show: boolean;
}

function ModalGames({ games, onClose, onJoinGame, show }: ModalGamesProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="flex flex-col gap-4 p-6 w-full max-w-lg bg-gradient-to-b from-orange-900/95 to-orange-950/95 backdrop-blur-sm border-2 border-orange-700/50 text-orange-10 rounded-lg shadow-2xl">
        {/* Header */}
        <div className="text-3xl text-center font-bold text-orange-400">
          Join a Spooky Game
        </div>

        {/* Game List */}
        <div className="max-h-96 space-y-2 overflow-y-auto mt-4 pr-2 scrollbar-thin! scrollbar-thumb-orange-700! scrollbar-track-orange-950/50!">
          {games.length > 0 ? (
            games.map((game) => (
              <div className="flex items-center justify-between p-4 bg-orange-950/50 border border-orange-700/30 rounded-lg hover:bg-orange-950/70 transition-colors">
                <div>
                  <p className="text-md font-bold text-orange-100">
                    {game.host}
                  </p>
                  <p className="text-sm text-orange-400">
                    {game.players}/{game.maxPlayers} Players
                  </p>
                </div>
                <button
                  className="font-bold text-sm bg-orange-500 hover:bg-orange-600 text-white transition-colors px-4 py-1.5 rounded-md"
                  onClick={() => onJoinGame(game.id)}
                >
                  Join
                </button>
              </div>
            ))
          ) : (
            <div className="p-4 bg-orange-950/50 border border-orange-700/30 rounded-lg">
              <p>There are no games available!</p>
              <button className="text-primary font-bold hover:underline">
                Start your own spooky match!
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="w-full">
          <button
            className="btn truncate font-bold  text-white bg-neutral-700 border-none hover:bg-neutral-600 !w-full"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalGames;
