import mockAvatar from '../assets/avatarImg.png'
import Player from "../components/Player";


type BoardCell = "" | "X" | "O"
const mockTable: BoardCell[] = ["","X","","O","","","","O","X"]

const Board = () => {

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#231f1f] text-white nosifer-regular">
      <div className="w-full max-w-[1440px] flex justify-around items-center">
        <Player name="player 1" score={0} avatarUrl={mockAvatar}/>
        <div className="grid grid-cols-3 grid-rows-3 gap-2 p-2 w-96 h-96 bg-[#0d0808] border border-white rounded-xl">
          {mockTable.map((value, i) => (
            <div
              key={i}
              className="flex items-center justify-center border border-white text-3xl font-bold text-white rounded-lg cursor-pointer hover:bg-[#1a1212] transition-colors "
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
