import { Outlet, useNavigate } from 'react-router-dom'
import TypingLogo from '../ui/TypingLogo'
import AuthorSwitch from '../ui/AuthorSwitch'
import SlashTransition from '../animations/SlashTransition'
import AdminFloatingMenu from '../admin/AdminFloatingMenu'
import { useAuth } from '../../hooks/useAuth'

export default function MainLayout() {
    const { isAuthenticated, signOut } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        await signOut()
        navigate('/login')
    }

    return (
        <div
            className="min-h-screen text-white transition-colors duration-300 relative"
            style={{ background: 'var(--bg)' }}
        >
            <SlashTransition />

            <header className="grid grid-cols-3 items-center p-6 border-b border-gray-800">
                <div className="flex justify-start">
                    <AuthorSwitch authorKey="joao" label="João" />
                </div>

                <div className="flex justify-center">
                    <TypingLogo />
                </div>

                <div className="flex justify-end">
                    <AuthorSwitch authorKey="ellen" label="Ellen" />
                </div>
            </header>

            <main className="p-6">
                <Outlet />
            </main>

            {isAuthenticated && (
                <AdminFloatingMenu onLogout={handleLogout} />
            )}
        </div>
    )
}