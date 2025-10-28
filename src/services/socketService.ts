// src/services/socketService.ts
import { io, Socket } from "socket.io-client";
import { ClientEmitEvents, type ClientEmitEvent } from "../models/socketEvents";

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

export const emitEvent = (eventName: ClientEmitEvent, data: unknown = {}): void => {
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

export const onEvent = (
  eventName: string,
  callback: (...args: unknown[]) => void
): void => {
  socket.on(eventName, callback);
};

export const offEvent = (
  eventName: string,
  callback?: (...args: unknown[]) => void
): void => {
  socket.off(eventName, callback);
};

export default socket;
