import { gql } from "apollo-boost";

const CATEGORIES = gql`
  {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

const SINGLE_PRODUCT = (id) => gql`{
    product(id: "${id}") {
     id
     name
     inStock
     gallery
     description
     category
     attributes{
      name
      id
      type
      items{
        displayValue
        value
        id
      }
    }
     prices{
       currency{
         label
         symbol
       }
       amount
     }
     brand
   }
   }`;

const CURRENCIES = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

export { CATEGORIES, SINGLE_PRODUCT, CURRENCIES };
