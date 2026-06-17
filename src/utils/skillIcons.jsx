import * as SiIcons from 'react-icons/si'
import { Star } from 'lucide-react'

const ICON_RULES = [
    {
        terms: ['javascript', 'js'],
        iconNames: ['SiJavascript'],
    },
    {
        terms: ['typescript', 'ts'],
        iconNames: ['SiTypescript'],
    },
    {
        terms: ['c++', 'cpp'],
        iconNames: ['SiCplusplus'],
    },
    {
        terms: ['css'],
        iconNames: ['SiCss3'],
    },
    {
        terms: ['html'],
        iconNames: ['SiHtml5'],
    },
    {
        terms: ['react'],
        iconNames: ['SiReact'],
    },
    {
        terms: ['laravel'],
        iconNames: ['SiLaravel'],
    },
    {
        terms: ['vite'],
        iconNames: ['SiVite'],
    },
    {
        terms: ['mysql'],
        iconNames: ['SiMysql'],
    },
    {
        terms: ['redis'],
        iconNames: ['SiRedis'],
    },
    {
        terms: ['git'],
        iconNames: ['SiGit'],
    },
    {
        terms: ['github'],
        iconNames: ['SiGithub'],
    },
    {
        terms: ['aws', 'amazon'],
        iconNames: ['SiAmazonaws', 'SiAmazonwebservices'],
    },
    {
        terms: ['php'],
        iconNames: ['SiPhp'],
    },
    {
        terms: ['figma'],
        iconNames: ['SiFigma'],
    },
    {
        terms: ['adobe xd', 'xd'],
        iconNames: ['SiAdobexd'],
    },
    {
        terms: ['photoshop'],
        iconNames: ['SiAdobephotoshop'],
    },
    {
        terms: ['illustrator'],
        iconNames: ['SiAdobeillustrator'],
    },
    {
        terms: ['tailwind', 'tailwind css'],
        iconNames: ['SiTailwindcss'],
    },
    {
        terms: ['docker'],
        iconNames: ['SiDocker'],
    },
    {
        terms: ['node', 'node.js', 'nodejs'],
        iconNames: ['SiNodedotjs', 'SiNodejs'],
    },
    {
        terms: ['next', 'next.js', 'nextjs'],
        iconNames: ['SiNextdotjs'],
    },
    {
        terms: ['vue', 'vue.js', 'vuejs'],
        iconNames: ['SiVuedotjs'],
    },
    {
        terms: ['angular'],
        iconNames: ['SiAngular'],
    },
    {
        terms: ['sass', 'scss'],
        iconNames: ['SiSass'],
    },
    {
        terms: ['bootstrap'],
        iconNames: ['SiBootstrap'],
    },
    {
        terms: ['postgres', 'postgresql'],
        iconNames: ['SiPostgresql'],
    },
    {
        terms: ['mongodb', 'mongo'],
        iconNames: ['SiMongodb'],
    },
    {
        terms: ['firebase'],
        iconNames: ['SiFirebase'],
    },
    {
        terms: ['linux'],
        iconNames: ['SiLinux'],
    },
    {
        terms: ['ubuntu'],
        iconNames: ['SiUbuntu'],
    },
    {
        terms: ['wordpress'],
        iconNames: ['SiWordpress'],
    },
    {
        terms: ['vercel'],
        iconNames: ['SiVercel'],
    },
    {
        terms: ['netlify'],
        iconNames: ['SiNetlify'],
    },
    {
        terms: ['canva'],
        iconNames: ['SiCanva'],
    },
    {
        terms: ['notion'],
        iconNames: ['SiNotion'],
    },
    {
        terms: ['trello'],
        iconNames: ['SiTrello'],
    },
    {
        terms: ['jira'],
        iconNames: ['SiJira'],
    },
    {
        terms: ['database', 'banco de dados', 'db'],
        iconNames: ['SiDatabricks', 'SiMysql'],
    },
]

export function getSkillIcon(skillName = '') {
    const normalized = normalizeSkillName(skillName)

    const matches = ICON_RULES
        .map(rule => {
            const matchedTerm = rule.terms.find(term =>
                normalized.includes(normalizeSkillName(term))
            )

            if (!matchedTerm) {
                return null
            }

            return {
                rule,
                index: normalized.indexOf(normalizeSkillName(matchedTerm)),
            }
        })
        .filter(Boolean)
        .sort((a, b) => a.index - b.index)

    const firstMatch = matches[0]

    if (!firstMatch) {
        return Star
    }

    const icon = getFirstAvailableIcon(firstMatch.rule.iconNames)

    return icon ?? Star
}

function getFirstAvailableIcon(iconNames = []) {
    for (const iconName of iconNames) {
        if (SiIcons[iconName]) {
            return SiIcons[iconName]
        }
    }

    return null
}

function normalizeSkillName(value = '') {
    return String(value)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
}