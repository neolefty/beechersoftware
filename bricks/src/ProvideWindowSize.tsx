import {Context, createContext, PropsWithChildren, useCallback, useEffect, useState} from "react"

interface WidthHeight {
    width: number
    height: number
}

const HUNDRED: WidthHeight = Object.freeze({width: 100, height: 100})

export const useWindowSize = (defaultSize: WidthHeight = HUNDRED): WidthHeight => {
    const [size, setSize] = useState(defaultSize)
    const dimensionListener = useCallback(() => setSize(Object.freeze({
        width: window.innerWidth, height: window.innerHeight,
    })), [])
    useEffect(() => {
        dimensionListener() // initial value
        window.addEventListener('resize', dimensionListener)
        return () => window.removeEventListener('resize', dimensionListener)
    }, [dimensionListener])
    return size
}

const ViewSizeContext: Context<WidthHeight> = createContext(HUNDRED)

export const ProvideViewSize = (props: PropsWithChildren<{size: WidthHeight}>) =>
    <ViewSizeContext.Provider value={props.size}>
        {props.children}
    </ViewSizeContext.Provider>
