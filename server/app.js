const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

const mongo = mongoose.connect("DB_LINK", { useNewUrlParser: true });
mongo
  .then(() => {
    console.log("connected");
  })
  .catch(err => {
    console.log("err", err);
  });

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("Listening request on port 4000");
});
