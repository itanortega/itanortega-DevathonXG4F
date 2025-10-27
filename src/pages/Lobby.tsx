import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import AvatarCard from "../components/AvatarCard";
import ModalGames from "../components/ModalGames";
import { useGameStore } from "../store/gameStore";
import { connectSocket, onEvent, offEvent, disconnectSocket } from "../services/socketService";

import data from "../data/Games";

const Lobby = () => {
  const navigate = useNavigate();
  const [selectedGhost, setSelectedGhost] = useState<boolean>(false);
  const [selectedPumpkin, setSelectedPumpkin] = useState<boolean>(false);
  const [selectedWitch, setSelectedWitch] = useState<boolean>(false);
  const [selectedCat, setSelectedCat] = useState<boolean>(false);
  const [selectedSkull, setSelectedSkull] = useState<boolean>(false);
  const [selectedZombie, setSelectedZombie] = useState<boolean>(false);
  const [showGamesModal, setShowGamesModal] = useState<boolean>(false);
  const { username, setUsername, avatarUrl, setAvatarUrl } = useGameStore();
  const selectAvatar = (src: string, name: string) => {
    setSelectedGhost(name === "Ghost" ? true : false);
    setSelectedPumpkin(name === "Pumpkin" ? true : false);
    setSelectedWitch(name === "Witch Hat" ? true : false);
    setSelectedCat(name === "Black Cat" ? true : false);
    setSelectedSkull(name === "Skull" ? true : false);
    setSelectedZombie(name === "Zombie" ? true : false);
    setAvatarUrl(src);
    console.log(src, name);
    return src;
  };


  useEffect(() => {

    connectSocket();

    const handleConnect = () => {
      console.log("Conexión con el servidor");
    };

    onEvent("connect", handleConnect);

    return () => {
      offEvent("connect", handleConnect);
      disconnectSocket();
    };

    console.log(username);
  }, [username, selectedGhost, selectedPumpkin, selectedWitch, selectedCat, selectedSkull, selectedZombie]);

  const handleNewGame = () => {
    if (!username || !avatarUrl) {
      alert("Please enter a username and select an avatar.");
      return;
    } 
    console.log(username, avatarUrl);
    navigate("/board"); 
  };

  const handleJoinGame = (gameId: number) => {
    console.log(`Joining game with ID: ${gameId}`);
    //navigate("/board");
  };

  const handleCloseGamesModal = () => {
    setShowGamesModal(!showGamesModal);
  };



  return(
    <>
      <ModalGames games={data}  onJoinGame={handleJoinGame} show={showGamesModal} onClose={handleCloseGamesModal} />
    <div className="wrap-lobby">
      <img src="assets/images/logo-devathon-translucent.png" alt="Devathon Logo" className="w-[250px]" />
      <div className="w-full flex flex-col items-center mt-10">
        <p className="text-white my-3 font-bold">Your Spooky Name</p>
        <input 
          type="text" 
          placeholder="Enter your name..." 
          className="w-1/2 p-2 rounded-full bg-black/50 text-orange-500 text-2xl font-bold text-center shadow-sm"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)} onClick={(e => console.log(e.target))}
        />
      </div>
      <div className="my-5 w-full flex flex-col items-center">
        <p className="text-white font-bold">Choose Your Ghoul</p>
        <div className="flex flex-wrap my-4 items-center justify-center gap-1 ">
          <AvatarCard src="ghost-avatar.png" alt="Ghost" name="Ghost" onSelect={selectAvatar} selected={selectedGhost} />
          <AvatarCard src="pumpkin-avatar.png" alt="Pumpkin" name="Pumpkin" onSelect={selectAvatar} selected={selectedPumpkin} />
          <AvatarCard src="witch-avatar.png" alt="Witch" name="Witch Hat" onSelect={selectAvatar} selected={selectedWitch} />
          <AvatarCard src="cat-avatar.png" alt="Cat" name="Black Cat" onSelect={selectAvatar} selected={selectedCat} />
          <AvatarCard src="skull-avatar.png" alt="Skull" name="Skull" onSelect={selectAvatar} selected={selectedSkull} />
          <AvatarCard src="zombie-avatar.png" alt="Zombie" name="Zombie" onSelect={selectAvatar} selected={selectedZombie} />
        </div>
      </div>
      <div className="w-[70%] md:w-[20%] text-center mb-10 border-dashed border-orange-700 rounded-2xl p-2 flex items-center justify-center bg-black/40">
        <h4 className="text-gray-300 mr-3">Available Games: </h4>
        <h3 className="text-white text-2xl font-bold">12</h3>
      </div>
      <div className="w-full flex flex-col gap-2 items-center justify-center">
        <button className="btn btn-primary" onClick={handleNewGame}>Create Game</button>
        <button className="btn btn-brown">Available Game</button>
        <button className="btn btn-outline" onClick={ () => setShowGamesModal(true) }>Game List</button>
      </div>
    </div>
    </>
  )
};

export default Lobby
