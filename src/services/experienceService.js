import api from './api'

export async function listExperiences() {
    const response = await api.get('/me/experiences')

    return response.data
}

export async function createExperience(payload) {
    const response = await api.post('/me/experiences', payload)

    return response.data
}

export async function updateExperience(id, payload) {
    const response = await api.put(`/me/experiences/${id}`, payload)

    return response.data
}

export async function deleteExperience(id) {
    await api.delete(`/me/experiences/${id}`)
}