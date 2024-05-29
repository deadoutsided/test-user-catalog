import { AppDispatch, /* AppThunk */ } from "../../utils/types";
import {
  GET_USERS_FAILED,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
} from "../constants/users-catalog";
import { TUserCatData } from "../reducers/users-catalog";
import { request } from "./api";

interface IGetUsersRequest {
  readonly type: typeof GET_USERS_REQUEST;
}

interface IGetUsersSuccess {
  readonly type: typeof GET_USERS_SUCCESS;
  readonly data: TUserCatData[];
}

interface IGetUsersFailed {
  readonly type: typeof GET_USERS_FAILED;
  readonly errorMessage: string;
}

export type TUsersCatActions =
  | IGetUsersRequest
  | IGetUsersSuccess
  | IGetUsersFailed;

const getUsersCatalogRequest = async () => {
  return await request('/users?per_page=8')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUsersCatalog: any/* AppThunk */ = () => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: GET_USERS_REQUEST })
    getUsersCatalogRequest()
    .then((res) => {
      dispatch({
        type: GET_USERS_SUCCESS,
        data: res.data,
      })
    })
    .catch((err) => dispatch({type: GET_USERS_FAILED, errorMessage: err.error}))
  }
}