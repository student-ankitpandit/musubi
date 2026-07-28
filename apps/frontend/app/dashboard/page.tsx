'use client'

import {authClient} from "@/lib/auth-client"
import { ConnectToGmail } from "@/app/components/gmail-connector"
import { ConnectToCalender } from "../components/gcalender-connector"

export default function DashboardPage() {
    const { data: session, isPending } = authClient.useSession()

    if(isPending) return <p>Loading...</p>
    if(!session) return <p>Not signed in</p>

    return (
        <div>
            <p>Welcome, {session.user.name}</p>
            <ConnectToGmail />
            <ConnectToCalender />
        </div>
    )
    
}