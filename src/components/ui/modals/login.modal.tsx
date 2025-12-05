"use client"

import LoginForm from "@/src/forms/login.form"
import CustomModal from "../common/modal"
interface IProps {
  onClose: () => void
  isOpen: boolean
}
const LoginModal = ({ onClose, isOpen }: IProps) => {
  return (
    <CustomModal onClose={onClose} isOpen={isOpen} title='Log in'>
      <LoginForm onClose={onClose} />
    </CustomModal>
  )
}

export default LoginModal
