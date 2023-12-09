import React from 'react'
import ThemeButton from '@components/ThemeButton'
import { cookies } from 'next/headers'
import Image from 'next/image'
import LogoutButton from '../components/LogoutButton'

export default async function NavBar() {
    const cookieStore = cookies()

    const { name, image } = await fetch(
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
            return {
                fullName: data.name,
                name: data.given_name,
                image: data.picture,
            }
        })

    return (
        <nav className="flex w-full items-center justify-end gap-4 bg-neutral-300 p-4 dark:bg-neutral-700">
            <div className="w-full text-3xl font-bold">
                <h1>Google Tasks Milestones</h1>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-neutral-100 p-2 dark:bg-neutral-900">
                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                    <Image
                        src={image}
                        width={32}
                        height={32}
                        style={{ objectFit: 'cover' }}
                        alt={'Image'}
                    />
                </div>
                {name}
            </div>
            <LogoutButton />
            <ThemeButton />
        </nav>
    )
}
