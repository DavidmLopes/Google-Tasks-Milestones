'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logoutAction() {
    cookies().delete('email')
    cookies().delete('access_token')
    cookies().delete('github_name')
    cookies().delete('github_access_token')
    redirect('/')
}
