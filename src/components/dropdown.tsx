import React, { useCallback, useEffect, useRef } from 'react'

function Wrapper({ children, className, isOpen, trigger }: { children: React.ReactNode, className: string, trigger: () => void, isOpen: boolean }) {

    const wrapper = useRef<HTMLDivElement>(null);

    const handleClick = useCallback((e: Event) => {
        if (wrapper?.current && (!wrapper?.current?.contains(e.target as Node))) trigger()
    }, [trigger])

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") trigger()
    }

    useEffect(() => {
        if (!isOpen) return;
        document.addEventListener('click', handleClick,true)
        return () => document.removeEventListener('click', handleClick)
    }, [handleClick, isOpen])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown, isOpen])
    console.log(isOpen, 'isOpen')

    return (
        isOpen ? <div ref={wrapper} className={className}>
            {children}
        </div> : null
    )
}

export default React.memo(Wrapper)