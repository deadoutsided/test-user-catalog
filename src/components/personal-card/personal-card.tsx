import './personal-card.css'
import { cn as bem } from '@bem-react/classname'

function PersonalCard({name, job="Партнер", avatar}) {

  const cn = bem('PersonalCard');

  return (
    <div className={cn()}>
      <div className={cn('data')}>
        <h1 className={cn('name')}>{name}</h1>
        <h2 className={cn('job')}>{job}</h2>
      </div>
      <img className={cn('avatar')} src={avatar}/>
    </div>
  )
}

export default PersonalCard