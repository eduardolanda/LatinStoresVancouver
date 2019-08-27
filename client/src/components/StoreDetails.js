import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getStoreQuery } from "../queries/queries";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
const uuidv1 = require("uuid/v1");

class StoreDetails extends Component {
  displayStoreDetails() {
    const { store } = this.props.data;
    if (store) {
      return (
        <div style={{ textAlign: "center" }}>
          <h2>{store.name}</h2>
          <h3>{store.address}</h3>
          <div className="StoreContainer">
            {store.items.map(item => (
              <Card key={uuidv1()} style={{ width: "340px", margin: "5px" }}>
                <List key={uuidv1()}>
                  <Typography variant="subtitle2" component="h5">
                    <ListItem key={uuidv1()}>Product: {item.name}</ListItem>
                    <ListItem key={uuidv1()}>Brand: {item.brand}</ListItem>
                    <ListItem key={uuidv1()}>Price: {item.price} CAD</ListItem>
                  </Typography>
                  {item.reviews.map(review => (
                    <List key={uuidv1()}>
                      <Typography variant="subtitle1" component="h6">
                        <Card
                          style={{
                            width: "300px",
                            background: "#a4c639",
                            color: "white",
                            fontWeight: "bold"
                          }}
                        >
                          <ListItem key={uuidv1()}>
                            Review From: {review.author}
                          </ListItem>
                          <ListItem key={uuidv1()}>
                            Review: {review.description}
                          </ListItem>
                        </Card>
                      </Typography>
                    </List>
                  ))}
                </List>
              </Card>
            ))}
          </div>
        </div>
      );
    } else {
      return <div>No store selected...</div>;
    }
  }
  render() {
    return <div id="store-details">{this.displayStoreDetails()}</div>;
  }
}

export default graphql(getStoreQuery, {
  options: props => {
    return {
      variables: {
        id: props.match.params.idStore
      }
    };
  }
})(StoreDetails);
