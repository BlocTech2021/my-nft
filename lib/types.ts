
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
  assets: Asset[];
}

export type Asset = {
  userAddress: string;
  roomId: string;
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  strokeWidth: number;
  strokeColor?: string;
  photoFrameUrl?: string;
  shadow: number;
  spaceFillColor?: string,
  spaceWidth?: number,
  openseaId: string;
  openseaName?: string;
  openseaTokenId: string;
  openseaAssetContract: string;
  openseaImageUrl: string;
  openseaImageThumbnailUrl: string;
}