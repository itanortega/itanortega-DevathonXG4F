import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AvatarCard from "../components/AvatarCard";
import ModalGames from "../components/ModalGames";
import { useGameStore } from "../store/gameStore";
import { createRoom, joinRoom, offEvent, onGameStart, onJoinError, onRoomCreated, onRoomJoined, onRoomList, onRoomListUpdate,} from "../services/socketService";

import { ServerEmitEvents, type GameStartData, type JoinErrorData, type RoomInfo, type RoomJoinedData } from "../models/socketEvents";

const avatars = [
  { src: "ghost-avatar.png", alt: "Ghost", name: "Ghost" },
  { src: "pumpkin-avatar.png", alt: "Pumpkin", name: "Pumpkin" },
  { src: "witch-avatar.png", alt: "Witch Hat", name: "Witch Hat" },
  { src: "cat-avatar.png", alt: "Cat", name: "Black Cat" },
  { src: "skull-avatar.png", alt: "Skull", name: "Skull" },
  { src: "zombie-avatar.png", alt: "Zombie", name: "Zombie" },
];

const Lobby = () => {
  const navigate = useNavigate();
  const { username, setUsername, avatarUrl, setAvatarUrl, setCurrentRoomId, setSymbol } = useGameStore();
  const [selectedAvatarName, setSelectedAvatarName] = useState<string | null>(null);
  const [showGamesModal, setShowGamesModal] = useState<boolean>(false);
  const [avaiableGameList, setvaiableGameList] = useState<RoomInfo[] | null>(null)
  const lastRoomCreated = useRef<string | null>(null)
  const selectAvatar = (src: string, name: string) => {
    setSelectedAvatarName(name);
    setAvatarUrl(src);
    return src;
  };

 useEffect(() => {

  const handleRoomList = (data: RoomInfo[]) => {
    // logica para manejar la lista de salas
    setvaiableGameList(data)
  };

  const handleOnCreated = (data: { room_id: string }) => {
    lastRoomCreated.current = data.room_id
  }

  const handleRoomJoined = (data: RoomJoinedData) => {
    // logica para manejar los ingresos en las salas
  };

  const handleRoomListUpdate = (data: RoomInfo[]) => {
    // logica para manejar la actualizacion de la lista de salas
    setvaiableGameList(data)

  };

  const handleGameStart = (data: GameStartData) => {
    console.log("TENEMOS LOS 2 JUGADORES LISTOS")
    setCurrentRoomId(data.room_id)
    setSymbol(data.you_are)
    navigate("/board");
  };

  const handleJoinError = (data: JoinErrorData) => {
    // logica para manejar el error al entrar a una sala
  };

  onRoomList(handleRoomList);
  onRoomJoined(handleRoomJoined);
  onRoomListUpdate(handleRoomListUpdate);
  onGameStart(handleGameStart);
  onJoinError(handleJoinError);
  onRoomCreated(handleOnCreated)

  return () => {
    offEvent(ServerEmitEvents.ROOM_LIST, handleRoomList);
    offEvent(ServerEmitEvents.ROOM_JOINED, handleRoomJoined);
    offEvent(ServerEmitEvents.ROOM_LIST_UPDATE, handleRoomListUpdate);
    offEvent(ServerEmitEvents.GAME_START, handleGameStart);
    offEvent(ServerEmitEvents.JOIN_ERROR, handleJoinError);
    offEvent(ServerEmitEvents.ROOM_CREATED, handleOnCreated)

  };
}, []);

  const handleNewGame = () => {
    if (!username || !avatarUrl) {
      alert("Please enter a username and select an avatar.");
      return;
    }
    console.log(username, avatarUrl);
      createRoom()


  };

  const handleCloseGamesModal = () => {
    setShowGamesModal(!showGamesModal);
  };

  return (
    <>
      <ModalGames
        games={avaiableGameList}
        onJoinGame={(roomId: string) => joinRoom(roomId)}
        show={showGamesModal}
        onClose={handleCloseGamesModal}
      />
      <div className="wrap-lobby">
        <img
          src="assets/images/logo-devathon-translucent.png"
          alt="Devathon Logo"
          className="w-[250px]"
        />
        <div className="w-full flex flex-col items-center mt-10">
          <p className="text-white my-3 font-bold">Your Spooky Name</p>
          <input
            type="text"
            placeholder="Enter your name..."
            className="w-1/2 p-2 rounded-full bg-black/50 text-orange-500 text-2xl font-bold text-center shadow-sm"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="my-5 w-full flex flex-col items-center">
          <p className="text-white font-bold">Choose Your Ghoul</p>
          <div className="flex flex-wrap my-4 items-center justify-center gap-1 ">
            {avatars.map((avatar) => (
              <AvatarCard
                key={avatar.name}
                src={avatar.src}
                alt={avatar.alt}
                name={avatar.name}
                onSelect={selectAvatar}
                selected={selectedAvatarName === avatar.name}
              />
            ))}
          </div>
        </div>
        <div className="w-[70%] md:w-[20%] text-center mb-10 border-dashed border-orange-700 rounded-2xl p-2 flex items-center justify-center bg-black/40">
          <h4 className="text-gray-300 mr-3">Available Games: </h4>
          <h3 className="text-white text-2xl font-bold">{avaiableGameList?.length}</h3>
        </div>
        <div className="w-full flex flex-col gap-2 items-center justify-center">
          <button className="btn btn-primary" onClick={handleNewGame}>
            Create Game
          </button>
          <button className="btn btn-brown">Available Game</button>
          <button
            className="btn btn-outline"
            onClick={() => setShowGamesModal(true)}
          >
            Game List
          </button>
        </div>
      </div>
    </>
  );
};

export default Lobby;
