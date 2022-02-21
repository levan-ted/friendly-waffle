import { categoryActions } from "./slices/category-slice";
import { productsActions } from "./slices/products-slice";
import { dataActions } from "./slices/data-slice";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";

export const client = new ApolloClient({ uri: "http://localhost:4000" });

const CATEGORIES_QUERY = gql`
  query getData {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;

const getData = () => async (dispatch) => {
  try {
    const res = await client.query({ query: CATEGORIES_QUERY });
    dispatch(dataActions.getData(res.data));
  } catch (err) {
    console.log(err);
  }
};

export { getData };
