// Pagina index, primera al entrar a la App
import AvatarCard from "../components/AvatarCard";

const Lobby = () => {
  return(
    <div className="wrap-lobby">
      <img src="assets/images/logo-devathon-translucent.png" alt="Devathon Logo" className="w-[250px]" />
      <div className="w-full flex flex-col items-center mt-10">
        <p className="text-white my-3 font-bold">Your Spooky Name</p>
        <input 
          type="text" 
          placeholder="Enter your name..." 
          className="w-1/2 p-2 rounded-full bg-black/50 text-orange-500 text-2xl font-bold text-center shadow-sm"   
        />
      </div>
      <div className="my-5 w-full flex flex-col items-center">
        <p className="text-white font-bold">Choose Your Ghoul</p>
        <div className="flex flex-wrap my-4">
          <AvatarCard src="assets/images/ghost-avatar.png" alt="Ghost" name="Ghost" />
          <AvatarCard src="assets/images/pumpkin-avatar.png" alt="Pumpkin" name="Pumpkin" />
          <AvatarCard src="assets/images/witch-avatar.png" alt="Witch" name="Witch Hat" />
          <AvatarCard src="assets/images/cat-avatar.png" alt="Cat" name="Black Cat" />
          <AvatarCard src="assets/images/skull-avatar.png" alt="Skull" name="Skull" />
        </div>
      </div>
      <div className="w-[20%] text-center mb-10 border-dashed border-orange-700 rounded-2xl p-2 flex items-center justify-center bg-black/40">
        <h4 className="text-gray-300 mr-3">Available Games: </h4>
        <h3 className="text-white text-2xl font-bold">12</h3>
      </div>
      <div className="w-full flex flex-col gap-2 items-center justify-center">
        <button className="btn btn-primary">Create Game</button>
        <button className="btn btn-brown">Available Game</button>
        <button className="btn btn-outline">Game List</button>
      </div>
    </div>
  )
};

export default Lobby
