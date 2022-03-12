import { dataActions } from "./slices/data-slice";
import { currencyActions } from "./slices/currency-slice";
import { cartActions } from "./slices/cart-slice";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";
import { CURRENCIES, CATEGORIES } from "../constants/gql-queries";

export const client = new ApolloClient({ uri: "http://localhost:4000" });

// CURRENCY OPERATIONS
const getCurrencies = () => async (dispatch) => {
  try {
    const res = await client.query({ query: CURRENCIES });
    dispatch(currencyActions.getCurrencies(res.data.currencies));
  } catch (err) {
    console.log(err);
  }
};

const changeCurrency = (value) => async (dispatch) => {
  try {
    dispatch(currencyActions.changeCurrency(value));
  } catch (err) {
    console.log(err);
  }
};

// GET PRODUCTS FROM THE SERVER

const getCategories = () => async (dispatch) => {
  try {
    const res = await client.query({ query: CATEGORIES });
    const categories = res.data.categories;
    dispatch(dataActions.getCategoryNames(categories));
  } catch (err) {
    console.log(err);
  }
};

// CART ACTIONS

const addItemToCart = (item) => async (dispatch) => {
  dispatch(cartActions.addItem(item));
};

const removeItemFromCart = (item) => async (dispatch) => {
  dispatch(cartActions.removeItem(item));
};

export {
  getCurrencies,
  changeCurrency,
  getCategories,
  addItemToCart,
  removeItemFromCart,
};
