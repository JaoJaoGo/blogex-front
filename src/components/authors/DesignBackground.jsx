export default function DesignBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden opacity-70">
            <div className="design-orb absolute left-[8%] top-[20%] h-28 w-28 rounded-full border border-white/20" />
            <div className="design-orb-delay absolute right-[12%] top-[18%] h-20 w-20 rounded-3xl border border-pink-300/30 rotate-12" />
            <div className="design-orb absolute bottom-[12%] left-[28%] h-16 w-16 rounded-full bg-white/10 blur-sm" />
            <div className="design-grid absolute inset-0" />
        </div>
    )
}