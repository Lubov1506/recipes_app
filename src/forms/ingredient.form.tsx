"use client"
import { Button, Form, Input, Select, SelectItem } from "@heroui/react"
import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "../constants/select-options"
import { useState } from "react"

const IngredientForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    unit: "",
    pricePerUnit: null as number | null,
    description: "",
  })
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("form submitted", formData)
  }
  return (
    <Form onSubmit={handleSubmit} className='w-[400px]'>
      <Input
        isRequired
        aria-label='name'
        name='name'
        type='text'
        placeholder="Type ingredient's name"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focus:outline-none",
        }}
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        validate={(value) => {
          if (!value) return "Name is required"
          return null
        }}
      />
      <div className='flex gap-2 w-full'>
        <div className='w-1/3'>
          <Select
            isRequired
            aria-label='category'
            name='category'
            placeholder='Type category'
            selectedKeys={formData.category ? [formData.category] : []}
            classNames={{
              trigger: "bg-default-100 w-full",
              innerWrapper: "text-sm",
              value: "truncate",
              selectorIcon: "text-black",
            }}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {CATEGORY_OPTIONS.map((option) => (
              <SelectItem key={option.value} className='text-black'>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className='w-1/3'>
          <Select
            isRequired
            aria-label='unit'
            name='unit'
            placeholder='Unit'
            selectedKeys={formData.unit ? [formData.unit] : []}
            classNames={{
              trigger: "bg-default-100 w-full",
              innerWrapper: "text-sm",
              value: "truncate",
              selectorIcon: "text-black",
            }}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
          >
            {UNIT_OPTIONS.map((option) => (
              <SelectItem key={option.value} className='text-black'>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className='w-1/3'>
          <Input
            isRequired
            aria-label='pricePerUnit'
            name='pricePerUnit'
            placeholder='Price'
            type='number'
            value={
              formData.pricePerUnit !== null
                ? formData.pricePerUnit.toString()
                : ""
            }
            classNames={{
              inputWrapper: "bg-default-100",
              input: "text-sm focus:outline-none",
            }}
            onChange={(e) => {
              const value = e.target.value ? parseFloat(e.target.value) : null
              setFormData({ ...formData, pricePerUnit: value })
            }}
            endContent={
              <span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-default-500 pointer-events-none'>
                ₽
              </span>
            }
            validate={(value) => {
              if (!value) return "Price is required"
              const num = parseFloat(value)
              if (isNaN(num) || num < 0) return "Price should be more than 0"
              return null
            }}
          />
        </div>
      </div>
      <Input
        name='description'
        placeholder='Description (not required)'
        type='text'
        value={formData.description}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focus:outline-none",
        }}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <div className='flex w-full items-center justify-end'>
        <Button color='primary' type='submit'>
          Add ingredient
        </Button>
      </div>
    </Form>
  )
}

export default IngredientForm
