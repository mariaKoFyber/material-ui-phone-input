import Button from "@material-ui/core/Button/Button"
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener"
import Grid from "@material-ui/core/Grid/Grid"
import Input from "@material-ui/core/Input/Input"
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment"
import MenuItem from "@material-ui/core/MenuItem/MenuItem"
import MenuList from "@material-ui/core/MenuList/MenuList"
import Paper from "@material-ui/core/Paper/Paper"
import Popper from "@material-ui/core/Popper/Popper"
import withStyles from "@material-ui/core/styles/withStyles"
import TextField from "@material-ui/core/TextField/TextField"
import ArrowIcon from "@material-ui/icons/ArrowDropDown"
import {AsYouType} from "libphonenumber-js"
import * as React from "react"
import {Country} from "./country"
import {CountryIcon} from "./countryIcon"
import {CountryMenuItem} from "./countryMenuItem"

const sortBy = require("lodash/sortBy")

const lookup = require("country-data").lookup

function getCountries(): Country[] {
  const countries = lookup.countries({status: "assigned"})
    .filter((y: any) => y.countryCallingCodes != "")
  return sortBy(countries, "name")
}

const allCountries = getCountries()

const unknownCountry: Country = {
  name: "",
  alpha2: "",
  countryCallingCodes: [""]
}

const styles = {
  worldIcon: {
    backgroundColor: "#9B9B9B",
    color: "FFFFFF"
  },
  hiddenInput: {
    width: "0",
    height: "0",
    padding: "0"
  },
  popover: {
    maxHeight: "14em",
  },
  list: {
    overflow: "auto",
    maxHeight: "14em",
  },
  popper: {
    zIndex: 999
  },
  input: {marginRight: 0},
  textField: {paddingBottom: 0},
  button: {padding: 0}
}

export interface PhoneInputProps {
  onBlur?: () => any,
  onChange?: (alpha2: string, phoneNumber: string) => any,
  error: boolean,
  helperText: string
  classes?: Record<string, string>
}

@(withStyles(styles) as any)
export class PhoneInput extends React.Component<PhoneInputProps> {
  state = {
    phone: "",
    anchorEl: null as any,
    country: unknownCountry,
    countries: allCountries,
    search: ""
  }

  handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const {onChange} = this.props
    const asYouType = new AsYouType()
    // console.log("asYouType", e.target.value)
    // const lastChar = e.target.value.charAt(e.target.value.length-1)
    let phone = asYouType.input(e.target.value)
    const alpha2 = asYouType.country
    const national = asYouType.getNationalNumber()
    const country = lookup.countries({alpha2})[0] || unknownCountry
    // const newVal = alpha2 ? newphone.replace(country[0].countryCallingCodes[0],
    //   "(" + country[0].countryCallingCodes[0] + ")") : newphone
    const code = country.countryCallingCodes[0]
    phone = alpha2 ? phone.replace(code, `(${code})`) : phone
    phone = phone.replace(/[^)]\s/g, (match: string) => match.replace(/\s/g, "-"))
    this.setState({
      phone,
      country,
    })
    onChange && onChange(alpha2, national)
  }

  handleClick = (event: any) => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  handleSearch = (event: any) => {
    const search = event.target.value
    const countries = allCountries.filter(country => new RegExp(`${search}.*`, "i").test(country.name))
    console.log("search", search, countries)
    this.setState({
      search,
      countries
    })
  }

  handleCountryClick = (country: Country) => {
    const {country: selectedCountry, phone: selectedPhone} = this.state

    const currentCallingCode = `(${selectedCountry.countryCallingCodes[0]})`
    const newCallingCode = `(${country.countryCallingCodes[0]})`
    const phone = selectedPhone.indexOf(currentCallingCode) !== -1 ? selectedPhone.replace(
      currentCallingCode,
      newCallingCode
    ) : newCallingCode
    this.setState({
      anchorEl: null,
      search: "",
      phone,
      country
    })
  }

  renderCountry = (country: Country) =>
    <CountryMenuItem
      key={country.name}
      country={country}
      onClick={this.handleCountryClick}
      search={this.state.search}
    />

  handleBlur = () => {
    const {onBlur} = this.props
    onBlur && onBlur()
  }

  render() {
    const {error, helperText, classes: classesProp} = this.props
    const {anchorEl, countries, country} = this.state
    const classes = classesProp!
    return <Grid container direction={"column"}>
      <Grid item>
        <TextField
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          label={"Phone Number"}
          fullWidth={true}
          value={this.state.phone}
          className={classes.textField}
          error={error}
          helperText={helperText}
          InputProps={{
            startAdornment:
              <InputAdornment position="start" className={classes.input}>
                <Button onClick={this.handleClick} className={classes.button}>
                  <Grid>
                    <CountryIcon country={country}/>
                  </Grid>
                  <Grid>
                    <ArrowIcon/>
                  </Grid>
                </Button>
              </InputAdornment>
          }}
        />
      </Grid>

      <Grid item>
        <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement={"bottom-start"} className={classes.popper}>
          <Paper>
            <ClickAwayListener onClickAway={this.handleClose}>
              <MenuList className={classes.list}>
                <MenuItem className={classes.hiddenInput}>
                  <Input onChange={this.handleSearch} autoFocus disableUnderline
                         inputProps={{padding: 0}} value={this.state.search}/>
                </MenuItem>
                {countries.map(this.renderCountry)}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Popper>
      </Grid>
    </Grid>
  }
}
