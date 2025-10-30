// src/services/socketService.ts
import { io, Socket } from "socket.io-client";
import {
  CliEvts,
  SrvEvts,
  type ClientEmitEvent,
  type GameStartData,
  type GameStateData,
  type InvalidMoveData,
  type JoinErrorData,
  type PlayerLeftData,
  type RoomInfo,
  type RoomJoinedData,
  type RoomListData,
  type RoomSummary,
  type ServerEmitEvent,
} from "../models/socketEvents";

const SOCKET_URL = import.meta.env.VITE_API_URL;

const socket: Socket = io(SOCKET_URL, {
  transports: ["websocket"],
  withCredentials: true,
  autoConnect: false,
});

export interface MakeMoveRequest {
  room_id: string;
  row: 0 | 1 | 2;
  col: 0 | 1 | 2;
  player: "X" | "O";
}

export const connectSocket = (): void => {
  if (!socket.connected) socket.connect();
  getRoomList()
};

export const disconnectSocket = (): void => {
  if (socket.connected) socket.disconnect();
};

export const emitEvent = (
  eventName: ClientEmitEvent,
  data?: unknown
): void => {
  console.log(`📤 Emitting: ${eventName}`, data);
  if (data !== undefined) {
    socket.emit(eventName, data);
  } else {
    socket.emit(eventName);
  }
};

export const createRoom = (roomName?: string) => {
  emitEvent(CliEvts.CREATE_ROOM, { room_name: roomName ?? "" });
};

export const joinRoom = (roomId: string) => {
  emitEvent(CliEvts.JOIN_ROOM_REQUEST, { room_id: roomId });
};

export const makeMove = (move: MakeMoveRequest) => {
  emitEvent(CliEvts.MAKE_MOVE, move);
};

export const getRoomList = () => {
  emitEvent(CliEvts.GET_ROOM_LIST);
  // socket.emit("get_room_list");
};

export const onRoomCreated = (callback: (data: { room_id: string }) => void) => {
  onEvent<{ room_id: string }>(SrvEvts.ROOM_CREATED, callback);
};

export const onRoomListUpdate = (callback: (data: RoomInfo[]) => void) => {
  onEvent<RoomInfo[]>(SrvEvts.ROOM_LIST_UPDATE, callback);
};

export const onGameStart = (callback: (data: GameStartData) => void) => {
  onEvent<GameStartData>(SrvEvts.GAME_START, callback);
};

export const onGameState = (callback: (data: GameStateData) => void) => {
  onEvent<GameStateData>(SrvEvts.GAME_STATE, callback);
};

export const onRoomJoined = (callback: (data: RoomJoinedData) => void) => {
  onEvent<RoomJoinedData>(SrvEvts.ROOM_JOINED, callback);
};

export const onRoomList = (callback: (data: RoomInfo[]) => void) => {
  onEvent<RoomListData>(SrvEvts.ROOM_LIST, callback);
};

export const onPlayerLeft = (callback: (data: PlayerLeftData) => void) => {
  onEvent<PlayerLeftData>(SrvEvts.PLAYER_LEFT, callback);
};

export const onInvalidMove = (callback: (data: InvalidMoveData) => void) => {
  onEvent<InvalidMoveData>(SrvEvts.INVALID_MOVE, callback);
};

export const onJoinError = (callback: (data: JoinErrorData) => void) => {
  onEvent<JoinErrorData>(SrvEvts.JOIN_ERROR, callback);
};

export const onEvent = <T = unknown>(
  eventName: ServerEmitEvent,
  callback: (data: T) => void
): void => {
  socket.on(eventName, callback);
};

export const offEvent = <T = unknown>(
  eventName: ServerEmitEvent,
  callback?: (data: T) => void
): void => {
  socket.off(eventName, callback);
};

export default socket;
