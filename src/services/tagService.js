import api from './api'

export async function listTags(params = {}) {
    const response = await api.get('/tags',
        {
            params
        }
    )

    return response.data
}

export async function listTagIcons() {
    const response = await api.get('/tags/icons')

    return response.data
}

export async function createTag(payload) {
    const response = await api.post('/tags', payload)

    return response.data
}

export async function updateTag(id, payload) {
    const response = await api.put(`/tags/${id}`, payload)

    return response.data
}

export async function deleteTag(id) {
    await api.delete(`/tags/${id}`)
}