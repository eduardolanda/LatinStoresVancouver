import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./App.css";

//Components
import StoreList from "./components/StoreList";
import StoreDetails from "./components/StoreDetails";
import Navbar from "./components/Navbar";
import ItemList from "./components/ItemList";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const App = () => {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <Navbar />
          <Route path="/" exact component={StoreList} />
          <Route path="/store/:idStore" exact component={StoreDetails} />
          <Route path="/items/:nameProduct" exact component={ItemList} />
        </Router>
      </ApolloProvider>
    </div>
  );
};

export default App;
