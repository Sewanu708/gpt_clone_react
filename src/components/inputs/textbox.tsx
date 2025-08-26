import React, { useCallback, useRef } from 'react'

interface Textbox {
    input: string;
    saveInput: (value: string) => void;
    send: () => Promise<void>,
    isWriting: boolean
}

function Textbox({ input, saveInput, send, isWriting }: Textbox) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    //send with enter key
    const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            send()
        }
    }, [send])

    // handle textbox increment 
    const handleTextDynamicSize = useCallback((textHTMLElement: HTMLTextAreaElement) => {
        // get the border heights
        const { borderTopWidth, borderBottomWidth } = window.getComputedStyle(textHTMLElement)

        // get the full height of the text box 
        const scrollHeight = textHTMLElement.scrollHeight + parseFloat(borderTopWidth) + parseFloat(borderBottomWidth)

        return Math.min(scrollHeight, 200)
    }, [])

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log(e.target.value)
        saveInput(e.target.value)
        const textHTMLElement = e.target
        if (textHTMLElement) {
            textHTMLElement.style.height = 'auto';
            textHTMLElement.style.height = handleTextDynamicSize(textHTMLElement) + 'px'
        }
    }, [saveInput, handleTextDynamicSize])




    return (
        <div className="flex items-center justify-center w-full">
            <textarea
                ref={textareaRef}
                placeholder="Ask anything"
                className="w-full  py-3 text-sm sm:text-base border-0 resize-none outline-none bg-transparent"
                rows={1}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                disabled={isWriting}
            />
        </div>

    )
}

export default React.memo(Textbox)