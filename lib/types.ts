
export type LoggedinUser = {
  user: User;
  accessToken: string;
}

export type User = {
  address: string;
  username: string;
  enabled: boolean;
}