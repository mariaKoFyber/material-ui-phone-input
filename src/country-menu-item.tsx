import * as React from "react";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {OptionProps} from "react-select/lib/components/Option";
import {CommonProps} from "react-select/lib/types";
import Button from "@material-ui/core/Button/Button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';



export interface CountryItemProps extends CountryDataItem{
 flagSVG: string;
 name:string;

  onClick:(event: any)=>void
}

export interface CountryDataItem {
  countryCode: number;

}

const handleClick = (event: any) => {
  //todo mashs
 console.log(event)
};



// export const CustomOption = (props:OptionProps<CountryItemProps>) => {
//  const data=props.data as CountryItemProps
//   return (
//     <div>
//       {[props.data.flag]}
//     </div>
//   )
// }


export class CountryMenuItem extends React.Component<CountryItemProps,{} > {

  state={
    value:this.props.countryCode
  }

  render(){
    const {onClick,flagSVG,countryCode,name} =this.props
    return <MenuItem onClick={onClick}>{[ flagSVG, name,countryCode]}</MenuItem>
  }

}