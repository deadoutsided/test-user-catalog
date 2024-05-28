import { IRegisterData, IAuthorizeData, IRegisterErrors } from "./types"



export function registerFormValidation(data: IRegisterData): IRegisterErrors{
  const emailRegExp = new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'gm')
  let validFields = {
    name: false,
    email: false,
    password: false,
    passwordRepeat: false
  }
  console.log(data);
  if(data.name?.length <= 0){
    validFields = {...validFields, name: true}
  } else validFields = {...validFields, name: false};
  if(!emailRegExp.test(data.email)){
    console.log(emailRegExp.test(data.email))
    validFields = {...validFields, email: true}
  } else validFields = {...validFields, email: false};
  if(data.password.length < 6){
    validFields = {...validFields, password: true}
  } else validFields = {...validFields, password: false};
  if(data.passwordRepeat !== data.password){
    validFields = {...validFields, passwordRepeat: true}
  } else validFields = {...validFields, passwordRepeat: false};
  console.log(validFields);
  return validFields;
}

export function authorizeFormValidation(data: IAuthorizeData){
  const emailRegExp = new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'gm')
  let validFields = {
    email: false,
    password: false,
  }

  if(emailRegExp.test(data.email)){
    validFields = {...validFields, email: true}
  }
  if(data.password.length > 5){
    validFields = {...validFields, password: true}
  }

  return validFields;
}