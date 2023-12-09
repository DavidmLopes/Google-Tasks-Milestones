import Link from 'next/link'
import ThemeButton from '@components/ThemeButton'

export default function Home() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-5">
            <ThemeButton />
            <div className="text-center text-4xl font-medium">
                Google Taks Milestones
            </div>
            <Link href={'/login'}>
                <div className="rounded-lg bg-highlights px-6 py-2 text-center font-medium hover:bg-highlights-h">
                    Login
                </div>
            </Link>
        </div>
    )
}
