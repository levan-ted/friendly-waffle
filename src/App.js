import { PureComponent } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ApolloProvider } from "react-apollo";
import { client } from "./store/thunk";
import "./App.scss";
import Header from "./components/Header";
import Shop from "./pages/Shop";

import { getCurrencies, getCategories } from "./store/thunk";

class App extends PureComponent {
  componentDidMount() {
    this.props.getCurrencies();
    this.props.getCategories();
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Header categories={this.props.data.categories} />
          <Switch>
            <Route path="/">
              <Redirect to="/all" />
            </Route>
          </Switch>
          <Shop />
        </div>
      </ApolloProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = { getCurrencies, getCategories };

export default connect(mapStateToProps, mapDispatchToProps)(App);
