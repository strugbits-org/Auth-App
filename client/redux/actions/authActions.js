import { authConstants } from "../constants/authConstants";
import axios from "../../helpers/axiosConfig.js";

export const signup = (user) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: authConstants.SIGNUP_REQUEST,
      });
      const res = await axios.post("/users", user);
      if (res) {
        dispatch({
          type: authConstants.SIGNUP_SUCCESS,
        });
        return true;
      }
    } catch (err) {
      dispatch({
        type: authConstants.SIGNUP_FAIL,
        payload: err.response.data.message,
      });
    }
  };
};

// export const signin = (user) => {
//   return async (dispatch) => {
//     dispatch({
//       type: authConstants.SIGNIN_REQUEST,
//     });

//     try {
//       const res = await axios.post("/auth/login", user);
//       if (res) {
//         dispatch({
//           type: authConstants.SIGNIN_SUCCESS,
//           payload: res.data,
//         });
//         return res.data;
//       }
//     } catch (err) {
//       dispatch({
//         type: authConstants.SIGNIN_FAIL,
//         payload: err.response.data.message,
//       });
//     }
//   };
// };
