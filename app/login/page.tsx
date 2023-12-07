import { redirect } from 'next/navigation'

export default function Login() {
    redirect(
        'https://accounts.google.com/o/oauth2/v2/auth?' +
            `client_id=${process.env.CLIENT_ID}` +
            '&redirect_uri=http://localhost:3000/api/callback' +
            '&response_type=code' +
            '&scope=openid%20profile%20email',
    )
}
