import { Navigate } from 'react-router-dom'
import IntroScreen from '../components/intro/IntroScreen'

const INTRO_COMPLETED_KEY = 'blogex_intro_completed'
const SELECTED_AUTHOR_KEY = 'blogex_selected_author'

export default function Intro() {
    const introCompleted = localStorage.getItem(INTRO_COMPLETED_KEY)
    const selectedAuthor = localStorage.getItem(SELECTED_AUTHOR_KEY)

    if (introCompleted && selectedAuthor) {
        return <Navigate to={`/${selectedAuthor}`} replace />
    }

    return <IntroScreen />
}