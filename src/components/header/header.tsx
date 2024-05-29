import "./header.css";
import { ReactNode } from "react";
import { cn as bem } from "@bem-react/classname";

interface IHeaderProps {
  start: ReactNode;
  main: ReactNode;
  end: ReactNode;
  mainJustify: string;
}

function Header({ start, main, mainJustify, end }: IHeaderProps) {
  const cn = bem("Header");

  return (
    <div className={cn()}>
      <div className={cn("start")}>{start}</div>
      <div className={mainJustify === 'center' ? cn("mainCenter") : cn('mainStart')}>{main}</div>
      <div className={cn("end")}>{end}</div>
    </div>
  );
}

export default Header;
