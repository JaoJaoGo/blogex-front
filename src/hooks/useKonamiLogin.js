import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const KONAMI_CODE = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
]

const RESET_DELAY = 2000

export function useKonamiLogin({ disabled = false } = {}) {
    const navigate = useNavigate()

    const [progress, setProgress] = useState(0)

    const progressRef = useRef(0)
    const timeoutRef = useRef(null)
    const audioContextRef = useRef(null)

    const resetProgress = useCallback(() => {
        progressRef.current = 0
        setProgress(0)

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
    }, [])

    const getAudioContext = useCallback(() => {
        const AudioContext = window.AudioContext || window.webkitAudioContext

        if (!AudioContext) {
            return null
        }

        if (!audioContextRef.current) {
            audioContextRef.current = new AudioContext()
        }

        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume()
        }

        return audioContextRef.current
    }, [])

    const playProgressSound = useCallback((step) => {
        const audioContext = getAudioContext()

        if (!audioContext) {
            return
        }

        const oscillator = audioContext.createOscillator()
        const gain = audioContext.createGain()

        const frequency = 240 + step * 45

        oscillator.type = 'square'
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)

        gain.gain.setValueAtTime(0.045, audioContext.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.08)

        oscillator.connect(gain)
        gain.connect(audioContext.destination)

        oscillator.start()
        oscillator.stop(audioContext.currentTime + 0.08)
    }, [getAudioContext])

    const playFailureSound = useCallback((type = 'error') => {
        const audioContext = getAudioContext()

        if (!audioContext) {
            return
        }

        const oscillator = audioContext.createOscillator()
        const gain = audioContext.createGain()

        oscillator.type = 'sawtooth'

        oscillator.frequency.setValueAtTime(
            type === 'timeout' ? 160 : 120,
            audioContext.currentTime
        )

        oscillator.frequency.exponentialRampToValueAtTime(
            60,
            audioContext.currentTime + 0.18
        )

        gain.gain.setValueAtTime(0.05, audioContext.currentTime)

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + 0.2
        )

        oscillator.connect(gain)
        gain.connect(audioContext.destination)

        oscillator.start()
        oscillator.stop(audioContext.currentTime + 0.2)
    }, [getAudioContext])

    const scheduleReset = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            if (progressRef.current > 0) {
                playFailureSound('timeout')
            }

            resetProgress()
        }, RESET_DELAY)
    }, [playFailureSound, resetProgress])

    const submitKonamiKey = useCallback((key) => {
        if (disabled) {
            return
        }

        const expectedKey = KONAMI_CODE[progressRef.current]

        const pressedKey = key.length === 1
            ? key.toLowerCase()
            : key

        if (pressedKey !== expectedKey) {
            if (progressRef.current > 0) {
                playFailureSound('error')
            }

            resetProgress()
            return
        }

        const nextProgress = progressRef.current + 1

        progressRef.current = nextProgress
        setProgress(nextProgress)
        playProgressSound(nextProgress)

        if (nextProgress === KONAMI_CODE.length) {
            resetProgress()

            setTimeout(() => {
                navigate('/login')
            }, 400)

            return
        }

        scheduleReset()
    }, [
        disabled,
        navigate,
        playFailureSound,
        playProgressSound,
        resetProgress,
        scheduleReset,
    ])

    useEffect(() => {
        if (disabled) {
            resetProgress()
            return
        }

        function handleKeyDown(event) {
            submitKonamiKey(event.key)
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            resetProgress()
        }
    }, [disabled, resetProgress, submitKonamiKey])

    return {
        progress,
        total: KONAMI_CODE.length,
        code: KONAMI_CODE,
        submitKonamiKey,
    }
}