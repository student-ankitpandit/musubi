'use client'

async function connect () {
    const res = await fetch("http://localhost:8000/api/integration/connect", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            provider: "googlecalendar"
        })
    })

    const { connectUrl } = await res.json()
    window.location.href = connectUrl
}

export function ConnectToCalender() {
    return <button onClick={connect}>Connect to Google Calender</button>
} 