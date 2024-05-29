import { useCallback } from 'react'
import './user-card.css'
import { cn as bem } from '@bem-react/classname'
import { useNavigate } from 'react-router-dom'
import { useSelector } from '../../utils/types'

type TUserCardProps = {
  avatar: string,
  name: string,
  id: number,
  onClick: () => void,
}

function UserCard({ avatar, name, id, onClick }: TUserCardProps) {
  const navigate = useNavigate();
  const { authorized } = useSelector((store) => store.userData)
  const cn = bem("UserCard")
  const buttonClick = useCallback(() => {
    //onClick(id);
  }, [id, onClick])

  return (
    <div className={cn()} onClick={() => {navigate(authorized ? `/${id}` : '/registration', {state: {id}})}}>
      <img className={cn('avatar')} src={avatar}/>
      <h2 className={cn('name')}>{name}</h2>
      <button className={cn('button')} onClick={buttonClick}></button>
    </div>
  )

}

export default UserCard;