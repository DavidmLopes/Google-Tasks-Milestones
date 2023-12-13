import React from 'react'
import ThemeButton from '@components/ThemeButton'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { getUserInfo } from '@/lib/googleTasks'
import AddPremium from './components/AddPremium'
import { getRole } from '@/lib/casbin'
import RemovePremium from './components/RemovePremium'
import { getUser } from '@/lib/users'

export default async function NavBar() {
    const cookieStore = cookies()
    const userToken = cookieStore.get('userToken')?.value ?? ''
    const user = await getUser(userToken)

    const { name, image } = await getUserInfo(user.accessToken)

    const role = await getRole(user.email)

    return (
        <nav className="flex w-full items-center justify-end gap-4 bg-neutral-400 p-4 dark:bg-neutral-600">
            <div className="w-full text-3xl font-bold">
                <h1>Google Tasks Milestones</h1>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap rounded-2xl bg-neutral-100 p-2 dark:bg-neutral-900">
                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                    <Image
                        src={image}
                        width={32}
                        height={32}
                        style={{ objectFit: 'cover' }}
                        alt={'Image'}
                    />
                </div>
                {name + ' ( ' + role + ' )'}
            </div>
            {role === 'premium' ? (
                <RemovePremium email={user.email} />
            ) : (
                <AddPremium email={user.email} />
            )}
            <Link href={'/logout'}>
                <div className="h-12 rounded-2xl bg-neutral-100 px-4 font-medium leading-[48px] hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                    Logout
                </div>
            </Link>
            <ThemeButton />
        </nav>
    )
}
