export default function EmptyPosts() {
    return (
        <div
            className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
                p-10
                text-center
                text-gray-400
            "
        >
            <h2 className="text-xl font-bold text-white mb-2">
                Nenhum post encontrado.
            </h2>

            <p>
                Ainda não existe nenhum artigo publicado para essa seleção.
            </p>
        </div>
    )
}