import NavBar from './NavBar'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <NavBar />
            <main className="p-4">{children}</main>
        </div>
    )
}
