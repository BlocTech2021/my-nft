/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMainRoom
// ====================================================

export interface getMainRoom_getMainRoom_data_assets {
  __typename: "Asset";
  id: string;
  roomId: string;
  userAddress: string;
  x: number;
  y: number;
  width: number;
  height: number;
  photoFrameUrl: string | null;
  strokeWidth: number;
  strokeColor: string | null;
  spaceFillColor: string | null;
  spaceWidth: number | null;
  shadow: number;
  openseaId: string;
  openseaAssetContract: string;
  openseaTokenId: string;
  openseaImageUrl: string;
  openseaImageThumbnailUrl: string;
}

export interface getMainRoom_getMainRoom_data {
  __typename: "Room";
  id: string;
  isMain: boolean;
  backgroundColor: string | null;
  backgroundImage: string | null;
  userAddress: string;
  assets: getMainRoom_getMainRoom_data_assets[];
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
