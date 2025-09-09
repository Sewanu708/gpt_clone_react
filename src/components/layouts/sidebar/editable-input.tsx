import { useEffect, useRef, useState } from "react";

function EditableTitle({
    currentTitle,
    handleNewTitle
}: {
    currentTitle: string,
    handleNewTitle: (value: string) => void
}) {
    const [input, setInput] = useState(currentTitle)
    const [isEditing, setIsEditing] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus()
            inputRef.current.select()
        }
    }, [isEditing])

      useEffect(() => {
        document.addEventListener('click', handleOutsideClick)
        return () => document.removeEventListener('click', handleOutsideClick)
    })

    const handleOutsideClick = (e: Event) => {
        if (inputRef.current && (!inputRef.current?.contains(e.target as Node))) {
            handleNewTitle(input)
            setIsEditing(false)
        }
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.stopPropagation()
        if (e.key === 'Enter') {
            handleNewTitle(input)
            setIsEditing(false)
        }

        if (e.key === 'Escape') {
            setIsEditing(false)
            console.log('running')
        }
    }


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const handleDoubleClick = () => {
        setIsEditing(true)
    }

    if (isEditing) return <div className="w-[80%]">
        <input
            ref={inputRef}
            onChange={handleOnChange}
            value={input}
            onKeyDown={onKeyDown}
            className="w-full truncate outline-0 border-0"
        />
    </div>

    return (
        <div
            className="w-[80%]  truncate"
            onDoubleClick={handleDoubleClick}

        >
            {currentTitle}
        </div>
    )
}

export default EditableTitle