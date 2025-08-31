import { useShallow } from "zustand/shallow"
import { useNavigate, useParams } from "react-router-dom";
import { useChatConfig } from "../../../store/user";
import { LuSearchCheck } from "react-icons/lu";
import { BiBook } from "react-icons/bi";


function Features({ isOpen }: { isOpen: boolean }) {
    const router = useNavigate()
    const { id: chat_id } = useParams()
    const { createNewChat, chatId, saveChatId } = useChatConfig(
        useShallow((state) => ({
            createNewChat: state.createNewChat,
            chatId: state.getLatestId,
            saveChatId: state.setNewChatId,
        }))
    )

    const newchat = () => {
        if (!chat_id) return
        createNewChat()
        const id = chatId()
        if (id) {
            saveChatId(id)
            router(`/chats/${id}`)
        }
    }

    const search = () => { }

    const feats = [{
        name: 'Search chats',
        icon: LuSearchCheck,
        action: search
    }, {
        name: 'New chat',
        icon: BiBook,
        action: newchat
    }]
    return <div className="w-full mt-8">
        {
            isOpen &&
            <div className="text-sm  text-zinc-600 px-2 mb-1">
                Feats
            </div>
        }
        {
            feats.map((feat, index) =>
                <div className={`p-2 rounded-lg cursor-pointer hover:bg-zinc-100 flex items-center 
                    ${isOpen ? 'justify-start' : 'justify-center'} gap-2`}
                    key={index}
                    onClick={feat.action}
                >
                    <div>
                        <feat.icon
                            className="w-4 h-4 text-zinc-600"
                        />

                    </div>
                    {
                        isOpen &&
                        <div className="text-sm font-500">
                            {feat.name}
                        </div>
                    }

                </div>)
        }


    </div>
}

export default Features