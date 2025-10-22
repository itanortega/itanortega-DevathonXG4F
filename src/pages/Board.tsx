import mockAvatar from '../assets/avatarImg.png'
import Player from "../components/Player";
import { useGameStore } from '../store/gameStore';


type BoardCell = "" | "X" | "O"
const mockTable: BoardCell[] = ["","X","","O","","","","O","X"]

const Board = () => {
  const { username, avatarUrl } = useGameStore();
  console.log("Board page - username:", username, "avatarUrl:", avatarUrl);

  return (
    <div className="wrap-lobby">
      <div className="w-full max-w-[1440px] flex justify-around items-center nosifer-regular">
        <Player name={username || 'Guest'} score={0} avatarUrl={`assets/images/${avatarUrl}`}/>
        <div className="grid grid-cols-3 grid-rows-3 gap-2 p-2 w-96 h-96 bg-[#0d0808]/50 border border-orange-400 rounded-xl">
          {mockTable.map((value, i) => (
            <div
              key={i}
              className="flex items-center justify-center border border-orange-500 text-3xl font-bold text-white rounded-lg cursor-pointer hover:bg-[#1a1212] transition-colors "
            >
              {value}
            </div>
          ))}
        </div>
        <Player name="player 2" score={1} avatarUrl={mockAvatar}/>
      </div>
    </div>
  );
};

export default Board;
