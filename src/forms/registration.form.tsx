"use client"

import { Button, Form, Input } from "@heroui/react"
import { useState } from "react"
import { registerUser } from "../actions/register"

interface IProps {
  onClose: () => void
}
const RegistrationForm = ({ onClose }: IProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    console.log("Submitted", formData)
    const result = await registerUser(formData)
    console.log(result)

    onClose()
  }
  return (
    <Form onSubmit={handleSubmit} className='w-full'>
      <Input
        aria-label='Email'
        isRequired
        name='email'
        placeholder='type email'
        type='email'
        value={formData.email}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focus:outline-none",
        }}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        validate={(value) => {
          if (!value) return "Email is required!"
          if (!validateEmail(value)) return "Incorrect emil!"
          return null
        }}
      />
      <Input
        aria-label='Password'
        isRequired
        name='password'
        placeholder='type password'
        type='password'
        value={formData.password}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focus:outline-none",
        }}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        validate={(value) => {
          if (!value) return "Password is required!"
          if (value.length < 6) return "Password must be not less 6 symbols!"
          return null
        }}
      />
      <Input
        aria-label='Password'
        isRequired
        name='confirmPassword'
        placeholder='confirm password'
        type='password'
        value={formData.confirmPassword}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focus:outline-none",
        }}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
        validate={(value) => {
          if (!value) return "Confirm password is required!"
          if (value !== formData.password) return "Passwords must be the same!"
          return null
        }}
      />
      <div className='flex w-[100%] gap-4 items-center pt-8 justify-end'>
        <Button onPress={onClose} variant='light'>
          Cancel
        </Button>
        <Button type='submit' color='primary'>
          Sin Up
        </Button>
      </div>
    </Form>
  )
}

export default RegistrationForm
