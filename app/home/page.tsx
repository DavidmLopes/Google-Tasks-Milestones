import React from 'react'
import { cookies } from 'next/headers'

export default async function Home() {
    const cookieStore = cookies()

    const { name } = await fetch(
        'https://openidconnect.googleapis.com/v1/userinfo',
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${cookieStore.get('access_token')
                    ?.value}`,
            },
        },
    )
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            return { name: data.name }
        })

    return <div>Home, {name}</div>
}
