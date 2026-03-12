import { getToken } from "next-auth/jwt"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  })
  const protectedRoutes = ["/ingredients", "/recipes/new", "/recipes/:path*"]
  if (protectedRoutes.some((route) => pathname.startsWith(route.replace(':path', '')))) {
    if (!token) {
      const url = new URL("/unauthorized", request.url)
      url.searchParams.set("message", "Not enough rights")
      console.log(url);
      
      return NextResponse.redirect(url)
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/ingredients", "/recipes/new", "/recipes/:path*"],
}
