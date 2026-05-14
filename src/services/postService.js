import api from './api'

export async function listPosts(params = {}) {
    const response = await api.get('/posts', {
        params,
    })

    return response.data
}

export async function getPost(id) {
    const response = await api.get(`/posts/${id}`)

    return response.data
}