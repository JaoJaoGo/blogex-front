import api from './api'

export async function showAuthor(author) {
    const response = await api.get(`/authors/${author}`)

    return response.data.data
}