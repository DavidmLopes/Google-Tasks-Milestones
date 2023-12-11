'use client'

import { addPremium } from '@/lib/casbin'
import React from 'react'

export default function AddPremium({ email }: { email: string }) {
    return (
        <button
            className="h-12 w-max whitespace-nowrap rounded-2xl bg-neutral-100 px-4 font-medium leading-[48px] hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            onClick={async () => {
                await addPremium(email)
            }}
        >
            Get Premium
        </button>
    )
}
