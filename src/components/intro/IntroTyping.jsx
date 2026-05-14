import { useEffect, useState } from 'react'

export default function IntroTyping({
    firstText,
    secondText,
    onComplete,
}) {
    const [text, setText] = useState('')
    const [showCursor, setShowCursor] = useState(true)

    useEffect(() => {
        runTyping()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor(prev => !prev)
        }, 500)

        return () => clearInterval(interval)
    }, [])

    async function runTyping() {
        await typeText(firstText, 70)
        await wait(1300)
        await deleteText(firstText, 40)
        await wait(300)
        await typeText(secondText, 55)
        await wait(500)

        onComplete?.()
    }

    async function typeText(value, speed) {
        for (let i = 0; i <= value.length; i++) {
            setText(value.slice(0, i))
            await wait(speed)
        }
    }

    async function deleteText(value, speed) {
        for (let i = value.length; i >= 0; i--) {
            setText(value.slice(0, i))
            await wait(speed)
        }
    }

    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    return (
        <span>
            {text}
            <span className={showCursor ? 'opacity-100' : 'opacity-0'}>
                _
            </span>
        </span>
    )
}