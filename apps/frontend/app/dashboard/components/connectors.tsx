'use client'

async function connect(provider: "gmail" | "googlecalender") {
    const res = await fetch("http://localhost:8000/api/integration/connect", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            provider: "google"
        })        
    })

    const { connectUrl } = await res.json()

    window.location.href = connectUrl
}

export default function ConnectToGmail({ provider, label }: { provider: "gmail" | "googlecalender", label: string }) {
    return (
        <button onClick={() => connect(provider)}>{label}</button>
    )
}