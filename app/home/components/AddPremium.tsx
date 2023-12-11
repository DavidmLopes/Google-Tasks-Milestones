'use client'

import React from 'react'
import { getPremium } from './actionPremium'

export default function AddPremium({ email }: { email: string }) {
    async function action(dataForm: FormData) {
        dataForm.append('email', email)
        await getPremium(dataForm)
    }

    return (
        <form action={action}>
            <button
                type="submit"
                className="h-12 w-max whitespace-nowrap rounded-2xl bg-neutral-100 px-4 font-medium leading-[48px] hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            >
                Get Premium
            </button>
        </form>
    )
}
