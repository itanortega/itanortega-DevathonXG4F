// src/services/socketService.ts
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

const socket: Socket = io(SOCKET_URL, {
  transports: ["websocket"],
  withCredentials: true,
  autoConnect: false,
});

export const connectSocket = (): void => {
  if (!socket.connected) socket.connect();
};

export const disconnectSocket = (): void => {
  if (socket.connected) socket.disconnect();
};

export const emitEvent = (eventName: string, data: unknown = {}): void => {
  console.log(`📤 Emitting: ${eventName}`, data);
  socket.emit(eventName, data);
};

export const onEvent = (eventName: string, callback: (...args: unknown[]) => void): void => {
  socket.on(eventName, callback);
};

export const offEvent = (eventName: string, callback?: (...args: unknown[]) => void): void => {
  socket.off(eventName, callback);
};

export default socket;
