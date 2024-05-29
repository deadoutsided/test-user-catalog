import './button.css'
import { cn as bem } from '@bem-react/classname'

interface IButtonProps {
  text: string,
  onClick: () => void,
}

function Button({ text, onClick }: IButtonProps){
  const cn = bem('Button');

  return <button className={cn()} onClick={onClick}>{text}</button>
}

export default Button;