import prisma from "../lib/prisma"
import { unstable_noStore as noStore } from 'next/cache'
export default async function getUserFromDb(email: string) {
  noStore();
  
  return await prisma.user.findFirst({
    where: {
      email,
    },
  })
}
