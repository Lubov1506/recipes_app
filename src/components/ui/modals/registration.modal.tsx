"use client"
import RegistrationForm from "@/src/forms/registration.form"
import CustomModal from "../common/modal"
interface IProps {
  onClose: () => void
  isOpen: boolean
}
const RegistrationModal = ({ onClose, isOpen }: IProps) => {
  return (
    <CustomModal onClose={onClose} isOpen={isOpen} title='Create an account'>
      <RegistrationForm onClose={onClose}/>
    </CustomModal>
  )
}

export default RegistrationModal
