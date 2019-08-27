import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getStoresQuery } from "../queries/queries";
import Store from "./Store";
const uuidv1 = require("uuid/v1");

class StoreList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }
  displayBooks() {
    var data = this.props.data;
    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.stores.map(store => {
        return (
          <Store
            key={uuidv1()}
            title={store.name}
            address={store.address}
            url={store.url}
            telephone={store.telephone}
            storeId={store.id}
          />
        );
      });
    }
  }
  render() {
    return <div className="StoreContainer">{this.displayBooks()}</div>;
  }
}

export default graphql(getStoresQuery)(StoreList);
