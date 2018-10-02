import * as React from "react"
import TextField from "@material-ui/core/TextField/TextField"
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment"
import Button from "@material-ui/core/Button/Button"
import {CountryMenuItem} from "./CountryMenuItem"
import {AsYouType} from "libphonenumber-js"
import Input from "@material-ui/core/Input/Input"
import WorldIcon from "@material-ui/icons/Language"
import ArrowIcon from "@material-ui/icons/ArrowDropDown"
import * as _ from "lodash"
import MenuList from "@material-ui/core/MenuList/MenuList"
import Icon from "@material-ui/core/Icon/Icon"
import Grid from "@material-ui/core/Grid/Grid"
import Paper from "@material-ui/core/Paper/Paper";
import Popper from "@material-ui/core/Popper/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

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
  }
}

const lookup = require('country-data').lookup


export interface PhoneInputProps {
  phoneValueOnChange: (a: string) => void,
  countryValueOnChange: (a: string) => void,
  error: boolean,
  helperText: string
}

export default class PhoneInput extends React.Component<PhoneInputProps> {

  getCountries = () => {
    const countries = lookup.countries({status: "assigned"})
      .filter((y: any) => y.countryCallingCodes != "")
    return _.sortBy(countries, "name")
  }

  state = {
    code: "",
    phone: "",
    anchorEl: null,
    flag: null,
    search: "",
    allCountries: this.getCountries(),
    countryCode: ""
  } as any;

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
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  handleOpen = () => {
    this.setState({anchorEl: null});
  };

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
    });
  };

  handleChange = (event: any) => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleSearch = (event: any) => {
    this.setState({search: event.target.value});
  }

  render() {
    const {error, helperText} = this.props;
    const {anchorEl, search, allCountries} = this.state;
    return <Grid container direction={"column"}>
      <Grid item>
        <TextField
          id={"phone-input"}
          onChange={this._onChange}
          label={"Phone Number"}
          fullWidth={true}
          value={this.state.phone}
          style={{paddingBottom: 0}}
          error={error}
          helperText={helperText}
          InputProps={{
            startAdornment:
              <InputAdornment position="start" style={{marginRight: 0}}>
                <Button onClick={this.handleClick} style={{padding: 0}}>
                  <Grid>
                    {this.state.flag ? <Icon>{this.state.flag}</Icon> : <WorldIcon style={styles.worldIcon}/>}
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
        <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement={"bottom-start"} style={styles.popper}>
          <Paper>
            <ClickAwayListener onClickAway={this.handleClose}>
              <MenuList style={styles.list}>
                <MenuItem style={styles.hiddenInput}>
                  <Input onChange={this.handleSearch} autoFocus disableUnderline
                         inputProps={{padding: 0}}/>
                </MenuItem>
                {allCountries.map((x: any) =>
                  <CountryMenuItem
                    key={x.name}
                    onClick={event => this.handleClickItem(event, x.countryCallingCodes[0], x.emoji, x.alpha2)}
                    flagSVG={x.emoji}
                    name={x.name}
                    countryCode={x.countryCallingCodes}
                    search={search}
                  />)}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Popper>
      </Grid>
    </Grid>
  }
}
