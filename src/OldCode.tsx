import * as React from "react";
import * as ReactDOM from "react-dom"
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import Icon from "@material-ui/core/Icon/Icon";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Visibility from '@material-ui/icons/Visibility';
import MaskedInput, {maskArray} from "react-text-mask";
import {values} from "mobx";
import {createNumberMask} from "text-mask-addons/dist/textMaskAddons";
import Button from "@material-ui/core/Button/Button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from 'react-select';


var CountryData = require('country-data');


const maskNumber: ((value: string) => maskArray) = createNumberMask({
  prefix: '', includeThousandsSeparator: true,
  allowLeadingZeroes: true
});

const styles = () => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: 2,
    left: 0,
    right: 0,
  },
  divider: {
    height: 2 * 2,
  },
});

function NumberFormatCustom() {

  return (
    <MaskedInput
      mask={maskNumber}
  placeholderChar={'\u2000'}
  showMask={true}
  style={{borderWidth: "0px"}}
  />
);
}



class PhoneInput extends React.Component {
  state = {
    value: "1",
    anchorEl: null,
    menu:false
  } as any;

  _onChange = (e: any) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleClick = (event: any) => {
    //todo mashs
    this.setState({anchorEl: event.currentTarget, menu:true});
  };

  handleClose = () => {
    this.setState({anchorEl: null, menu:close});
  };

  handleClickitem = (event: any, cc: string) => {
    console.log(event.currentTarget)
    this.setState({anchorEl: null, value: cc, menu:close});
  };

  render() {

    const CustomControl = (props:any)=>{
      console.log(props)
      return  <Button onClick={this.handleClick}>
      <CloudUploadIcon/>
      </Button>
    }

    const {anchorEl} = this.state;
    var lookup = require('country-data').lookup
    {
      console.log(CountryData.countries.all.length)
    }
    const selectStyles = {
      input: (base:any) => ({
        ...base,
        color: "#ffffff",
        width:250,
      }),
    };



    return <div>
      {/*<Select*/}
    {/*styles={{ multiValueRemove: (valueContainer) => ({ ...valueContainer, border: `1px dotted `, height: "25px",width: "250px" }) }}*/}
    {/*defaultMenuIsOpen={true}*/}
    {/*components={{ Option: CustomOption }}*/}
    {/*options={lookup.countries({status: "assigned"})*/}
    {/*.filter((y: any) => y.countryCallingCodes != "")*/}
    {/*.map(*/}
    {/*(x: any) =>({countryCode:x.countryCallingCodes[0] , label:x.name, flag:x.emoji}))}/>*/}
    <TextField
      label="With normal TextField"
    id="simple-start-adornment"
    value={this.state.value}
    onChange={this._onChange}

    InputProps={{
      startAdornment: <InputAdornment position="start">

        {/*<Menu*/}
      {/*id="simple-menu"*/}
      {/*anchorEl={anchorEl}*/}
      {/*open={Boolean(anchorEl)}*/}
      {/*onClose={this.handleClose}>*/}
      {/**/}
      {/*</Menu>*/}
      <Select
        placeholder=""
      styles={{ multiValueRemove: (valueContainer) => ({ ...valueContainer,visibility: "hidden", border: `1px dotted `, height: "25px",width: "250px" }) }}
      // components={{ Option: CustomOptiontion}}
      options={lookup.countries({status: "assigned"})
        .filter((y: any) => y.countryCallingCodes != "")
        .map(
          (x: any) =>({countryCode:x.countryCallingCodes[0] , label:x.name, flag:x.emoji}))}/>


      {/*<Button onClick={this.handleClick}>*/}
      {/*<CloudUploadIcon/>*/}
      {/*</Button>*/}
      </InputAdornment>,
      inputComponent: NumberFormatCustom,
    }}
    />
    {/*{CountryData.countries.all.map((x:any)=>x).filter((y:any)=>(y.emoji !=undefined || y.countryCallingCodes!=undefined)).map((z:any)=><div>{[z.countryCallingCodes,"  " ,z.name, z.emoji]}</div>)}*/}
    {/*{ (lookup.countries({status: "assigned"})).filter((y:any)=>y.countryCallingCodes!="").map((x:any)=>[x.countryCallingCodes[0],x.name,x.emoji,"      "])}*/}
    </div>
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<PhoneInput/>, rootElement);
