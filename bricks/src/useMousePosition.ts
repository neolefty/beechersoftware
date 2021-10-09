import {useEffect, useState} from "react"

interface XY {
    x: number
    y: number
}

const NAN_XY: XY = Object.freeze({x: NaN, y: NaN})

export const useMousePosition = (): XY => {
    const [position, setPosition] = useState(NAN_XY)
    useEffect(() => {
        const listen = (e: MouseEvent) => setPosition(Object.freeze({x: e.clientX, y: e.clientY}))
        window.addEventListener('mousemove', listen)
        return () => window.removeEventListener('mousemove', listen)
    }, [])
    return position
}
