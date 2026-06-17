import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { KonamiProvider } from '../../context/KonamiContext'
import TypingLogo from './header/TypingLogo'
import AuthorSwitch from '../layouts/header/AuthorSwitch'
import SlashTransition from '../shared/transitions/SlashTransition'
import AdminFloatingMenu from '../admin/AdminFloatingMenu'
import Footer from './Footer'

import DevelopmentNotice from './DevelopmentNotice'

export default function MainLayout() {
    const { isAuthenticated, signOut } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        await signOut()
        navigate('/login')
    }

    return (
        <KonamiProvider disabled={isAuthenticated}>
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
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="
                                cursor-pointer
                                transition
                                hover:scale-[1.03]
                                active:scale-[0.98]
                            "
                        >
                            <TypingLogo />
                        </button>
                    </div>

                    <div className="flex justify-end">
                        <AuthorSwitch authorKey="ellen" label="Ellen" />
                    </div>
                </header>

                <DevelopmentNotice />

                <main className="p-6">
                    <Outlet />
                </main>

                {isAuthenticated && (
                    <AdminFloatingMenu onLogout={handleLogout} />
                )}

                <Footer showKonami={!isAuthenticated} />
            </div>
        </KonamiProvider>
    )
}