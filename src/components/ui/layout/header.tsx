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
import { siteConfig } from "../../../config/site.config"
import { layoutConfig } from "../../../config/layout.config"
import RegistrationModal from "../modals/registration.modal"
import { useState } from "react"
import LoginModal from "../modals/login.modal"
import signOutFunc from "@/src/actions/sign-out"
import { useAuthStore } from "@/src/store/auth.store"

export const Logo = () => {
  return (
    <Image
      src='/pizza.png'
      height={26}
      width={26}
      style={{ width: "26px", height: "26px" }}
      alt='Pizzas'
    />
  )
}

export default function Header() {
  const pathname = usePathname()
  const { isAuth, status, session, setAuthState } = useAuthStore()
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOutFunc()
    } catch (error) {
      console.log(error, "error")
    }
    setAuthState("unauthenticated", null)
  }

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
      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <NavbarContent justify='end' className='p-0'>
          {isAuth && <p>Hi, {session?.user?.email} </p>}
          {!isAuth ? (
            <>
              <NavbarItem className='hidden lg:flex'>
                <Button
                  as={Link}
                  color='success'
                  href='#'
                  variant='flat'
                  onPress={() => setIsLoginOpen(true)}
                >
                  Sign In
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button
                  as={Link}
                  color='primary'
                  href='#'
                  variant='flat'
                  onPress={() => setIsRegistrationOpen(true)}
                >
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          ) : (
            <NavbarItem className='hidden lg:flex'>
              <Button
                as={Link}
                color='success'
                href='#'
                variant='flat'
                onPress={handleSignOut}
              >
                Sign Out
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>
      )}

      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </Navbar>
  )
}
