import { USER_STATE_CHANGE, USER_POST_STATE_CHANGE } from "../constants/index";

const initialState = {
  currentUser: null,
  post: [],
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser,
      };
  }
};
