import type { Board } from "./board";

export const CliEvts = {
  CREATE_ROOM: "create_room",
  JOIN_ROOM_REQUEST: "join_room_request",
  MAKE_MOVE: "make_move",
  GET_ROOM_LIST: "get_room_list",
} as const;

export type ClientEmitEvent =
  (typeof CliEvts)[keyof typeof CliEvts];

export const SrvEvts = {
  ROOM_CREATED: "room_created",
  ROOM_LIST_UPDATE: "room_list_update",
  ROOM_JOINED: "room_joined",
  GAME_START: "game_start",
  GAME_STATE: "game_state",
  ROOM_LIST: "room_list",
  INVALID_MOVE: "invalid_move",
  PLAYER_LEFT: "player_left",
  JOIN_ERROR: "join_error",
} as const;


export type ServerEmitEvent =
  (typeof SrvEvts)[keyof typeof SrvEvts];

export interface RoomSummary {
  room_id: string;
  status: "waiting" | "full";
  players: number;
}

export interface RoomInfo {
  room_id: string;
  player_count: number;
}

export interface GameStartData {
  room_id: string;
  you_are: "X" | "O";
}

export interface GameStateData {
  board: Board;
  current_turn: "X" | "O";
  winner: "X" | "O" | null;
  game_over: boolean;
}

interface RoomEventData {
  room_id: string;
}

export type RoomJoinedData = RoomEventData;
export type PlayerLeftData = RoomEventData;

interface ErrorEventData {
  error: string;
}

export type InvalidMoveData = ErrorEventData;
export type JoinErrorData = ErrorEventData;



export type RoomListData = RoomInfo[];
