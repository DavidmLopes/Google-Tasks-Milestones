import { type NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get('code') ?? ''

    const form = new FormData()
    form.append('code', code ? code : '')
    form.append('client_id', process.env.CLIENT_ID ? process.env.CLIENT_ID : '')
    form.append(
        'client_secret',
        process.env.CLIENT_SECRET ? process.env.CLIENT_SECRET : '',
    )
    form.append('redirect_uri', 'http://localhost:3000/api/callback') // TODO: Maybe not good to hardcode this
    form.append('grant_type', 'authorization_code')

    const { email, access_token } = await fetch(
        'https://www.googleapis.com/oauth2/v3/token',
        {
            method: 'POST',
            body: form,
        },
    )
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            const jwt_payload = jwt.decode(data.id_token) as { email: string }
            return {
                email: jwt_payload.email,
                access_token: data.access_token,
            }
        })

    cookies().set('email', email)
    cookies().set('access_token', access_token)

    redirect('/home')
}
