const Reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'UPDATE_START':
      return {
        ...state,
        isFetching: true,
      };
    case 'UPDATE_SUCCESS':
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case 'UPDATE_FAILURE':
      return {
        user: state.user,
        isFetching: false,
        error: true,
      };
    default:
      return state;
  }
};

export default Reducer;
