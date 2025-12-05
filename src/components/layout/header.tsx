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
import { usePathname } from "next/navigation"
import { siteConfig } from "../../config/site.config"
import { layoutConfig } from "../../config/layout.config"

export const Logo = () => {
  return <Image src='/pizza.png' height={26} width={26} alt='Pizzas' />
}

export default function Header() {
  const pathname = usePathname()
  const getNavItems = () => {
    return siteConfig.navItems.map((item) => {
      const isActive = pathname === item.href
      return (
        <NavbarItem key={item.href}>
          <Link
            color='foreground'
            href={item.href}
            className={`hover:scale-75 hover:text transition-all duration-200
            ${isActive && "text-teal-500"}`}
          >
            {item.title}
          </Link>
        </NavbarItem>
      )
    })
  }
  return (
    <Navbar
      
      style={{
        height: `${layoutConfig.headerHeight}`,
      }}
    >
      <NavbarBrand className='p-0'>
        <Link href='/' className='flex gap-3'>
          <Logo />
          <p className='font-bold text-inherit'>Pizza</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        {getNavItems()}
      </NavbarContent>
      <NavbarContent justify='end' className='p-0'>
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
