import {Box} from "@mui/material"
import React, {useEffect} from 'react'
import './App.css'
import LeftMid from './media/point-test-mid-left.jpg'
import RightDown from './media/point-test-down-right.jpg'
import {ProvideViewSize, useWindowSize} from "./ProvideWindowSize"
import {useMousePosition} from "./useMousePosition"

const xor = (a: boolean, b: boolean): boolean => (a && b) || (!a && !b)

export const App = () => {
    const windowSize = useWindowSize()
    const mouse = useMousePosition()
    const top = mouse.y < 0.5 * windowSize.height
    const right = mouse.x > 0.5 * windowSize.width

    return (
        <ProvideViewSize size={windowSize}>
            <CenteredImage flip={xor(right, top)}>{
                top ? LeftMid : RightDown
            }</CenteredImage>
        </ProvideViewSize>
    )
}

interface CenteredImageProps {
    children: string
    flip?: boolean
}
export const CenteredImage = (props: CenteredImageProps) => {
    useEffect(() => console.log(props.children), [props.children])
    return <Box
        sx={{
            backgroundImage: `url(${props.children})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            transform: props.flip ? 'scaleX(-1)' : undefined,
            position: 'fixed',
            height: '100vh',
            width: '100vw',
            left: 0,
            top: 0,
        }}
    />
}
