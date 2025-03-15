
export interface LoginResponse {
  token: string;
}

export interface UserInfo {
  id: number,
  username: string
}

type AuthStateNotLoggedIn = {
  logged_in: false
}

type AuthStateLoggedIn = {
  logged_in: true,
  id: number,
  username: string,
}

export type AuthState = AuthStateNotLoggedIn | AuthStateLoggedIn
