import * as React from "react";
import * as ReactDOM from "react-dom"
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import MaskedInput, {maskArray} from "react-text-mask";
import {createNumberMask} from "text-mask-addons/dist/textMaskAddons";
import Button from "@material-ui/core/Button/Button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Menu from "@material-ui/core/Menu/Menu";
import {CountryMenuItem} from "./country-menu-item";
import {AsYouType, getPhoneCode, parseNumber} from 'libphonenumber-js'


var CountryData = require('country-data');


const maskNumber: ((value: string) => maskArray) = createNumberMask({
  prefix: '+',
  allowLeadingZeroes: true,includeThousandsSeparator: false

});


function NumberFormatCustom(props: any) {
  console.log(props)
  const {value, onChange} = props
  return (
    <MaskedInput
      mask={maskNumber}
      onChange={onChange}
      value={value}
      placeholderChar={'\u2000'}
      showMask={false}
      style={{borderWidth: "0px"}}
    />
  );
}

const lookup = require('country-data').lookup

const allCountry = lookup.countries({status: "assigned"})
  .filter((y: any) => y.countryCallingCodes != "")


class PhoneInput extends React.Component {
  state = {
    value: "",
    code: "",
    phone: "",
    anchorEl: null,
    flag: null
  } as any;

  _onChange = (e: any) => {
    const asyouType =new AsYouType()
    const newphone=asyouType.input(e.target.value)
    const CC=asyouType.country
    const national=asyouType.getNationalNumber()
    const newVal= (CC)? newphone.replace("+"+getPhoneCode(CC),"(+"+getPhoneCode(CC)+")") :  newphone
    console.log("nmasha" +newVal)
    this.setState({code:CC ? "+"+getPhoneCode(CC):this.state.code ,phone:newVal.replace(/[^\)](\s)/g,(match:string)=>match.replace(/\s/g,"-")) })
  }

  handleClick = (event: any) => {
    //todo mashs
    this.setState({anchorEl: event.currentTarget, menu: true});
  };

  handleClose = () => {
    this.setState({anchorEl: null, menu: false});
  };

  handleOpen = () => {
    this.setState({anchorEl: null, menu: true});
  };

  handleClickitem = (event: any, cc: string, flag: string) => {
    console.log("masha clicking "+this.state.phone)
    const newVal = this.state.phone.replace(this.state.code, cc)
    console.log(newVal)
    this.setState({anchorEl: null, code: cc, phone: newVal, menu: close, flag: flag});
  };

  handleChange = (event: any) => {
    console.log("masha setting " + event)
    this.setState({[event.target.name]: event.target.value});
  };


  render() {
    const conPhone = new AsYouType()
    const {anchorEl} = this.state;
    {
      console.log(CountryData.countries.all.length)
    }

    return <div>

      <TextField
        label="With normal TextField"
        id="simple-start-adornment"
        value={this.state.phone}
        onChange={this._onChange}
        InputProps={{
          startAdornment: <InputAdornment position="start">
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onChange={this.handleChange}
              onClose={this.handleClose}
            >
              {allCountry.map((x: any) => <CountryMenuItem
                onClick={event => this.handleClickitem(event, x.countryCallingCodes[0], x.emoji)}
                flagSVG={x.emoji}
                name={x.name}
                countryCode={x.countryCallingCodes}/>)}
            </Menu>
            <Button onClick={this.handleClick}>
              {this.state.flag ? this.state.flag : <CloudUploadIcon/>}
            </Button>

          </InputAdornment>,
          // inputComponent: NumberFormatCustom,
        }}
      />
      {/*{CountryData.countries.all.map((x:any)=>x).filter((y:any)=>(y.emoji !=undefined || y.countryCallingCodes!=undefined)).map((z:any)=><div>{[z.countryCallingCodes,"  " ,z.name, z.emoji]}</div>)}*/}
      {/*{ (lookup.countries({status: "assigned"})).filter((y:any)=>y.countryCallingCodes!="").map((x:any)=>[x.countryCallingCodes[0],x.name,x.emoji,"      "])}*/}
    </div>
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<PhoneInput/>, rootElement);
