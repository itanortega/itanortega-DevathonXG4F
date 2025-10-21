export default function AvatarCard({ src, alt, name }: { src: string; alt: string; name: string }) {
  return (
    <div className="avatar-card group">
      <div className="w-28 rounded-full overflow-hidden">
        <img className="group-hover:scale-125 transition-all" src={src} alt={alt} />
      </div>
      <p className="text-white mt-5">{name}</p>
    </div>
  );
}