import * as ReactDOM from "react-dom"
import * as React from "react"
import {PhoneInput} from "./phoneInput"

export * from "./phoneInput"

const rootElement = document.getElementById("root");
ReactDOM.render(<PhoneInput error={false}
                            helperText={""}
/>, rootElement);
