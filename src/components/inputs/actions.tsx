import React, { useEffect } from 'react'
import { FaArrowUp } from 'react-icons/fa'
import { useInput } from '../../store/input'
import { useChatConfig } from '../../store/user'
import { useShallow } from 'zustand/shallow'

function Actions({ send, stop }: { send: () => Promise<void>, stop: () => void }) {
    const input = useInput((state) => state.input)
    const { isWriting, setIsWriting,regenerate } = useChatConfig(useShallow((state) => ({
        isWriting: state.isWriting,
        setIsWriting: state.setIsWriting,
        regenerate: state.regenerate,
    })))

    const handleSend = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await send()
    }

    useEffect(()=>{
        if (regenerate) send()
    },[regenerate])


    return (<div className="w-fit sm:w-auto flex justify-end">
        {
            isWriting ? <button className='p-2 rounded-full cursor-pointer bg-zinc-800 flex items-center justify-center' onClick={(e)=>{
                e.preventDefault()
                setIsWriting(false)
                console.log("Stoppin")
                stop()
            }}>
                <div className='bg-zinc-50 rounded-[4px] w-3 h-3'>
                </div>
            </button> :
                < button disabled={!(input.length > 0)} className={`p-2 cursor-pointer rounded-full bg-zinc-800 flex items-center justify-center ${input.length > 0 ? '' : 'opacity-40'}`} onClick={input.length > 0 ? handleSend : () => { }}>
                    {
                        <FaArrowUp className="text-white" />
                    }
                </button>

        }
    </div >
    )


}

export default Actions


// model is writin
// display arrow up and black
// input is empty, disable send and display grey
// input is not empty,