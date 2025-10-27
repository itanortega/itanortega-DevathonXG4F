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

    return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="relative w-[90%] lg:w-[0%] xl:w-[40%] flex flex-col items-center justify-center bg-black/50 border border-orange-400 rounded-3xl shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-primary/20 border-orange-400 w-full">
                <h2 className="font-display text-4xl text-primary text-orange-500">Join a Spooky Game</h2>
                <button className="text-white/70 hover:text-white" onClick={onClose}>
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
            <div className="w-full max-h-80 flex flex-col gap-2 p-4 border-b border-orange-400 overflow-y-auto">
                {games.length > 0 ? games.map((game) => (
                    <div key={game.id} className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                        <div className="flex flex-col">
                            <p className="text-base text-white/70">Host: <span className="font-bold text-white">{game.host}</span></p>
                            <p className="text-sm text-white/60">{game.players}/{game.maxPlayers} players</p>
                        </div>
                        <button 
                            className="flex h-10 min-w-[84px] items-center justify-center gap-2 rounded-3xl bg-primary px-4 text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 transition-colors"
                            onClick={() => onJoinGame(game.id)}
                        >
                            <span className="material-symbols-outlined text-base">skull</span>
                            <span>Join</span>
                        </button>
                    </div>
                )) : (      
                    <div className="flex items-center justify-center p-4 text-center">
                        <p className="text-white/60">No other games available. <br /> <button className="text-primary font-bold hover:underline">Start your own spooky match!</button></p>
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
}

export default ModalGames;