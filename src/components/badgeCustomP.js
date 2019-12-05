import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2
  },
  customBadge: {
    backgroundColor: props => props.color,
    color: "white"
  }
});

function SimpleBadge(props) {
  const { classes } = props;
  return (
    <div>
      <Badge
        classes={{ badge: classes.customBadge }}
        className={classes.margin}
        badgeContent={10}
      >
        total Seats
      </Badge>
    </div>
  );
}
const StyledBadge = withStyles(styles)(SimpleBadge);

const badgeCustomP = () => {
  return <StyledBadge color="#00AFD7" />;
};

export default badgeCustomP;
