/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: getNonce
// ====================================================

export interface getNonce_getNonce {
  __typename: "GetNonceOutput";
  ok: boolean;
  error: string | null;
  address: string | null;
  messageToSign: string | null;
}

export interface getNonce {
  getNonce: getNonce_getNonce;
}

export interface getNonceVariables {
  address: string;
}
