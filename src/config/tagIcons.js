import {
    Code,
    Terminal,
    Database,
    Palette,
    PenTool,
    BookOpen,
    Rocket,
    Brain,
    Sparkles,
    Blocks,
} from 'lucide-react'

export const tagIconMap = {
    code: Code,
    terminal: Terminal,
    database: Database,
    palette: Palette,
    figma: Blocks,
    pen: PenTool,
    'book-open': BookOpen,
    rocket: Rocket,
    brain: Brain,
    sparkles: Sparkles,
}

export function getTagIcon(iconKey) {
    return tagIconMap[iconKey] ?? null
}