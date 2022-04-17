/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllFrameImages
// ====================================================

export interface getAllFrameImages_getAllFrameImages_data {
  __typename: "CloudinaryImage";
  cloudinaryId: string;
  publicId: string;
  thumbnailUrl: string;
  url: string;
}

export interface getAllFrameImages_getAllFrameImages {
  __typename: "GetFrameImagesOutput";
  ok: boolean;
  data: getAllFrameImages_getAllFrameImages_data[] | null;
}

export interface getAllFrameImages {
  getAllFrameImages: getAllFrameImages_getAllFrameImages;
}
