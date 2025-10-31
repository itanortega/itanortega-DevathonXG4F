interface PlayerProps {
  name?: string;
  score: number;
  avatarUrl: string;
}

const Player = ({ name, score, avatarUrl }: PlayerProps) => {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div
        className="w-40 h-40 rounded-full border-2 border-white bg-cover bg-center"
        style={{ backgroundImage: `url(${avatarUrl})` }}
      ></div>
      <p className="text-white text-2xl">{name}</p>
      <p className="text-white text-4xl">score: {score}</p>
    </div>
  );
};

export default Player;
