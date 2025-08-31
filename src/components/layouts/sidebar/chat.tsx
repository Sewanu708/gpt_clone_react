import { AiOutlineDelete } from "react-icons/ai"
import { LuPenLine } from "react-icons/lu"
import Wrapper from "../../dropdown";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useChatConfig } from "../../../store/user";

function Chats({ chat, chat_id }: { chat: { id: string, header: string }, chat_id: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const trigger = () => setIsOpen(true)
    const deleteChat = useChatConfig(state=>state.deleteChat)
    const ref = useRef<HTMLAnchorElement>(null)

    const handleOutsideClick = useCallback((e: Event) => {
        // e.currentTarget.
        if (ref.current && (!ref.current?.contains(e.target as Node))) setIsOpen(false)
    }, [])

    useEffect(() => { 
        document.addEventListener('click',handleOutsideClick)
        return () => document.removeEventListener('click',handleOutsideClick)
     })


    return <Link to={`/chats/${chat.id}`}
        key={chat.id}
        className={` 
                                ${(chat.id == chat_id) ? 'bg-zinc-200 text-zinc-400' :
                'bg-zinc-50 text-zinc-500'} rounded-xl w-full py-1 px-2 text-sm flex items-center justify-between  cursor-pointer hover:bg-zinc-100 relative hover:text-zinc-500 group`
        }

        ref={ref}>
        <div
            className="w-[80%]  truncate">
            {chat.header}
        </div>
        <div
            className="w-[10%] hidden group-hover:block"
            onClick={trigger}>
            <BiDotsVerticalRounded />
        </div>
        {isOpen &&
            <Wrapper
                isOpen={isOpen}
                trigger={trigger}
                className="absolute top-4 right-4"
            >
                <div className="w-fit  p-2 rounded-lg bg-zinc-200 shadow-sm">
                    <div className='p-2 rounded-lg cursor-pointer hover:bg-zinc-100 flex items-center justify-between w-full'>
                        <LuPenLine />
                        <span className="ml-2 text-sm">
                            Rename
                        </span>
                    </div>
                    <div className='p-2 rounded-lg cursor-pointer hover:bg-zinc-100 flex items-center justify-between w-full' onClick={()=>{
                        deleteChat(chat.id)
                    }}>
                        <AiOutlineDelete />
                        <span className="ml-2 text-sm text-red-500" >
                            Delete
                        </span>
                    </div>
                </div>
            </Wrapper>
        }
    </Link>
}

export default Chats