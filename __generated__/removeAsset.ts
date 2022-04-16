/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: removeAsset
// ====================================================

export interface removeAsset_removeAsset_data {
  __typename: "Asset";
  id: string;
}

export interface removeAsset_removeAsset {
  __typename: "RemoveAssetOutput";
  ok: boolean;
  error: string | null;
  data: removeAsset_removeAsset_data | null;
}

export interface removeAsset {
  removeAsset: removeAsset_removeAsset;
}

export interface removeAssetVariables {
  roomId: string;
  id: string;
}
