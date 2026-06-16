import api from './api'

export async function updateProfile(payload) {
    const formData = new FormData()

    Object.entries(payload).forEach(([key, value]) => {
        if (key === 'remove_profile_photo') {
            formData.append(key, value ? '1' : '0')
            return
        }

        if (key === 'profile_photo') {
            if (value instanceof File) {
                formData.append('profile_photo', value, value.name)
            }

            return
        }

        if (value !== null && value !== undefined) {
            formData.append(key, value)
        }
    })

    const response = await api.post('/me/profile', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return response.data
}

export async function updatePassword(payload) {
    const response = await api.put('/me/password', payload)

    return response.data
}