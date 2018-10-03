import * as React from "react"
import TextField from "@material-ui/core/TextField/TextField"
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment"
import Button from "@material-ui/core/Button/Button"
import {CountryMenuItem} from "./CountryMenuItem"
import {AsYouType} from "libphonenumber-js"
import Input from "@material-ui/core/Input/Input"
import WorldIcon from "@material-ui/icons/Language"
import ArrowIcon from "@material-ui/icons/ArrowDropDown"
import MenuList from "@material-ui/core/MenuList/MenuList"
import Icon from "@material-ui/core/Icon/Icon"
import Grid from "@material-ui/core/Grid/Grid"
import Paper from "@material-ui/core/Paper/Paper"
import Popper from "@material-ui/core/Popper/Popper"
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener"
import MenuItem from "@material-ui/core/MenuItem/MenuItem"
import withStyles from "@material-ui/core/styles/withStyles"
import {Country} from "./country"

const sortBy = require("lodash/sortBy")

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

const lookup = require("country-data").lookup

export interface PhoneInputProps {
  phoneValueOnChange: (a: string) => void,
  countryValueOnChange: (a: string) => void,
  error: boolean,
  helperText: string
  classes?: Record<string, string>
}

function getCountries(): Country[] {
  const countries = lookup.countries({status: "assigned"})
    .filter((y: any) => y.countryCallingCodes != "")
  return sortBy(countries, "name")
}

@(withStyles(styles) as any)
export class PhoneInput extends React.Component<PhoneInputProps> {
  state = {
    code: "",
    phone: "",
    anchorEl: null as any,
    flag: "",
    search: "",
    allCountries: getCountries(),
    countryCode: ""
  }

  _onChange = (e: any) => {
    const {phoneValueOnChange, countryValueOnChange} = this.props
    const asyouType = new AsYouType()
    const newphone = asyouType.input(e.target.value)
    const CC = asyouType.country
    const national = asyouType.getNationalNumber()
    const country = lookup.countries({alpha2: CC})
    const newVal = CC ? newphone.replace(country[0].countryCallingCodes[0],
      "(" + country[0].countryCallingCodes[0] + ")") : newphone
    this.setState({
      flag: CC ? country[0].emoji : this.state.flag,
      code: CC ? country[0].countryCallingCodes[0] : this.state.code,
      phone: newVal.replace(/[^)](\s)/g, (match: string) =>
        match.replace(/\s/g, "-")),
      countryCode: CC ? CC : "",
      phoneNoPrefix: national
    })
    phoneValueOnChange(national)
    countryValueOnChange(CC ? CC : "")
  }

  handleClick = (event: any) => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  handleClickItem = (event: any, code: string, flag: string, countryCode: string) => {
    const phone = this.state.phone ? this.state.phone.replace(this.state.code, code) :
      "(" + code.replace(/\s/g, "-") + ")"
    this.setState({
      anchorEl: null,
      search: "",
      code,
      phone,
      flag,
      countryCode
    })
  }

  handleSearch = (event: any) => {
    this.setState({search: event.target.value})
  }

  renderCountry = (country: Country) =>
    <CountryMenuItem
      key={country.name}
      onClick={event => this.handleClickItem(event, country.countryCallingCodes[0], country.emoji, country.alpha2)}
      flagSVG={country.emoji}
      name={country.name}
      countryCode={country.countryCallingCodes[0]}
      search={this.state.search}
    />

  render() {
    const {error, helperText, classes: classesProp} = this.props
    const {anchorEl, allCountries} = this.state
    const classes = classesProp!
    return <Grid container direction={"column"}>
      <Grid item>
        <TextField
          id={"phone-input"}
          onChange={this._onChange}
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
                    {this.state.flag ? <Icon>{this.state.flag}</Icon> : <WorldIcon className={classes.worldIcon}/>}
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
                         inputProps={{padding: 0}}/>
                </MenuItem>
                {allCountries.map(this.renderCountry)}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Popper>
      </Grid>
    </Grid>
  }
}
