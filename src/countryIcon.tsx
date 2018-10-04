import withStyles from "@material-ui/core/styles/withStyles"
import * as React from "react"
import LanguageIcon from "@material-ui/icons/Language"

export interface CountryIconProps {
  country: {
    alpha2: string
    name: string
  }
  classes?: Record<string, string>
}

const styles = {
  root: {
    width: 20
  },
  image: {
    width: 20
  }
}

@(withStyles(styles) as any)
export class CountryIcon extends React.PureComponent<CountryIconProps> {
  render() {
    const {country, classes: classesProp} = this.props
    const classes = classesProp!
    const src = country.alpha2 &&
      `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.0/flags/1x1/${country.alpha2.toLowerCase()}.svg`
    return <div className={classes.root}>
      {country.alpha2 ?
        <img alt={country.name} className={classes.image} src={src}/> :
        <LanguageIcon/>}
    </div>
  }
}
