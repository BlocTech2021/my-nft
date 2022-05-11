/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getRoomOfUser
// ====================================================

export interface getRoomOfUser_getRoomOfUser_data_assets {
  __typename: "Asset";
  id: string;
  roomId: string;
  userAddress: string;
  x: number;
  y: number;
  width: number;
  height: number;
  strokeWidth: number;
  strokeColor: string | null;
  spaceFillColor: string | null;
  spaceWidth: number | null;
  photoFrameUrl: string | null;
  shadow: number;
  openseaId: string;
  openseaName: string | null;
  openseaAssetContract: string;
  openseaTokenId: string;
  openseaImageUrl: string;
  openseaImageThumbnailUrl: string;
  assetType: string;
}

export interface getRoomOfUser_getRoomOfUser_data {
  __typename: "Room";
  id: string;
  isMain: boolean;
  backgroundColor: string | null;
  backgroundImage: string | null;
  userAddress: string;
  roomIconUrl: string | null;
  assets: getRoomOfUser_getRoomOfUser_data_assets[];
}

export interface getRoomOfUser_getRoomOfUser {
  __typename: "GetRoomOfUserOutput";
  ok: boolean;
  error: string | null;
  data: getRoomOfUser_getRoomOfUser_data | null;
}

export interface getRoomOfUser {
  getRoomOfUser: getRoomOfUser_getRoomOfUser;
}

export interface getRoomOfUserVariables {
  username: string;
}
