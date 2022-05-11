/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAssetDetail
// ====================================================

export interface getAssetDetail_getAssetDetail_data_traits {
  __typename: "AssetTrait";
  traitType: string;
  value: string | null;
}

export interface getAssetDetail_getAssetDetail_data {
  __typename: "OpenseaAsset";
  openseaId: string;
  openseaName: string | null;
  openseaAssetContract: string;
  openseaTokenId: string;
  openseaImageUrl: string;
  openseaImageThumbnailUrl: string;
  description: string | null;
  traits: getAssetDetail_getAssetDetail_data_traits[] | null;
}

export interface getAssetDetail_getAssetDetail {
  __typename: "GetOpenseaAssetOutput";
  ok: boolean;
  error: string | null;
  data: getAssetDetail_getAssetDetail_data | null;
}

export interface getAssetDetail {
  getAssetDetail: getAssetDetail_getAssetDetail;
}

export interface getAssetDetailVariables {
  assetContractAddress: string;
  tokenId: string;
}
