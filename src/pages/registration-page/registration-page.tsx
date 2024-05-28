import RegistrationForm from "../../containers/registration-form/registration-form";
import { cn as bem } from "@bem-react/classname";
import './registration-page.css';

export function RegistrationPage(){
  const cn = bem('RegistrationPage')
  return (
    <div className={cn()}>
      <RegistrationForm/>
    </div>
  )
}