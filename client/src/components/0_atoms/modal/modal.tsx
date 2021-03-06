import React, { useContext } from 'react'
// Hooks
import { useToggle } from '../../../hooks'

interface IModalProps {
  /** Children nodes */
  children: React.ReactNode
  /** Additional css ui class */
  className?: string
  /** Style CSS */
  style?: React.CSSProperties
  /** Open the modal */
  isOpen?: boolean
}

const modalContext = React.createContext({
  on: false,
  toggler: () => {
    return
  }
})

const useModalContext = () => {
  const context = useContext(modalContext)
  if (!context) {
    throw new Error('Should be inside the Modal comoponent')
  }
  return context
}

export const ModalContainer = ({ children }: IModalProps) => {
  const { on, toggler } = useToggle(false)
  return (
    <modalContext.Provider value={{ on, toggler }}>
      {children}
    </modalContext.Provider>
  )
}

const Modal = ({ children, className, ...rest }: IModalProps) => {
  const { on } = useModalContext()
  return (
    <div className={`modal ${className} ${on ? 'is-active' : ''}`} {...rest}>
      {children}
      <div className="modal-background" {...rest} />
    </div>
  )
}

const Content = ({ children, ...rest }: IModalProps) => (
  <div className="modal-content" {...rest}>
    {children}
  </div>
)

const Trigger = ({ children, ...rest }: IModalProps) => {
  const { toggler } = useModalContext()
  return (
    <div {...rest} onClick={toggler}>
      {children}
    </div>
  )
}

const Close = ({ children, ...rest }: IModalProps) => {
  const { toggler } = useModalContext()
  return (
    <div className="modal-close" onClick={toggler} {...rest}>
      {children}
    </div>
  )
}

ModalContainer.Modal = Modal

Modal.Content = Content
Modal.Close = Close
Modal.Trigger = Trigger
