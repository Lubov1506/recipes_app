"use client"
import { Button, Form, Input } from "@heroui/react"
import { useState } from "react"
import { signInWithCredentials } from "../actions/sign-in"

interface IProps {
  onClose: () => void
}
const LoginForm = ({ onClose }: IProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signInWithCredentials(formData.email, formData.password)
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
          return null
        }}
      />
      <div className='flex w-[100%] gap-4 items-center pt-8 justify-end'>
        <Button onPress={onClose} variant='light'>
          Cancel
        </Button>
        <Button type='submit' color='primary'>
          Login
        </Button>
      </div>
    </Form>
  )
}

export default LoginForm
