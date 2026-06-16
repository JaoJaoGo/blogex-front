export default function MatrixBackground() {
    const columns = Array.from({ length: 32 })

    return (
        <div className="absolute inset-0 overflow-hidden opacity-60">
            {columns.map((_, index) => (
                <span
                    key={index}
                    className="matrix-rain absolute top-[-30%] text-green-300 text-xs font-mono"
                    style={{
                        left: `${index * 3.4}%`,
                        animationDelay: `${index * 0.18}s`,
                        animationDuration: `${5 + (index % 6)}s`,
                    }}
                >
                    {generateMatrixText()}
                </span>
            ))}
        </div>
    )
}

function generateMatrixText() {
    return Array.from({ length: 18 })
        .map(() => Math.round(Math.random()))
        .join('\n')
}