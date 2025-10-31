interface AvatarCardProps {
  src: string;
  alt: string;
  name: string;
  selected?: boolean;
  onSelect: (src: string, name: string) => string;
}

function AvatarCard({ src, alt, name, selected, onSelect }: AvatarCardProps) {
  const handleSelect = () => {
    onSelect(src, name);
  };

  return (
    <div
      className={`group relative aspect-square flex flex-col gap-2 items-center justify-center rounded-2xl transition-all duration-300 cursor-pointer ${
        selected
          ? "bg-gradient-to-br from-purple-600 to-purple-800 scale-105 shadow-lg shadow-purple-500/50 ring-4 ring-purple-400/50"
          : "bg-gradient-to-br from-orange-800/50 to-orange-900/50 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 border-2 border-orange-700/30"
      }`}
      onClick={handleSelect}
    >
      <img
        className="size-16 transition-transform"
        src={`assets/images/${src}`}
        alt={alt}
      />
      <p className="text-xs font-semibold text-orange-100">{name}</p>
    </div>
  );
}

export default AvatarCard;
