"use client"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const AcmeLogo = () => {
  return <Image src='/cocktails.png' height={48} width={48} alt='Cocktails' />
}

export default function Header() {
  const pathname = usePathname()
  const navItems = [
    { href: "/", title: "Recipes" },
    { href: "/ingredients", title: "Ingredients" },
    { href: "/about", title: "About" },
  ]

  return (
    <Navbar>
      <NavbarBrand>
        <AcmeLogo />
        <p className='font-bold text-inherit'>ACME</p>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <NavbarItem key={item.href}>
              <Link color='foreground' href={item.href} className={clsx('hover:scale-75 hover:text transition-all duration-200', isActive && 'text-teal-500')}>
                {item.title}
              </Link>
            </NavbarItem>
          )
        })}
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem className='hidden lg:flex'>
          <Link href='#'>Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color='primary' href='#' variant='flat'>
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
