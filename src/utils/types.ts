
export type IRegisterData = {
  name: string,
  email: string,
  password: string,
  passwordRepeat: string,
}

export type IRegisterErrors = {
  name: boolean,
  email: boolean,
  password: boolean,
  passwordRepeat: boolean,
}

export interface IAuthorizeData {
  email: string,
  password: string,
}