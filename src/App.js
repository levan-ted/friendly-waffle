import { PureComponent } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ApolloProvider } from "react-apollo";
import { client } from "./store/thunk";
import "./App.scss";
import * as storage from "./helpers/localStorage";
import Header from "./components/Header";
import Shop from "./pages/Shop";

import {
  getCurrencies,
  getCategories,
  getInitialCartState,
} from "./store/thunk";
import ProductPage from "./pages/ProductPage/ProductPage";
import Cart from "./pages/Cart";

class App extends PureComponent {
  componentDidMount() {
    this.props.getCurrencies();
    this.props.getCategories();
    this.props.getInitialCartState(storage.get("cart"));
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Header categories={this.props.data.categories} />
          <Switch>
            <Route exact path="/">
              <Redirect to="/shop/all" />
            </Route>
            <Route path="/product/:productId" component={ProductPage} />
            <Route path="/shop/:categoryId" component={Shop} />
            <Route path="/cart" component={Cart} />
          </Switch>
        </div>
      </ApolloProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = {
  getCurrencies,
  getCategories,
  getInitialCartState,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
