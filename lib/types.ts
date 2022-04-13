
export type LoggedinUser = {
  user: User;
  accessToken: string;
}

export type User = {
  address: string;
  username: string;
  enabled: boolean;
}

export type Room = {
  id: string;
  isMain: boolean;
  backgroundColor?: string;
  backgroundImage?: string;
  userAddress: string;
}

export type Asset = {
  userAddress: string;
  id: string;
  openseaId: string;
  openseaName?: string;
  openseaTokenId: string;
  openseaAssetContract: string;
  openseaImageUrl: string;
  openseaImagePreviewUrl: string;
  openseaImageOriginalUrl: string;
  openseaImageThumbnailUrl: string;
}