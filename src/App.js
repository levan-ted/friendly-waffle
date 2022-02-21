import { PureComponent } from "react";
import { connect } from "react-redux";
import { ApolloProvider } from "react-apollo";
import { client } from "./store/thunk";
import "./App.scss";
import Header from "./components/Header";

import { getData } from "./store/thunk";

class App extends PureComponent {
  componentDidMount() {
    this.props.getData();
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Header />
        </div>
      </ApolloProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = { getData };

export default connect(mapStateToProps, mapDispatchToProps)(App);
