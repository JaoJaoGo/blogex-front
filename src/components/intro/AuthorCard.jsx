import { motion } from 'framer-motion'

export default function AuthorCard({
    name,
    description,
    avatar,
    tags = [],
    variant = 'joao',
    onClick,
}) {
    return (
        <motion.button
            type="button"
            onClick={onClick}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="
                w-[300px]
                rounded-2xl
                bg-black/25
                border
                border-white/5
                shadow-2xl
                px-8
                py-7
                text-center
                backdrop-blur-md
                transition
            "
        >
            <div
                className="
                    w-24
                    h-24
                    mx-auto
                    mb-6
                    rounded-full
                    overflow-hidden
                    border
                    border-white/10
                    bg-white/10
                    flex
                    items-center
                    justify-center
                    shadow-xl
                "
            >
                {avatar ? (
                    <img
                        src={avatar}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-3xl font-black text-primary">
                        {name?.charAt(0)}
                    </span>
                )}
            </div>

            <h2 className="text-2xl font-bold mb-4">
                {name}
            </h2>

            <p className="text-sm text-gray-400 leading-relaxed mb-5">
                {description}
            </p>

            <div className="flex justify-center gap-2 flex-wrap mb-7">
                {tags.map(tag => (
                    <span
                        key={tag}
                        className={`
                            text-xs
                            px-3
                            py-1
                            rounded-md
                            border
                            ${variant === 'joao'
                                ? 'border-primary text-primary'
                                : 'border-accent text-accent'
                            }
                        `}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div
                className={`
                    w-full
                    rounded-full
                    py-2
                    text-sm
                    font-semibold
                    ${variant === 'joao'
                        ? 'bg-primary text-white'
                        : 'bg-accent text-white'
                    }
                `}
            >
                Ver blog
            </div>
        </motion.button>
    )
}