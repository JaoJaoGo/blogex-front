export function getAuthorKey(user) {
    if (!user) {
        return null
    }

    const authorMap = {
        1: 'joao',
        2: 'ellen',
    }

    return authorMap[user.id] ?? null
}