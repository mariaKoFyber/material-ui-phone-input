import * as React from "react";
import MenuItem from "@material-ui/core/MenuItem/MenuItem"
import Grid from "@material-ui/core/Grid/Grid"
import Icon from "@material-ui/core/Icon/Icon"
import Typography from "@material-ui/core/Typography"

const styles = {
  countryName: {
    fontSize: "1em",
    paddingLeft: "0.5em",
    fontFamily: "AvertaCY"
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
  }
}

export interface CountryItemProps extends CountryDataItem {
  flagSVG: string;
  name: string;
  search: string;

  onClick: (event: any) => void
}

export interface CountryDataItem {
  countryCode: number;
}

export class CountryMenuItem extends React.Component<CountryItemProps, {}> {

  state = {
    value: this.props.countryCode
  }

  highlightSearch(name: string, search: string) {
    if (search) {
      const parts = name.split(new RegExp(`(${search})`, "gi"))
      return <Typography style={styles.countryNameList}>
        {parts.map((part, index) => part.toLowerCase() === search.toLowerCase() ?
          <b key={index}>{part}</b> : part)}</Typography>
    }
    return <Typography style={styles.countryNameList}>{name}</Typography>
  }

  render() {
    const {onClick, flagSVG, countryCode, name, search} = this.props
    return name.toLowerCase().indexOf(search.toLowerCase()) != -1 &&
      <MenuItem onClick={onClick} key={countryCode} style={{padding: "0.5em"}}>
        <Grid container direction="row">
          <Grid item>
            <Icon>{flagSVG}</Icon>
          </Grid>
          <Grid item style={styles.countryName}>
            {this.highlightSearch(name, search)}
          </Grid>
          <Grid item style={styles.dialNumber}>
            <Typography style={styles.countryCode}>{countryCode}</Typography>
          </Grid>
        </Grid>
      </MenuItem>
  }

}
