interface AvatarCardProps {
  src: string;
  alt: string;
  name: string;
}


function AvatarCard({ src, alt, name }: AvatarCardProps) {
  return (
    <div className="avatar-card group">
      <div className="w-12 lg:w-28 rounded-full overflow-hidden">
        <img className="group-hover:scale-125 transition-all" src={src} alt={alt} />
      </div>
      <p className="text-white mt-5">{name}</p>
    </div>
  );
}

export default AvatarCard;