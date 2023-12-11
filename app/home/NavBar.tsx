import React from 'react'
import ThemeButton from '@components/ThemeButton'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { getUserInfo } from '@/lib/googleTasks'
import AddPremium from './AddPremium'

export default async function NavBar() {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('access_token')?.value ?? ''
    const email = cookieStore.get('email')?.value ?? ''

    const { name, image } = await getUserInfo(accessToken)

    return (
        <nav className="flex w-full items-center justify-end gap-4 bg-neutral-400 p-4 dark:bg-neutral-600">
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
            <AddPremium email={email} />
            <Link href={'/logout'}>
                <div className="h-12 rounded-2xl bg-neutral-100 px-4 font-medium leading-[48px] hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                    Logout
                </div>
            </Link>
            <ThemeButton />
        </nav>
    )
}
