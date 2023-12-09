import { type NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get('code') ?? ''

    const form = new FormData()
    form.append('code', code ? code : '')
    form.append(
        'client_id',
        process.env.GITHUB_CLIENT_ID ? process.env.GITHUB_CLIENT_ID : '',
    )
    form.append(
        'client_secret',
        process.env.GITHUB_CLIENT_SECRET
            ? process.env.GITHUB_CLIENT_SECRET
            : '',
    )
    form.append('redirect_uri', 'http://localhost:3000/api/callback/github') // TODO: Maybe not good to hardcode this

    const { access_token } = await fetch(
        'https://github.com/login/oauth/access_token',
        {
            method: 'POST',
            body: form,
            headers: { Accept: 'application/json' },
        },
    )
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            return data
        })

    const { name } = await fetch('https://api.github.com/user', {
        headers: {
            Authorization: `token ${access_token}`,
        },
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            return { name: data.login }
        })

    cookies().set('github_name', name)
    cookies().set('github_access_token', access_token)

    redirect('/home')
}
