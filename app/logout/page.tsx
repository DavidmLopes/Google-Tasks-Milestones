'use client'

import React, { useEffect, useRef } from 'react'
import { logoutAction } from './action'

export default function Logout() {
    const formRef = useRef<HTMLFormElement | null>(null)

    useEffect(() => {
        if (formRef.current) {
            formRef.current.requestSubmit()
        }
    }, [])

    return (
        <form ref={formRef} action={logoutAction} className="hidden">
            <button
                type="submit"
                className="h-12 rounded-2xl bg-neutral-100 p-2 px-4 font-medium hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            >
                Logout
            </button>
        </form>
    )
}
