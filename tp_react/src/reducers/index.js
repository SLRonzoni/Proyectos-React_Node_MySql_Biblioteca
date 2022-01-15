const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PERSONAS':
      return {
        ...state,
        personas: [...state.personas, action.payload]
      }
      break;
  
    default:
      return state;
      break;
  }
}
module.exports = reducer;