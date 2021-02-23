import './styles.css'
import { ContainerProps } from './ContainerProps'

export function Container ({ children }: ContainerProps) {
  return (
    <div className="container">
      {children}
    </div>
  )
}
