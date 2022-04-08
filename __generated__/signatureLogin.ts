/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: signatureLogin
// ====================================================

export interface signatureLogin_signatureLogin_data_user {
  __typename: "SignatureLoginOutputUser";
  address: string;
  username: string | null;
  enabled: boolean;
}

export interface signatureLogin_signatureLogin_data {
  __typename: "SignatureLoginOutputData";
  accessToken: string;
  user: signatureLogin_signatureLogin_data_user;
}

export interface signatureLogin_signatureLogin {
  __typename: "SignatureLoginOutput";
  ok: boolean;
  error: string | null;
  data: signatureLogin_signatureLogin_data | null;
}

export interface signatureLogin {
  signatureLogin: signatureLogin_signatureLogin;
}

export interface signatureLoginVariables {
  address: string;
  signature: string;
}
