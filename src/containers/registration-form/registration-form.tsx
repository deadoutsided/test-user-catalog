import { FormEvent, useCallback, useState } from "react";
import Input from "../../components/input/input";
import { IRegisterData, IRegisterErrors, useDispatch, useSelector } from "../../utils/types";
import { registerFormValidation } from "../../utils/form-validation";
import { cn as bem } from "@bem-react/classname";
import "./registration-form.css";
import "../../styles/fonts.css";
import { getRegistrationData } from "../../services/actions/user-data";
import { Link, Navigate } from "react-router-dom";

function RegistrationForm() {
  const cn = bem("Form");

  const dispatch = useDispatch();
  const {authorized} = useSelector(store => store.userData)

  const [formData, setFormData] = useState<IRegisterData>({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const [formErrors, setFromErrors] = useState<IRegisterErrors>({
    name: false,
    email: false,
    password: false,
    passwordRepeat: false,
  });
  const [passwordVisibillity, setVisibillity] = useState(false);
  const callbacks = {
    onSubmit: useCallback(
      (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFromErrors(registerFormValidation(formData));
        console.log(formData);
        if (Object.values(formErrors).includes(true)) {
          return;
        }
        const registerData = {email: formData.email, password: formData.password}
        console.log('somethings wrond')
        dispatch(getRegistrationData(registerData));
      },
      [formData, formErrors]
    ),
    onButtonClick: useCallback(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (e: any) => {
        e.preventDefault();
        console.log(passwordVisibillity);
        setVisibillity(!passwordVisibillity);
      },
      [setVisibillity, passwordVisibillity]
    ),
  };

  return (
    <form className={cn()} noValidate={true} onSubmit={callbacks.onSubmit}>
      <h2 className="H2 black">Регистрация</h2>
      <Input
        name="Имя"
        type="text"
        value={""}
        placeholder="Артур"
        button={false}
        visibillity
        onChange={(name: string) => setFormData({ ...formData, name })}
        error={formErrors.name}
      />
      <Input
        name="Электронная почта"
        type="text"
        value={""}
        button={false}
        visibillity
        placeholder="example@mail.ru"
        onChange={(email: string) => setFormData({ ...formData, email })}
        error={formErrors.email}
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
        error={formErrors.password}
      />
      <Input
        name="Подтвердите пароль"
        type="password"
        value={""}
        placeholder="*****"
        button
        visibillity={passwordVisibillity}
        onButtonClick={callbacks.onButtonClick}
        onChange={(passwordRepeat: string) =>
          setFormData({ ...formData, passwordRepeat })
        }
        error={formErrors.passwordRepeat}
      />
      <button className={cn("button")} type="submit">
        Зарегистрироваться
      </button>
      <p>Уже есть аккаунт? <Link to='/signin'>Войти</Link></p>
      {authorized ? <Navigate to='/'/> : <></>}
    </form>
  );
}

export default RegistrationForm;
