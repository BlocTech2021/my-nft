
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