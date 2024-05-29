import { TUsersCatActions } from "../actions/users-catalog";
import { GET_USERS_FAILED, GET_USERS_REQUEST, GET_USERS_SUCCESS } from "../constants/users-catalog";


export type TUserCatData = {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string,
}

type TInitialUsersCatalogState = {
  usersData: TUserCatData[] | null;
  usersLoading: boolean;
  usersRequestError: boolean;
  errorMessage: string;
}

const initialState: TInitialUsersCatalogState = {
  usersData: null,
  usersLoading: false,
  usersRequestError: false,
  errorMessage: '',
}

export const usersCatalogReducer = (state: TInitialUsersCatalogState = initialState, action: TUsersCatActions): TInitialUsersCatalogState => {
  switch(action.type) {
    case GET_USERS_REQUEST: {
      return {
        ...state,
        usersLoading: true,
        usersRequestError: false,
        errorMessage: '',
      }
    }
    case GET_USERS_FAILED: {
      return {
        ...state,
        usersLoading: false,
        usersRequestError: true,
        errorMessage: action.errorMessage,
      }
    }
    case GET_USERS_SUCCESS: {
      return {
        ...state,
        usersLoading: false,
        usersRequestError: false,
        errorMessage: '',
        usersData: action.data,
      }
    }
    default: {
      return state
    }
  }
}