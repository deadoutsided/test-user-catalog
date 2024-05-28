import {
  ChangeEvent,
  memo,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";
import debounce from "../../utils/debounce";
import { cn as bem } from "@bem-react/classname";
import "./input.css";
import "../../styles/fonts.css"

function Input(props) {
  const [value, setValue] = useState(props.value);

  const onChangeDebounce = useCallback(
    debounce((value) => props.onChange(value, props.name), 300), //todo: убрать дилей в цифрах
    [props.onChange, props.name]
  );

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target?.value);
    onChangeDebounce(event.target?.value);
  };

  useLayoutEffect(() => setValue(props.value), [props.value]);

  const cn = bem("Input");

  return (
    <label className={cn() + ' Text black'}>
      {props.name}
      <input
        className={cn("field", props.error ? {text: true, error: true} : { text: true })}
        value={value}
        type={props.visibillity ? "text" : "password"}
        placeholder={props.placeholder}
        onChange={onChange}
      />
      {props.error ? <span className={cn("error") + ' Text-small'}>{"Ошибка"}</span> : <></>}
      {props.button ? <button type="button" className={cn('eye-button')} onClick={(e) => props.onButtonClick(e)}></button> : <></>}
    </label>
  );
}

export default memo(Input);
