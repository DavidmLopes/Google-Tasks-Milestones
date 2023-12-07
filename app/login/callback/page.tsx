import React from 'react'
import jwt from 'jsonwebtoken'

export default async function Callback({
    searchParams,
}: {
    searchParams: { code: string }
}) {
    const form = new FormData()
    form.append('code', searchParams.code)
    form.append('client_id', process.env.CLIENT_ID ? process.env.CLIENT_ID : '')
    form.append(
        'client_secret',
        process.env.CLIENT_SECRET ? process.env.CLIENT_SECRET : '',
    )
    form.append('redirect_uri', 'http://localhost:3000/login/callback') // TODO: Maybe not good to hardcode this
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
            console.log(data)
            const jwt_payload = jwt.decode(data.id_token) as { email: string }
            return {
                email: jwt_payload.email,
                access_token: data.access_token,
            }
        })

    return (
        <div>
            Callback Hello, {email}, here is your access token = {access_token}
        </div>
    )
}
