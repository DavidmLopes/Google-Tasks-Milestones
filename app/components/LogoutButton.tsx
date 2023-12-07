import React from 'react'
import { logoutAction } from './LogoutAction'

export default function LogoutButton() {
    return (
        <form action={logoutAction}>
            <button
                type="submit"
                className="h-12 rounded-2xl bg-neutral-100 p-2 px-4 font-medium hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            >
                Logout
            </button>
        </form>
    )
}
