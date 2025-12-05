"use client"

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react"
import { ReactNode } from "react"
interface IProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  title: string
}
const CustomModal = ({
  onClose,
  isOpen,
  size = "xs",
  title,
  children,
}: IProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>
          <h3 className='text-xl text-background font-semibold'>{title}</h3>
        </ModalHeader>
        <ModalBody className='space-y-4 py-6'>{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CustomModal
