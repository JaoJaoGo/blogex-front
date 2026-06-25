import api from './api'

export async function uploadPostContentImage(file) {
    const formData = new FormData()

    formData.append('image', file)

    const response = await api.post('/posts/content-images', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })

    return response.data.data
}