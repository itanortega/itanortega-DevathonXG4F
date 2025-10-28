export const ClientEmitEvents = {
  CREATE_ROOM: "create_room",
  JOIN_ROOM_REQUEST: "join_room_request",
  MAKE_MOVE: "make_move",
  GET_ROOM_LIST: "get_room_list",
} as const;

export type ClientEmitEvent =
  (typeof ClientEmitEvents)[keyof typeof ClientEmitEvents];

// export const ServerEmitEvents = {
//   ROOM_CREATED: "room_created",
//   ROOM_LIST_UPDATE: "room_list_update",
//   ROOM_JOINED: "room_joined",
//   GAME_START: "game_start",
//   GAME_STATE: "game_state",
//   INVALID_MOVE: "invalid_move",
//   PLAYER_LEFT: "player_left",
//   JOIN_ERROR: "join_error",
// } as const;

// export type ServerEmitEvent =
//   (typeof ServerEmitEvents)[keyof typeof ServerEmitEvents];
