/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllBackgroundImages
// ====================================================

export interface getAllBackgroundImages_getAllBackgroundImages_data {
  __typename: "CloudinayBackgroundImage";
  cloudinaryId: string;
  publicId: string;
  thumbnailUrl: string;
  url: string;
}

export interface getAllBackgroundImages_getAllBackgroundImages {
  __typename: "GetBackgroundImagesOutput";
  ok: boolean;
  data: getAllBackgroundImages_getAllBackgroundImages_data[] | null;
}

export interface getAllBackgroundImages {
  getAllBackgroundImages: getAllBackgroundImages_getAllBackgroundImages;
}
