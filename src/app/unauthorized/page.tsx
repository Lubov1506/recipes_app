"use client"
import { useSearchParams } from "next/navigation"

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const message = searchParams.get("message") || "Some error"

  return (
    <div className='flex justify-center items-center bg-red-800 p-4 px-8 rounded-3xl'>
      <p className='text-white xl font-bold uppercase'>{message}</p>
    </div>
  )
}
