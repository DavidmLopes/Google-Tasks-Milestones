import React from 'react'
import ThemeButton from '@components/ThemeButton'
import { cookies } from 'next/headers'
import Image from 'next/image'

export default async function NavBar() {
    const cookieStore = cookies()

    const { name, image } = await fetch(
        'https://openidconnect.googleapis.com/v1/userinfo',
        {
            method: 'POST',
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
            return { name: data.given_name, image: data.picture }
        })

    return (
        <nav className="flex w-full items-center justify-end gap-4 bg-neutral-300 p-4 dark:bg-neutral-700">
            <div className="w-full text-3xl font-bold">
                Google Tasks Milestones
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-neutral-100 p-2 dark:bg-neutral-900">
                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                    <Image
                        src={image}
                        fill
                        style={{ objectFit: 'cover' }}
                        alt={'Image'}
                    />
                </div>
                {name}
            </div>
            <ThemeButton />
        </nav>
    )
}
