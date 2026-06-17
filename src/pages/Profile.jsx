import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useProfileForm } from '../hooks/useProfileForm'
import { useExperiences } from '../hooks/useExperiences'
import { useSkills } from '../hooks/useSkills'
import PostEditor from '../components/posts/PostEditor'
import ExperienceList from '../components/profile/experiences/ExperienceList'
import ExperienceFormModal from '../components/profile/experiences/ExperienceFormModal'
import DeleteExperienceModal from '../components/profile/experiences/DeleteExperienceModal'
import SkillList from '../components/profile/skills/SkillList'
import SkillFormModal from '../components/profile/skills/SkillFormModal'
import DeleteSkillModal from '../components/profile/skills/DeleteSkillModal'

export default function Profile() {
    const { user } = useAuth()
    const profile = useProfileForm(user)
    const experiences = useExperiences()
    const skills = useSkills()

    const [message, setMessage] = useState(null)
    const [experienceModalOpen, setExperienceModalOpen] = useState(false)
    const [deleteExperienceModalOpen, setDeleteExperienceModalOpen] = useState(false)
    const [selectedExperience, setSelectedExperience] = useState(null)
    const [skillModalOpen, setSkillModalOpen] = useState(false)
    const [deleteSkillModalOpen, setDeleteSkillModalOpen] = useState(false)
    const [selectedSkill, setSelectedSkill] = useState(null)

    async function handleProfileSubmit(event) {
        event.preventDefault()

        await profile.submitProfile()

        setMessage('Perfil atualizado com sucesso.')
    }

    async function handlePasswordSubmit(event) {
        event.preventDefault()

        await profile.submitPassword()

        setMessage('Senha atualizada com sucesso.')
    }

    function handleCreateExperience() {
        setSelectedExperience(null)
        setExperienceModalOpen(true)
    }

    function handleEditExperience(experience) {
        setSelectedExperience(experience)
        setExperienceModalOpen(true)
    }

    function handleDeleteExperience(experience) {
        setSelectedExperience(experience)
        setDeleteExperienceModalOpen(true)
    }

    async function handleSubmitExperience(payload) {
        if (selectedExperience) {
            await experiences.editExperience(selectedExperience.id, payload)
            return
        }

        await experiences.storeExperience(payload)
    }

    function handleCreateSkill() {
        setSelectedSkill(null)
        setSkillModalOpen(true)
    }

    function handleEditSkill(skill) {
        setSelectedSkill(skill)
        setSkillModalOpen(true)
    }

    function handleDeleteSkill(skill) {
        setSelectedSkill(skill)
        setDeleteSkillModalOpen(true)
    }

    async function handleSubmitSkill(payload) {
        if (selectedSkill) {
            await skills.editSkill(selectedSkill.id, payload)
            return
        }

        await skills.storeSkill(payload)
    }

    function getProfilePhotoPreview() {
        if (profile.profileForm.profile_photo instanceof File) {
            return URL.createObjectURL(profile.profileForm.profile_photo)
        }

        if (
            profile.profileForm.current_photo_url &&
            !profile.profileForm.remove_profile_photo
        ) {
            return profile.profileForm.current_photo_url
        }

        return null
    }

    const profilePhotoPreview = getProfilePhotoPreview()

    return (
        <section className="max-w-5xl mx-auto py-12 space-y-8">
            <div>
                <h1 className="text-3xl font-bold">
                    Perfil
                </h1>

                <p className="text-sm text-gray-400 mt-1">
                    Gerencie seus dados, senha e experiências.
                </p>
            </div>

            {message && (
                <div className="rounded-2xl border border-primary/20 bg-primary/10 px-5 py-4 text-sm text-primary">
                    {message}
                </div>
            )}

            <form
                onSubmit={handleProfileSubmit}
                className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl space-y-5"
            >
                <h2 className="text-xl font-bold">
                    Dados da conta
                </h2>

                {profile.profileError && (
                    <p className="text-sm text-red-400">
                        {profile.profileError}
                    </p>
                )}

                <div className="flex items-center gap-5">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-white/10 border border-white/10">
                        {profilePhotoPreview ? (
                            <img
                                src={profilePhotoPreview}
                                alt="Foto de perfil"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-primary">
                                {user?.name?.charAt(0)}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <label className="px-4 py-2 rounded-full bg-white/10 text-sm cursor-pointer hover:bg-white/20 transition">
                            Alterar foto

                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/jpg,image/webp"
                                className="hidden"
                                onChange={event => {
                                    const file = event.target.files?.[0]

                                    if (file instanceof File) {
                                        profile.setProfileField('profile_photo', file)
                                        profile.setProfileField('remove_profile_photo', false)
                                    }
                                }}
                            />
                        </label>

                        <button
                            type="button"
                            onClick={() => {
                                profile.setProfileField('profile_photo', null)
                                profile.setProfileField('remove_profile_photo', true)
                            }}
                            className="px-4 py-2 rounded-full bg-red-500/15 text-red-300 text-sm hover:bg-red-500 hover:text-white transition"
                        >
                            Remover
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <Input
                        label="Nome"
                        value={profile.profileForm.name}
                        onChange={value => profile.setProfileField('name', value)}
                    />

                    <Input
                        label="Idade"
                        type="number"
                        value={profile.profileForm.age}
                        onChange={value => profile.setProfileField('age', value)}
                    />

                    <Input
                        label="Nascimento"
                        type="date"
                        value={profile.profileForm.birth_date}
                        onChange={value => profile.setProfileField('birth_date', value)}
                    />

                    <Input
                        label="Telefone"
                        value={profile.profileForm.phone}
                        onChange={value => profile.setProfileField('phone', value)}
                    />

                    <Input
                        label="E-mail"
                        type="email"
                        value={profile.profileForm.email}
                        onChange={value => profile.setProfileField('email', value)}
                    />

                    <Input
                        label="LinkedIn"
                        value={profile.profileForm.linkedin}
                        onChange={value => profile.setProfileField('linkedin', value)}
                    />

                    <Input
                        label="GitHub"
                        value={profile.profileForm.github}
                        onChange={value => profile.setProfileField('github', value)}
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-2">
                        Sobre mim
                    </label>

                    <PostEditor
                        label="Sobre mim"
                        value={profile.profileForm.description}
                        onChange={value =>
                            profile.setProfileField('description', value)
                        }
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        disabled={profile.loadingProfile}
                        className="px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold disabled:opacity-50"
                    >
                        {profile.loadingProfile ? 'Salvando...' : 'Salvar dados'}
                    </button>
                </div>
            </form>

            <form
                onSubmit={handlePasswordSubmit}
                className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl space-y-5"
            >
                <h2 className="text-xl font-bold">
                    Alterar senha
                </h2>

                {profile.passwordError && (
                    <p className="text-sm text-red-400">
                        {profile.passwordError}
                    </p>
                )}

                <div className="grid md:grid-cols-3 gap-4">
                    <Input
                        label="Senha atual"
                        type="password"
                        value={profile.passwordForm.current_password}
                        onChange={value =>
                            profile.setPasswordField('current_password', value)
                        }
                    />

                    <Input
                        label="Nova senha"
                        type="password"
                        value={profile.passwordForm.password}
                        onChange={value =>
                            profile.setPasswordField('password', value)
                        }
                    />

                    <Input
                        label="Confirmar senha"
                        type="password"
                        value={profile.passwordForm.password_confirmation}
                        onChange={value =>
                            profile.setPasswordField('password_confirmation', value)
                        }
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        disabled={profile.loadingPassword}
                        className="px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold disabled:opacity-50"
                    >
                        {profile.loadingPassword ? 'Salvando...' : 'Atualizar senha'}
                    </button>
                </div>
            </form>

            <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="text-xl font-bold">
                            Habilidades
                        </h2>

                        <p className="text-sm text-gray-400">
                            Gerencie suas principais habilidades técnicas e criativas.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleCreateSkill}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold"
                    >
                        <Plus size={16} />
                        Adicionar
                    </button>
                </div>

                {skills.loading && (
                    <p className="text-sm text-gray-400">
                        Carregando habilidades...
                    </p>
                )}

                {!skills.loading && (
                    <SkillList
                        skills={skills.skills}
                        editable
                        onEdit={handleEditSkill}
                        onDelete={handleDeleteSkill}
                    />
                )}
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="text-xl font-bold">
                            Experiências
                        </h2>

                        <p className="text-sm text-gray-400">
                            Gerencie sua trajetória profissional.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleCreateExperience}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold"
                    >
                        <Plus size={16} />
                        Adicionar
                    </button>
                </div>

                {experiences.loading && (
                    <p className="text-sm text-gray-400">
                        Carregando experiências...
                    </p>
                )}

                {experiences.loading && (
                    <p className="text-sm text-gray-400">
                        Carregando experiências...
                    </p>
                )}

                {!experiences.loading && (
                    <ExperienceList
                        experiences={experiences.experiences}
                        editable
                        onEdit={handleEditExperience}
                        onDelete={handleDeleteExperience}
                    />
                )}
            </section>
            <ExperienceFormModal
                isOpen={experienceModalOpen}
                experience={selectedExperience}
                submitting={experiences.submitting}
                onClose={() => setExperienceModalOpen(false)}
                onSubmit={handleSubmitExperience}
            />

            <DeleteExperienceModal
                isOpen={deleteExperienceModalOpen}
                experience={selectedExperience}
                submitting={experiences.submitting}
                onClose={() => setDeleteExperienceModalOpen(false)}
                onConfirm={experiences.removeExperience}
            />

            <SkillFormModal
                isOpen={skillModalOpen}
                skill={selectedSkill}
                submitting={skills.submitting}
                onClose={() => setSkillModalOpen(false)}
                onSubmit={handleSubmitSkill}
            />

            <DeleteSkillModal
                isOpen={deleteSkillModalOpen}
                skill={selectedSkill}
                submitting={skills.submitting}
                onClose={() => setDeleteSkillModalOpen(false)}
                onConfirm={skills.removeSkill}
            />
        </section>
    )
}

function Input({ label, value, onChange, type = 'text' }) {
    return (
        <div>
            <label className="block text-sm text-gray-400 mb-2">
                {label}
            </label>

            <input
                type={type}
                value={value ?? ''}
                onChange={event => onChange(event.target.value)}
                className="w-full h-11 rounded-xl bg-white/10 border border-white/10 px-4 text-sm outline-none focus:border-primary transition"
            />
        </div>
    )
}

function formatDate(date) {
    if (!date) {
        return ''
    }

    return new Date(date).toLocaleDateString('pt-BR')
}

function formatExperienceDuration(startDate, endDate) {
    if (!startDate) {
        return ''
    }

    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : new Date()

    let years = end.getFullYear() - start.getFullYear()
    let months = end.getMonth() - start.getMonth()

    if (months < 0) {
        years--
        months += 12
    }

    const parts = []

    if (years > 0) {
        parts.push(`${years} ${years === 1 ? 'ano' : 'anos'}`)
    }

    if (months > 0) {
        parts.push(`${months} ${months === 1 ? 'mês' : 'meses'}`)
    }

    return parts.length ? parts.join(' e ') : 'menos de 1 mês'
}