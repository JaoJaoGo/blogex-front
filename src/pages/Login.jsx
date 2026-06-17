import { useEffect, useState } from 'react'
import { ArrowLeft, LockKeyhole } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import TypingLogo from '../components/layouts/header/TypingLogo'

export default function Login() {
    const { signIn, loading, error, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated, navigate])

    async function handleSubmit(event) {
        event.preventDefault()

        try {
            await signIn({ email, password })
            navigate('/')
        } catch {
            // O AuthContext já controla o erro.
        }
    }

    return (
        <main
            className="
                min-h-screen
                relative
                overflow-hidden
                flex
                items-center
                justify-center
                px-6
                text-white
            "
            style={{ background: 'var(--bg)' }}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />

            <button
                type="button"
                onClick={() => navigate('/')}
                className="
                    absolute
                    top-6
                    left-6
                    z-10
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.06]
                    px-4
                    py-2
                    text-sm
                    text-gray-300
                    backdrop-blur-md
                    transition
                    hover:bg-white/[0.12]
                    hover:text-white
                "
            >
                <ArrowLeft size={16} />
                Voltar
            </button>

            <form
                onSubmit={handleSubmit}
                className="
                    relative
                    z-10
                    w-full
                    max-w-md
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.05]
                    p-8
                    shadow-2xl
                    backdrop-blur-md
                "
            >
                <div className="mb-8 flex flex-col items-center text-center">
                    <div className="
                        mb-5
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-primary/15
                        text-primary
                    ">
                        <LockKeyhole size={24} />
                    </div>

                    <TypingLogo />

                    <h1 className="mt-5 text-2xl font-black">
                        Acesso administrativo
                    </h1>

                    <p className="mt-2 text-sm text-gray-400">
                        Entre para criar posts, gerenciar tags e editar seu perfil.
                    </p>
                </div>

                <div className="space-y-4">
                    <Input
                        label="E-mail"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={setEmail}
                    />

                    <Input
                        label="Senha"
                        type="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={setPassword}
                    />
                </div>

                {error && (
                    <div className="
                        mt-5
                        rounded-2xl
                        border
                        border-red-500/20
                        bg-red-500/10
                        px-4
                        py-3
                        text-sm
                        text-red-300
                    ">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="
                        mt-6
                        w-full
                        rounded-full
                        bg-primary
                        px-6
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        shadow-xl
                        transition
                        hover:brightness-110
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>
        </main>
    )
}

function Input({
    label,
    value,
    onChange,
    type = 'text',
    placeholder = '',
}) {
    return (
        <label className="block">
            <span className="mb-2 block text-sm text-gray-400">
                {label}
            </span>

            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={event => onChange(event.target.value)}
                required
                className="
                    h-12
                    w-full
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/10
                    px-4
                    text-sm
                    text-white
                    outline-none
                    transition
                    placeholder:text-gray-500
                    focus:border-primary
                "
            />
        </label>
    )
}