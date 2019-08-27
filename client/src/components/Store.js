import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Route, Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
const uuidv1 = require("uuid/v1");

const useStyles = makeStyles({
  card: {
    flexBasis: 300,
    maxWidth: 300,
    margin: 5
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function Store({ title, address, telephone, url, storeId }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Link key={uuidv1()} to={`/store/${storeId}`}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {telephone}
          </Typography>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" component="p">
            {address}
          </Typography>
        </Link>
      </CardContent>
      <CardActions>
        <Button size="small">{url}</Button>
      </CardActions>
    </Card>
  );
}
