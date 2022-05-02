/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createAsset
// ====================================================

export interface createAsset_createAsset_data {
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
  openseaName: string | null;
  openseaAssetContract: string;
  openseaTokenId: string;
  openseaImageUrl: string;
  openseaImageThumbnailUrl: string;
  assetType: string;
}

export interface createAsset_createAsset {
  __typename: "CreateAssetOutput";
  ok: boolean;
  error: string | null;
  data: createAsset_createAsset_data | null;
}

export interface createAsset {
  createAsset: createAsset_createAsset;
}

export interface createAssetVariables {
  roomId: string;
  width: number;
  height: number;
  openseaId: string;
  openseaName?: string | null;
  openseaAssetContract: string;
  openseaTokenId: string;
  openseaImageUrl: string;
  openseaImagePreviewUrl?: string | null;
  openseaImageThumbnailUrl: string;
  openseaImageOriginalUrl?: string | null;
  assetType: string;
}
