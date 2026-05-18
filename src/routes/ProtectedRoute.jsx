import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export default function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuthContext()
    
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#030712] text-white">
                Carregando...
            </div>
        )
    }
    
    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />
}
