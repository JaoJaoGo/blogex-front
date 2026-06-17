import api from './api'

export async function listSkills() {
    const response = await api.get('/me/skills')

    return response.data
}

export async function createSkill(payload) {
    const response = await api.post('/me/skills', payload)

    return response.data
}

export async function updateSkill(id, payload) {
    const response = await api.put(`/me/skills/${id}`, payload)

    return response.data
}

export async function deleteSkill(id) {
    await api.delete(`/me/skills/${id}`)
}