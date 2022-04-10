/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMainRoom
// ====================================================

export interface getMainRoom_getMainRoom_data {
  __typename: "Room";
  id: string;
  isMain: boolean;
  backgroundColor: string | null;
  backgroundImage: string | null;
  userAddress: string;
}

export interface getMainRoom_getMainRoom {
  __typename: "GetMainRoomOutput";
  ok: boolean;
  error: string | null;
  data: getMainRoom_getMainRoom_data | null;
}

export interface getMainRoom {
  getMainRoom: getMainRoom_getMainRoom;
}
