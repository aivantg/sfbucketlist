import { useEffect, useRef } from "react"
import Vara from "vara"

interface VaraTitleProps {
    text: string
    onAnimationEnd: () => void
}

export const VaraTitle = ({ text, onAnimationEnd }: VaraTitleProps) => {
    const titleRef = useRef<HTMLDivElement | null>(null)
    const varaInitialized = useRef(false)

    useEffect(() => {
        if (!varaInitialized.current && titleRef.current) {
            if (titleRef.current.children.length > 0) {
                titleRef.current.innerHTML = ''
            }
            const vara = new Vara(
                "#titleContainer",
                "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Shadows-Into-Light/shadows-into-light.json",
                [{ text }],
                { fontSize: 30, strokeWidth: 2, textAlign: "center" }
            )
            vara.animationEnd(onAnimationEnd)
            varaInitialized.current = true
        }
    }, [text, onAnimationEnd])

    return <div id="titleContainer" ref={titleRef} style={{ width: '100%', height: '20%' }} />
} 