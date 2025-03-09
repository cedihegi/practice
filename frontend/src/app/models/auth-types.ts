export interface RegisterReponse {
  id: number;
  username: string;
  passwordHash: string;
}
export interface LoginResponse {
  token: string;
}
