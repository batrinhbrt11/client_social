const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (following) => following !== action.payload
          ),
        },
      };

    case "EDIT_INFO":
      const newUser = action.payload;

      return {
        ...state,
        user: {
          ...state.user,
          username: newUser.username,
          city: newUser.city,
        },
      };
    case "EDIT_AVT": {
      const newUser = action.payload;
      console.log(newUser.profilePicture);
      return {
        ...state,
        user: {
          ...state.user,
          profilePicture: newUser.profilePicture,
        },
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
