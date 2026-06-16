import { useState } from 'react'
import { updatePassword, updateProfile } from '../services/profileService'

export function useProfileForm(user) {
    const [profileForm, setProfileForm] = useState(() => ({
        name: user?.name ?? '',
        age: user?.age ?? '',
        birth_date: user?.birth_date ?? '',
        phone: user?.phone ?? '',
        email: user?.email ?? '',
        description: user?.description ?? '',
        linkedin: user?.linkedin ?? '',
        github: user?.github ?? '',
        profile_photo: null,
        current_photo_url: user?.profile_photo_url ?? null,
        remove_profile_photo: false,
    }))

    const [passwordForm, setPasswordForm] = useState({
        current_password: '',
        password: '',
        password_confirmation: '',
    })

    const [loadingProfile, setLoadingProfile] = useState(false)
    const [loadingPassword, setLoadingPassword] = useState(false)
    const [profileError, setProfileError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)

    function setProfileField(field, value) {
        setProfileForm(prev => ({
            ...prev,
            [field]: value,
        }))
    }

    function setPasswordField(field, value) {
        setPasswordForm(prev => ({
            ...prev,
            [field]: value,
        }))
    }

    async function submitProfile() {
        try {
            setLoadingProfile(true)
            setProfileError(null)

            return await updateProfile(profileForm)
        } catch (err) {
            setProfileError(
                err.response?.data?.message ||
                'Erro ao atualizar perfil.'
            )

            throw err
        } finally {
            setLoadingProfile(false)
        }
    }

    async function submitPassword() {
        try {
            setLoadingPassword(true)
            setPasswordError(null)

            return await updatePassword(passwordForm)
        } catch (err) {
            setPasswordError(
                err.response?.data?.message ||
                'Erro ao atualizar senha.'
            )

            throw err
        } finally {
            setLoadingPassword(false)
        }
    }

    return {
        profileForm,
        passwordForm,
        loadingProfile,
        loadingPassword,
        profileError,
        passwordError,
        setProfileField,
        setPasswordField,
        submitProfile,
        submitPassword,
    }
}