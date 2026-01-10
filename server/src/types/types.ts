export type UserReq = {
  username: string;
  email: string;
  password: string;
};

export type LoginReq = {
  username: string;
  password: string;
};

export type CreatedUser = {
  id: string;
  username: string;
};

export type UserLogin = {
  id: string;
  username: string;
  email: string;
  password_hash: string;
};
