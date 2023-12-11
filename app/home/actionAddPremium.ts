'use server'

import { addPremium } from '@/lib/casbin'
import { revalidatePath } from 'next/cache'

export async function getPremium(dataForm: FormData) {
    const email = dataForm.get('email')?.toString()
    if (!email) return
    await addPremium(email)
    revalidatePath('/home')
}
