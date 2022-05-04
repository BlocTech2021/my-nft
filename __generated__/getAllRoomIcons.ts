/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllRoomIcons
// ====================================================

export interface getAllRoomIcons_getAllRoomIcons_data {
  __typename: "CloudinaryImage";
  cloudinaryId: string;
  publicId: string;
  thumbnailUrl: string;
  url: string;
}

export interface getAllRoomIcons_getAllRoomIcons {
  __typename: "GetRoomIconsOutput";
  ok: boolean;
  data: getAllRoomIcons_getAllRoomIcons_data[] | null;
}

export interface getAllRoomIcons {
  getAllRoomIcons: getAllRoomIcons_getAllRoomIcons;
}
