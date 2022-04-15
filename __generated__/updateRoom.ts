/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateRoomInput, AssetEdit } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateRoom
// ====================================================

export interface updateRoom_updateRoom {
  __typename: "UpdateRoomOutput";
  ok: boolean;
  error: string | null;
}

export interface updateRoom {
  updateRoom: updateRoom_updateRoom;
}

export interface updateRoomVariables {
  roomId: string;
  roomInput?: UpdateRoomInput | null;
  assetsInput?: AssetEdit[] | null;
}
