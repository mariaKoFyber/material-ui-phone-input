import * as React from "react"
import * as ReactDOM from "react-dom"
import TextField from "@material-ui/core/TextField/TextField"
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment"
import Button from "@material-ui/core/Button/Button"
import {CountryMenuItem} from "./CountryMenuItem"
import {AsYouType} from "libphonenumber-js"
import Input from "@material-ui/core/Input/Input"
import WorldIcon from "@material-ui/icons/Language"
import ArrowIcon from "@material-ui/icons/ArrowDropDown"
import Popover from "@material-ui/core/Popover/Popover"
import * as _ from "lodash"
import MenuList from "@material-ui/core/MenuList/MenuList"
import Icon from "@material-ui/core/Icon/Icon"
import Grid from "@material-ui/core/Grid/Grid"

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
    paddingTop: 0
  }
}

const lookup = require('country-data').lookup

class PhoneInput extends React.Component {

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
    const {anchorEl, search, allCountries} = this.state;
    console.log("countryCode ", this.state.countryCode)
    console.log("phoneNoPrefix", this.state.phoneNoPrefix)
    return <Grid container direction={"column"}>

      <Grid item>
        <TextField
          id={"PhoneInput"}
          onChange={this._onChange}
          label={"Phone Input"}
          value={this.state.phone}
          style={{paddingBottom: 0, width: "420px"}}
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
        <Popover open={Boolean(anchorEl)}
                 style={styles.popover}
                 onClose={this.handleClose}
                 anchorOrigin={{
                   vertical: "bottom",
                   horizontal: "left",
                 }}
        >
          <Input onChange={this.handleSearch} style={styles.hiddenInput} autoFocus disableUnderline
                 inputProps={{padding: 0}}/>
          <MenuList style={{padding: 0}}>
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
        </Popover>
      </Grid>

    </Grid>
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<PhoneInput/>, rootElement);
