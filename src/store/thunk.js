import { categoryActions } from "./slices/category-slice";
import { productsActions } from "./slices/products-slice";

const getCategories = () => async (dispatch) => {
  try {
    // Async fetching data from GraphQL
    dispatch(categoryActions.getCategories("payload"));
  } catch (err) {
    console.log("Something went wrong");
  }
};

const getProducts = () => async (dispatch) => {
  try {
    // Async fetching data from GraphQL
    dispatch(productsActions.getAllProducts("payload"));
  } catch (err) {
    console.log(err);
  }
};

export { getCategories, getProducts };
