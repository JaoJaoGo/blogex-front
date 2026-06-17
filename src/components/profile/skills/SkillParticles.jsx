import { useMemo } from 'react'

export default function SkillParticles({
    level = 1,
    color = 'rgba(110, 231, 183, 1)',
}) {
    const particles = useMemo(() => {
        const amount = 6 + level * 5

        return Array.from({ length: amount }).map((_, index) => ({
            id: index,
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            size: `${2 + Math.random() * (level + 2)}px`,
            delay: `${Math.random() * 2.5}s`,
            duration: `${3.5 + Math.random() * 3}s`,
            opacity: 0.18 + level * 0.1,
        }))
    }, [level])

    return (
        <div
            className="
                pointer-events-none
                absolute
                inset-0
                overflow-hidden
            "
            aria-hidden="true"
        >
            {particles.map(particle => (
                <span
                    key={particle.id}
                    className="skill-particle absolute rounded-full"
                    style={{
                        left: particle.x,
                        top: particle.y,
                        width: particle.size,
                        height: particle.size,
                        opacity: particle.opacity,
                        backgroundColor: color,
                        boxShadow: `0 0 ${6 + level * 4}px ${color}`,
                        animationDelay: particle.delay,
                        animationDuration: particle.duration,
                    }}
                />
            ))}
        </div>
    )
}