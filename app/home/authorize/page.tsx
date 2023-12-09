import { redirect } from 'next/navigation'

export default function Login() {
    redirect(
        'https://github.com/login/oauth/authorize?' +
            `client_id=${process.env.GITHUB_CLIENT_ID}` +
            '&redirect_uri=http://localhost:3000/api/callback/github' +
            '&response_type=code' +
            '&scope=repo:read',
    )
}
