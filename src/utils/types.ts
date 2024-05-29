import { ActionCreator } from "redux";
import { store } from "../main";
import { ThunkAction } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from "react-redux";
import { TUserDataActions } from "../services/actions/user-data";
import { TUsersCatActions } from "../services/actions/users-catalog";

export interface IRegisterData  {
  name: string,
  email: string,
  password: string,
  passwordRepeat: string,
}

export interface ISignInData  {
  email: string,
  password: string,
}

export interface IRegisterResp {
  id: number,
  token: string,
}

export type TRegisterBody = Omit<IRegisterData, "passwordRepeat">

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
export type TApplicationActions = TUserDataActions | TUsersCatActions

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ActionCreator<
  ThunkAction<void, RootState, unknown, TApplicationActions>
>;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useDispatch: () => AppDispatch | AppThunk = dispatchHook;