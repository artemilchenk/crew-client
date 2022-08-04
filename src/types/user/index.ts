import { AppDispatch } from "../../store";

//---------User--------

export interface IUserBody {
  name: string | null;
  email?: string | null;
  password: string | null;
}


export interface IServerUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  instagram: string;
  facebook: string;
  about: string;
  location: string;
  role: string[];
  posts: string[];
  createdAt: Date;
  _id: string;
  __v: number;
}

export interface IUserRegisterResponse {
  user: IServerUser;
  message: string;
}

export interface IUserLoginResponse {
  user: IServerUser;
  token: string;
}


export interface ILogUser {
  body: IUserBody,
  setError: (arg: null | string) => void,
  setLoading: (arg: boolean) => void,
  setData: (arg: IUserLoginResponse | null) => void,
  dispatch: AppDispatch
}

export interface IGetUser {
  dispatch: AppDispatch;
}

//----------Post----------

export interface IPostBody {
  name: string | null;
  job: string | null;
  about: string | null;
}

export interface IServerPost {
  name: string,
  job: string,
  about: string,
  owner: string,
  search: string,
  comments: string[],
  createdAt: String,
  likes: string[]
  _id: string;
  __v: number;
}

export interface IGetPost {
  post: IServerPost;
}

export interface IPostRegisterResponse {
  post: IServerPost;
  message: string;
}

export interface IGetPosts {
  posts: IServerPost[];
  count: number;
}

//----------Profile----------

export interface IServerProfile {
  name: string;
  email: string;
  password: string;
  phone: string;
  instagram: string;
  facebook: string;
  about: string;
  location: string;
  role: string[];
  posts: string[];
  createdAt: Date;
  _id: string;
  __v: number;
}


export interface IProfileResponse {
  profile: IServerUser;
}

export interface IUpdateProfile {
  dispatch: AppDispatch,
  id: String,
  body: Partial<IServerUser>
}

//----------Comments----------

export interface IServerComment {
  text: string,
  owner: string,
  comments: string[],
  createdAt: string,
  targetId: string,
  likes: string[],
  _id: string;
  __v: number;
}


export interface IGetComments {
  comments: IServerComment[];
}