import { deleteCookie, setCookie } from "../../utils/cookie";
import { AppDispatch, AppThunk, IRegisterResp, ISignInData, TRegisterBody } from "../../utils/types";
import {
  SIGN_IN_REQUEST,
  SIGN_IN_FAILED,
  SIGN_IN_SUCCESS,
  REGISTRATION_FAILED,
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  SET_LIKE_ARR,
  LOG_OUT_REQUEST,
  LOG_OUT_FAILED,
  LOG_OUT_SUCCESS,
} from "../constants/user-data";
import { request } from "./api";

interface IRegistrationRequest {
  readonly type: typeof REGISTRATION_REQUEST;
}

interface IRegistrationSuccess {
  readonly type: typeof REGISTRATION_SUCCESS;
  readonly data: IRegisterResp;
}

interface IRegistrationFailed {
  readonly type: typeof REGISTRATION_FAILED;
  readonly errorMessage: string;
}

interface ISignInRequest {
  readonly type: typeof SIGN_IN_REQUEST;
}

interface ISignInSuccess {
  readonly type: typeof SIGN_IN_SUCCESS;
  readonly token: string;
}

interface ISignInFailed {
  readonly type: typeof SIGN_IN_FAILED;
  readonly errorMessage: string;
}

interface ILogOutRequest{
  readonly type: typeof LOG_OUT_REQUEST
}

interface ILogOutFailed {
  readonly type: typeof LOG_OUT_FAILED
}

interface ILogOutSuccess {
  readonly type: typeof LOG_OUT_SUCCESS
}

interface ISetLike {
  readonly type: typeof SET_LIKE_ARR;
  readonly data: { id: number };
}

export type TUserDataActions =
  | IRegistrationRequest
  | IRegistrationSuccess
  | IRegistrationFailed
  | ISignInRequest
  | ISignInSuccess
  | ISignInFailed
  | ISetLike
  | ILogOutRequest
  | ILogOutFailed
  | ILogOutSuccess;

const registrationRequest = async (data: TRegisterBody) => {
  return await request("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  });
};

export const getRegistrationData: AppThunk = (data: TRegisterBody) => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: REGISTRATION_REQUEST });
    registrationRequest(data)
    .then((res) => {
      dispatch({
        type: REGISTRATION_SUCCESS,
        data: res,
      });
      if(res){
        setCookie('token', res.token);
      }
    })
    .catch(() => dispatch({type: REGISTRATION_FAILED}));
  }
}

const signInRequest = async (data: ISignInData) => {
  return await request("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  });
};

export const getSignInData: AppThunk = (data: TRegisterBody) => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: SIGN_IN_REQUEST });
    signInRequest(data)
    .then((res) => {
      dispatch({
        type: SIGN_IN_SUCCESS,
        data: res,
      });
      if(res){
        setCookie('token', res.token);
      }
    })
    .catch(() => dispatch({type: SIGN_IN_FAILED}));
  }
}

const logOutRequest = async () => {
  return await request("/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
};

export const logOutData: AppThunk = () => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: LOG_OUT_REQUEST });
    logOutRequest()
    .then((res) => {
      dispatch({
        type: LOG_OUT_SUCCESS,
        data: res,
      });
      if(res){
        deleteCookie('token');
      }
    })
    .catch(() => dispatch({type: LOG_OUT_FAILED}));
  }
}