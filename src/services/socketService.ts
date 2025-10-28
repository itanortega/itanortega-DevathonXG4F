// src/services/socketService.ts
import { io, Socket } from "socket.io-client";
import {
  ClientEmitEvents,
  ServerEmitEvents,
  type ClientEmitEvent,
  type GameStartData,
  type GameStateData,
  type InvalidMoveData,
  type JoinErrorData,
  type PlayerLeftData,
  type RoomJoinedData,
  type RoomListData,
  type RoomSummary,
  type ServerEmitEvent,
} from "../models/socketEvents";

const SOCKET_URL = "http://localhost:5000";

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
};

export const disconnectSocket = (): void => {
  if (socket.connected) socket.disconnect();
};

export const emitEvent = (
  eventName: ClientEmitEvent,
  data: unknown = {}
): void => {
  console.log(`📤 Emitting: ${eventName}`, data);
  socket.emit(eventName, data);
};

export const createRoom = (roomName?: string) => {
  emitEvent(ClientEmitEvents.CREATE_ROOM, { room_name: roomName ?? "" });
};

export const joinRoom = (roomId: string) => {
  emitEvent(ClientEmitEvents.JOIN_ROOM_REQUEST, { room_id: roomId });
};

export const makeMove = (move: MakeMoveRequest) => {
  emitEvent(ClientEmitEvents.MAKE_MOVE, move);
};

export const getRoomList = () => {
  emitEvent(ClientEmitEvents.GET_ROOM_LIST);
};

export const onRoomCreated = (
  callback: (data: { room_id: string }) => void
) => {
  onEvent<{ room_id: string }>(ServerEmitEvents.ROOM_CREATED, callback);
};

export const onRoomListUpdate = (callback: (data: RoomSummary[]) => void) => {
  onEvent<RoomSummary[]>(ServerEmitEvents.ROOM_LIST_UPDATE, callback);
};

export const onGameStart = (callback: (data: GameStartData) => void) => {
  onEvent<GameStartData>(ServerEmitEvents.GAME_START, callback);
};

export const onGameState = (callback: (data: GameStateData) => void) => {
  onEvent<GameStateData>(ServerEmitEvents.GAME_STATE, callback);
};

export const onRoomJoined = (callback: (data: RoomJoinedData) => void) => {
  onEvent<RoomJoinedData>(ServerEmitEvents.ROOM_JOINED, callback);
};

export const onRoomList = (callback: (data: RoomListData) => void) => {
  onEvent<RoomListData>(ServerEmitEvents.ROOM_LIST, callback);
};

export const onPlayerLeft = (callback: (data: PlayerLeftData) => void) => {
  onEvent<PlayerLeftData>(ServerEmitEvents.PLAYER_LEFT, callback);
};

export const onInvalidMove = (callback: (data: InvalidMoveData) => void) => {
  onEvent<InvalidMoveData>(ServerEmitEvents.INVALID_MOVE, callback);
};

export const onJoinError = (callback: (data: JoinErrorData) => void) => {
  onEvent<JoinErrorData>(ServerEmitEvents.JOIN_ERROR, callback);
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
