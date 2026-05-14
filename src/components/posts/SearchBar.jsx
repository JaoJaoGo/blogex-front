import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function SearchBar({ value = '', onSearch }) {
    const [search, setSearch] = useState(String(value ?? ''))

    useEffect(() => {
        setSearch(String(value ?? ''))
    }, [value])

    function handleSubmit(event) {
        event.preventDefault()

        onSearch(search.trim())
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl mx-auto flex items-center gap-2"
        >
            <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Pesquisar"
                className="
                    flex-1 h-10 rounded-full px-5 text-sm
                    bg-white text-gray-900 outline-none
                "
            />

            <button
                type="submit"
                className="
                    w-11 h-10 rounded-full flex items-center justify-center
                    bg-accent text-white hover:opacity-90 transition
                "
            >
                <Search size={17} />
            </button>
        </form>
    )
}