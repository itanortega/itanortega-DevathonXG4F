import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AvatarCard from "../components/AvatarCard";
import ModalGames from "../components/ModalGames";
import { useGameStore } from "../store/gameStore";
import {connectSocket, disconnectSocket, offEvent, onGameStart, onJoinError, onRoomJoined, onRoomList, onRoomListUpdate,} from "../services/socketService";

import data from "../data/Games";
import { ServerEmitEvents, type GameStartData, type JoinErrorData, type RoomJoinedData, type RoomListData, type RoomSummary } from "../models/socketEvents";

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
  const { username, setUsername, avatarUrl, setAvatarUrl } = useGameStore();
  const [selectedAvatarName, setSelectedAvatarName] = useState<string | null>(null);
  const [showGamesModal, setShowGamesModal] = useState<boolean>(false);
  const selectAvatar = (src: string, name: string) => {
    setSelectedAvatarName(name);
    setAvatarUrl(src);
    return src;
  };

 useEffect(() => {
  connectSocket();

  const handleRoomList = (data: RoomListData) => {
    // logica para manejar la lista de salas
  };

  const handleRoomJoined = (data: RoomJoinedData) => {
    // logica para manejar los ingresos en las salas
  };

  const handleRoomListUpdate = (data: RoomSummary[]) => {
    // logica para manejar la actualizacion de la lista de salas
  };

  const handleGameStart = (data: GameStartData) => {
    // logica para manejar el inicio de la partida
  };

  const handleJoinError = (data: JoinErrorData) => {
    // logica para manejar el error al entrar a una sala
  };

  onRoomList(handleRoomList);
  onRoomJoined(handleRoomJoined);
  onRoomListUpdate(handleRoomListUpdate);
  onGameStart(handleGameStart);
  onJoinError(handleJoinError);

  return () => {
    offEvent(ServerEmitEvents.ROOM_LIST, handleRoomList);
    offEvent(ServerEmitEvents.ROOM_JOINED, handleRoomJoined);
    offEvent(ServerEmitEvents.ROOM_LIST_UPDATE, handleRoomListUpdate);
    offEvent(ServerEmitEvents.GAME_START, handleGameStart);
    offEvent(ServerEmitEvents.JOIN_ERROR, handleJoinError);

    disconnectSocket();
  };
}, []);

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

  return (
    <>
      <ModalGames
        games={data}
        onJoinGame={handleJoinGame}
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
            onClick={(e) => console.log(e.target)}
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
          <h3 className="text-white text-2xl font-bold">12</h3>
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
