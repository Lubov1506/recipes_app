"use client"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react"
import Image from "next/image"
import Link from "next/link"

export const AcmeLogo = () => {
  return <Image src='/cocktails.png' height={48} width={48} alt='Cocktails' />
}

export default function Header() {
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
        {navItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link color='foreground' href={item.href}>
              Features
            </Link>
          </NavbarItem>
        ))}

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
