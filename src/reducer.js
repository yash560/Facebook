export const initialState = {
  user: null,
  basket: [],
};
export const totalprice = (basket) =>
  basket?.reduce(
    (previousValue, currentValue) =>
      parseInt(currentValue.itemPrice) + previousValue,
    0
  );
const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        basket: state.basket.filter((item) => item.token !== action.token),
      };
    default:
      return state;
  }
};
export default reducer;
