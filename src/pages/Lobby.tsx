import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AvatarCard from "../components/AvatarCard";
import ModalGames from "../components/ModalGames";
import { useGameStore } from "../store/gameStore";
import {
  connectSocket,
  disconnectSocket,
  offEvent,
  onGameStart,
  onJoinError,
  onRoomJoined,
  onRoomList,
  onRoomListUpdate,
} from "../services/socketService";

import data from "../data/Games";
import {
  ServerEmitEvents,
  type GameStartData,
  type JoinErrorData,
  type RoomJoinedData,
  type RoomListData,
  type RoomSummary,
} from "../models/socketEvents";

const avatars = [
  { src: "ghost-avatar.png", alt: "Ghost", name: "Ghost" },
  { src: "pumpkin-avatar.png", alt: "Pumpkin", name: "Pumpkin" },
  { src: "witch-avatar.png", alt: "Witch Hat", name: "Hat" },
  { src: "cat-avatar.png", alt: "Cat", name: "Cat" },
  { src: "skull-avatar.png", alt: "Skull", name: "Skull" },
  { src: "zombie-avatar.png", alt: "Zombie", name: "Zombie" },
];

const Lobby = () => {
  const navigate = useNavigate();
  const { username, setUsername, avatarUrl, setAvatarUrl } = useGameStore();
  const [selectedAvatarName, setSelectedAvatarName] = useState<string | null>(
    null,
  );
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
      <div className="w-full max-w-3xl flex flex-col items-center space-y-8 sm:rounded-lg bg-gradient-to-b from-orange-900/50 to-orange-950/50 sm:border-2 border-orange-700/50 backdrop-blur-sm shadow-2xl py-8 px-6">
        <img
          src="assets/images/logo-devathon-translucent.png"
          alt="Devathon Logo"
          className="w-[250px]"
        />

        <div className="w-full flex flex-col space-y-3 items-center">
          <p className="text-white font-bold text-lg">Your Spooky Name</p>
          <input
            type="text"
            placeholder="Enter your name..."
            className="w-full placeholder:text-orange-300 max-w-md p-2 rounded-lg bg-orange-950/90 text-orange-500 font-bold text-center shadow-sm"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
            onClick={(e) => console.log(e.target)}
          />
        </div>

        <div className="w-full flex flex-col items-center">
          <p className="text-white font-bold text-lg">Choose Your Ghoul</p>
          <div className="w-full my-4 grid grid-cols-3 sm:grid-cols-6 items-center justify-center gap-3">
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

        <div className="w-full flex flex-col items-center">
          <div className="w-fit text-center mb-10 border-dashed border-orange-700 rounded-lg px-6 py-2 flex flex-col items-center justify-center bg-orange-950/90">
            <h4 className="text-orange-300">Available Games</h4>
            <h3 className="text-white text-2xl font-bold">12</h3>
          </div>
          <div className="w-full flex flex-col sm:flex-row gap-2 items-center justify-center">
            <button className="btn btn-primary" onClick={handleNewGame}>
              Create Game
            </button>
            <button className="btn btn-brown">Join Random Game</button>
            <button
              className="btn btn-outline"
              onClick={() => setShowGamesModal(true)}
            >
              Games List
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lobby;
