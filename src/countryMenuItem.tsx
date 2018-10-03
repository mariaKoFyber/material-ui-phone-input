import * as React from "react";
import MenuItem from "@material-ui/core/MenuItem/MenuItem"
import Grid from "@material-ui/core/Grid/Grid"
import Icon from "@material-ui/core/Icon/Icon"
import Typography from "@material-ui/core/Typography"
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  countryName: {
    fontSize: "1em",
    paddingLeft: "0.5em",
  },
  dialNumber: {
    marginLeft: "auto",
    fontSize: "1em",
    fontFamily: "AvertaCY",
  },
  countryCode: {
    color: "#1D0047",
    fontSize: "1em",
  },
  countryNameList: {
    color: "#1D0047", fontSize: "1em", fontWeight: 300
  },
  menuItem: {padding: "0.5em"}
}

export interface CountryItemProps extends CountryDataItem {
  flagSVG: string
  name: string
  search: string
  onClick: (event: any) => void
  classes?: Record<string, string>
}

export interface CountryDataItem {
  countryCode: string;
}

@(withStyles(styles) as any)
export class CountryMenuItem extends React.Component<CountryItemProps> {
  highlightSearch(name: string, search: string) {
    const {classes: classesProp} = this.props
    const classes = classesProp!
    if (search) {
      const parts = name.split(new RegExp(`(${search})`, "gi"))
      return <Typography className={classes.countryNameList}>
        {parts.map((part, index) => part.toLowerCase() === search.toLowerCase() ?
          <b key={index}>{part}</b> : part)}</Typography>
    }
    return <Typography className={classes.countryNameList}>{name}</Typography>
  }

  render() {
    const {onClick, flagSVG, countryCode, name, search, classes: classesProp} = this.props
    const classes = classesProp!
    return name.toLowerCase().indexOf(search.toLowerCase()) != -1 &&
      <MenuItem onClick={onClick} key={countryCode} className={classes.menuItem}>
        <Grid container direction="row">
          <Grid item>
            <Icon>{flagSVG}</Icon>
          </Grid>
          <Grid item className={classes.countryName}>
            {this.highlightSearch(name, search)}
          </Grid>
          <Grid item className={classes.dialNumber}>
            <Typography className={classes.countryCode}>{countryCode}</Typography>
          </Grid>
        </Grid>
      </MenuItem>
  }

}
