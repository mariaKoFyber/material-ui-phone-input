import * as React from "react";
import MenuItem from "@material-ui/core/MenuItem/MenuItem"
import Grid from "@material-ui/core/Grid/Grid"
import Icon from "@material-ui/core/Icon/Icon"
import Typography from "@material-ui/core/Typography"
import withStyles from "@material-ui/core/styles/withStyles";
import {Country} from "./country"
import {CountryIcon} from "./countryIcon"

const styles = {
  countryName: {
    fontSize: "1em",
    paddingLeft: "0.5em",
    flex: 1,
  },
  maxLines: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordBreak: "break-all",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
  } as any,
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
  menuItem: {
    padding: "0.5em",
    width: 300
  }
}

export interface CountryItemProps {
  search: string
  onClick: (country: Country) => any
  classes?: Record<string, string>
  country: Country
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

  handleClick = () => {
    this.props.onClick(this.props.country)
  }

  render() {
    const {onClick, country, search, classes: classesProp} = this.props
    const classes = classesProp!
    return <MenuItem onClick={this.handleClick} className={classes.menuItem}>
      <Grid container direction="row">
        <Grid item>
          <CountryIcon country={country}/>
        </Grid>
        <Grid zeroMinWidth item className={classes.countryName}>
          <div className={classes.maxLines}>{this.highlightSearch(country.name, search)}</div>
        </Grid>
        <Grid item className={classes.dialNumber}>
          <Typography className={classes.countryCode}>{country.countryCallingCodes[0]}</Typography>
        </Grid>
      </Grid>
    </MenuItem>
  }

}
