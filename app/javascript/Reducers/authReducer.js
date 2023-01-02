import _ from "lodash";

const initialState = {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_CREDENTIALS":
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default authReducer;
