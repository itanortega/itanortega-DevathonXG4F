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
    <div className={`avatar-card ${selected ? 'selected' : ''} group`} onClick={handleSelect}>
      <div className="w-12 lg:w-28 rounded-full overflow-hidden">
        <img className="group-hover:scale-125 transition-all" src={`assets/images/${src}`} alt={alt} />
      </div>
      <p className="text-white mt-5">{name}</p>
    </div>
  );
}

export default AvatarCard;