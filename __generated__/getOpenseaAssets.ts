/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getOpenseaAssets
// ====================================================

export interface getOpenseaAssets_getOpenseaAssets_data_assets {
  __typename: "OpenseaAsset";
  openseaId: string;
  openseaName: string | null;
  openseaTokenId: string;
  openseaAssetContract: string;
  openseaImageUrl: string;
  openseaImagePreviewUrl: string | null;
  openseaImageOriginalUrl: string | null;
  openseaImageThumbnailUrl: string;
  assetType: string;
}

export interface getOpenseaAssets_getOpenseaAssets_data {
  __typename: "GetOpenseaAssetsData";
  previous: string | null;
  next: string | null;
  assets: getOpenseaAssets_getOpenseaAssets_data_assets[];
}

export interface getOpenseaAssets_getOpenseaAssets {
  __typename: "GetOpenseaAssetsOutput";
  ok: boolean;
  data: getOpenseaAssets_getOpenseaAssets_data | null;
}

export interface getOpenseaAssets {
  getOpenseaAssets: getOpenseaAssets_getOpenseaAssets;
}

export interface getOpenseaAssetsVariables {
  ownerAddress: string;
  cursor?: string | null;
}
