import { authConstants } from "../constants/authConstants";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.SIGNUP_REQUEST:
    case authConstants.SIGNIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case authConstants.SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case authConstants.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case authConstants.SIGNIN_FAIL:
    case authConstants.SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
