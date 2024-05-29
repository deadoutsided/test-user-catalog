import { FormEvent, useCallback, useState } from "react";
import Input from "../../components/input/input";
import { ISignInData, useDispatch, useSelector } from "../../utils/types";
import { cn as bem } from "@bem-react/classname";
import "./signin-form.css";
import "../../styles/fonts.css";
import { getSignInData } from "../../services/actions/user-data";
import { Link, Navigate } from "react-router-dom";

function SignInForm() {
  const cn = bem("SignForm");

  const dispatch = useDispatch();
  const {authorized} = useSelector((store) => store.userData)

  const [formData, setFormData] = useState<ISignInData>({
    email: "",
    password: "",
  });
  const [passwordVisibillity, setVisibillity] = useState(false);
  const callbacks = {
    onSubmit: useCallback(
      (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const signInData = {email: formData.email, password: formData.password}
        dispatch(getSignInData(signInData));

      },
      [formData]
    ),
    onButtonClick: useCallback(
      (e) => {
        e.preventDefault();
        console.log(passwordVisibillity);
        setVisibillity(!passwordVisibillity);
      },
      [setVisibillity, passwordVisibillity]
    ),
  };

  return (
    <form className={cn()} noValidate={true} onSubmit={callbacks.onSubmit}>
      <h2 className="H2 black">Вход</h2>
      <Input
        name="Электронная почта"
        type="text"
        value={""}
        visibillity
        placeholder="example@mail.ru"
        onChange={(email: string) => setFormData({ ...formData, email })}
      />
      <Input
        name="Пароль"
        type="password"
        value={""}
        placeholder="*****"
        onChange={(password: string) => setFormData({ ...formData, password })}
        button
        visibillity={passwordVisibillity}
        onButtonClick={callbacks.onButtonClick}
      />
      <button className={cn("button")} type="submit">
        Войти
      </button>
      <p>Ещё нет аккаунта? <Link to='/registration'>Зарегистрироваться</Link></p>
      {authorized ? <Navigate to='/'/> : <></>}
    </form>
  );
}

export default SignInForm;
