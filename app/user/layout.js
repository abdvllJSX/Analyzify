"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const layout = ({children}) => {
    const { status } = useSession()
    const router = useRouter()
    status === "unauthenticated" && router.push('/') 
  return (
    <div>
        {status !== "unauthenticated" && children}
    </div>
  )
}

export default layout