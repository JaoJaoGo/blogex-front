import api from './api'

export async function listPosts(params = {}) {
    const response = await api.get('/posts', { params })

    return response.data
}

export async function showPost(id) {
    const response = await api.get(`/posts/${id}`)

    return response.data.data
}

export async function createPost(payload) {
    const formData = buildPostFormData(payload)

    const response = await api.post('/posts', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })

    return response.data
}

export async function updatePost(id, payload) {
    const formData = buildPostFormData(payload)

    formData.append('_method', 'PUT')

    const response = await api.post(`/posts/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })

    return response.data
}

function buildPostFormData(payload) {
    const formData = new FormData()

    Object.entries(payload).forEach(([key, value]) => {
        if (key === 'tags') {
            value.forEach(tag => {
                formData.append('tags[]', tag)
            })

            return
        }

        if (value !== null && value !== undefined) {
            formData.append(key, value)
        }
    })

    return formData
}