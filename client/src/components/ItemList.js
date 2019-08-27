import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getItemQuery } from "../queries/queries";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
const uuidv1 = require("uuid/v1");

class ItemList extends Component {
  displayItemList() {
    const { itemName } = this.props.data;
    if (itemName) {
      return (
        <div>
          {itemName.map(item => (
            <Card
              key={uuidv1()}
              style={{
                width: "300px",
                margin: "0 auto",
                padding: "10px",
                textAlign: "center"
              }}
            >
              <List key={uuidv1()}>
                <Typography variant="h6" component="h5">
                  <ListItem key={uuidv1()}>Product: {item.name}</ListItem>
                  <ListItem key={uuidv1()}>Price: {item.price} CAD</ListItem>
                  <ListItem key={uuidv1()}>Brand: {item.brand}</ListItem>
                </Typography>
                {item.reviews.map(review => (
                  <List key={uuidv1()}>
                    <ListItem key={uuidv1()}>
                      Review by: {review.author}
                    </ListItem>
                    <ListItem key={uuidv1()}>
                      Review: {review.description}
                    </ListItem>
                  </List>
                ))}

                <List>
                  <ListItem>{item.store.name}</ListItem>
                  <ListItem>{item.store.address}</ListItem>
                </List>
              </List>
            </Card>
          ))}
        </div>
      );
    } else {
      return <div>No item selected...</div>;
    }
  }
  render() {
    return <div id="item-details">{this.displayItemList()}</div>;
  }
}

export default graphql(getItemQuery, {
  options: props => {
    return {
      variables: {
        name: props.match.params.nameProduct
        // name: "Pelon Pelon Rico 2"
      }
    };
  }
})(ItemList);
