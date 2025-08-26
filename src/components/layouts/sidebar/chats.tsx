import { useShallow } from "zustand/shallow"
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { LuPenLine } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { useChatConfig } from "../../../store/user";
import { useHistoryToggle } from "../../../store/utils";
import Wrapper from "../../dropdown";

function History() {
    const { id: chat_id } = useParams()
    const router = useNavigate()
    const { history } = useChatConfig(
        useShallow((state) => ({
            history: state.title
        })))
    const isOpen = useHistoryToggle(state => state.isOpen)
    const trigger = useHistoryToggle(state => state.trigger)

    const handleChatsNavigation = (id: string) => {
        router(`/chats/${id}`)
    }
    return (
        <div className="w-full mt-8">
            <div className="text-sm  text-zinc-600 px-2 mb-1">
                Chats
            </div>
            <div className="w-[90%] flex flex-col-reverse gap-2">
                {
                    history.map((chat) => <div key={chat.id} className={` ${(chat.id == chat_id) ? 'bg-zinc-200 text-zinc-400' : 'bg-zinc-50 text-zinc-500'} rounded-xl w-full py-1 px-2 text-sm flex items-center justify-between  cursor-pointer hover:bg-zinc-100 relative hover:text-zinc-500 group`} onClick={() => handleChatsNavigation(chat.id)}>
                        <div className="w-[80%]  truncate">{chat.header}</div>
                        <div className="w-[10%] hidden group-hover:block" onClick={trigger}><BiDotsVerticalRounded /></div>

                        
                    </div>)
                }
                {isOpen &&
                            <Wrapper isOpen={isOpen} trigger={trigger} className="absolute top-4 right-4">
                                <div className="w-fit  p-2 rounded-lg bg-zinc-200 shadow-sm">
                                    <div className='p-2 rounded-lg cursor-pointer hover:bg-zinc-100 flex items-center justify-between w-full'>
                                        <LuPenLine /> <span className="ml-2 text-sm">Rename</span>
                                    </div>
                                    <div className='p-2 rounded-lg cursor-pointer hover:bg-zinc-100 flex items-center justify-between w-full'>
                                        <AiOutlineDelete /> <span className="ml-2 text-sm text-red-500" >Delete</span>
                                    </div>
                                </div>
                            </Wrapper>
                        }
            </div>

        </div>
    )
}

export default History