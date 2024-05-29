import { cn as bem } from "@bem-react/classname";
import './signin-page.css';
import SignInForm from "../../containers/signin-form/signin-form";

export function SignInPage(){
  const cn = bem('RegistrationPage')
  return (
    <div className={cn()}>
      <SignInForm/>
    </div>
  )
}