import { TUserDataActions } from "../actions/user-data";
import { LOG_OUT_FAILED, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, REGISTRATION_FAILED, REGISTRATION_REQUEST, REGISTRATION_SUCCESS, SET_LIKE_ARR, SIGN_IN_FAILED, SIGN_IN_REQUEST, SIGN_IN_SUCCESS } from "../constants/user-data";

type TUserData = {
  id?: number | undefined;
  token?: string | undefined;
  likes?: number[] | undefined;
}

type TInitialUserDataState = {
  userData: TUserData | null;
  userLoading: boolean;
  userRequestError: boolean;
  errorMessage: string;
  authorized: boolean;
  registrationLoading: boolean;
  registrationError: boolean;
  logoutLoading: boolean;
  logoutError: boolean;
};

const initialState: TInitialUserDataState = {
  userData: null,
  userLoading: false,
  userRequestError: false,
  errorMessage: '',
  authorized: false,
  registrationLoading: false,
  registrationError: false,
  logoutLoading: false,
  logoutError: false,
};

export const userDataReducer = (state: TInitialUserDataState = initialState, action: TUserDataActions): TInitialUserDataState => {
  switch(action.type) {
    case SIGN_IN_REQUEST: {
      return {
        ...state,
        userLoading: true,
        userRequestError: false,
        errorMessage: '',
      }
    }
    case SIGN_IN_FAILED: {
      return {
        ...state,
        userLoading: false,
        userRequestError: true,
        errorMessage: action.errorMessage,
        authorized: false,
      }
    }
    case SIGN_IN_SUCCESS: {
      return {
        ...state,
        userLoading: false,
        userRequestError: false,
        errorMessage: '',
        authorized: true,
        userData: {token: action.token},
      }
    }
    case REGISTRATION_REQUEST: {
      return {
        ...state,
        errorMessage: '',
        registrationLoading: true,
        registrationError: false,
      }
    }
    case REGISTRATION_FAILED: {
      return {
        ...state,
        errorMessage: action.errorMessage,
        registrationLoading: false,
        registrationError: true,
      }
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        errorMessage: '',
        registrationLoading: false,
        registrationError: false,
        userData: {...action.data},
        authorized: true,
      }
    }
    case SET_LIKE_ARR: {
      const likesArr = state.userData?.likes === undefined ? [] : state.userData.likes;
      return {
        ...state,
        userData: {...state.userData, likes: [...likesArr, action.data.id]}
      }
    }
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        logoutLoading: true,
        logoutError: false
      }
    }
    case LOG_OUT_FAILED: {
      return {
        ...state,
        logoutLoading: false,
        logoutError: true
      }
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        logoutLoading: false,
        logoutError: false,
        userData: {id: -1, token: ''},
        authorized: false
      }
    }
    default: {
      return state;
    }
  }
}
