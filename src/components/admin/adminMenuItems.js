import {
    FilePlus,
    Tag,
    User,
    LogOut
} from 'lucide-react'

export const adminMenuItems = [
    {
        key: 'create-post',
        label: 'Novo post',
        icon: FilePlus,
        to: '/admin/posts/create',
    },
    {
        key: 'tags',
        label: 'Tags',
        icon: Tag,
        to: '/admin/tags',
    },
    {
        key: 'profile',
        label: 'Perfil',
        icon: User,
        to: '/admin/profile',
    },
    {
        key: 'logout',
        label: 'Sair',
        icon: LogOut,
        action: 'logout',
        variant: 'danger',
    },
]