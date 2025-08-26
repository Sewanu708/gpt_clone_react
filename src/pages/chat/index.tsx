import { useEffect, useRef } from "react"
import { useShallow } from "zustand/shallow"
import { useMount, useSidebarToggle } from "../../store/utils"
import { useChatConfig } from "../../store/user"
import Input from "../../components/inputs/input"
import { useNavigate } from "react-router-dom"
import ModelOutput from "../../components/chats/output"
import Userinput from "../../components/chats/input"

function ChatRoom({ chatId }: { chatId: string }) {
    const router = useNavigate()
    const { isMounted, setIsMounted } = useMount(useShallow((state) => ({
        isMounted: state.isMounted,
        setIsMounted: state.setIsMounted
    })))

    const { getChat } = useChatConfig(
        useShallow((state) => ({
            getChat: state.getChat,
            user: state.user,
        }))
    )

    const isOpen = useSidebarToggle(state => state.isOpen)

    const bottomRef = useRef<HTMLDivElement>(null)
    
    useEffect(() => {
        setIsMounted(false)
    }, [])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    })

    useEffect(() => {
        const chats = getChat(chatId)
        if (!chats) router('/')
    }, [])

    if (isMounted) return <h1>Loading</h1>
    const chats = getChat(chatId)

    if (!chats?.at(0)?.user) return (
        <div className="flex flex-col h-full items-center justify-center">
            <h2 className="text-3xl text-center mb-8">What can I help with?</h2>
            <Input newChat={false} existingID={chatId} />
        </div>
    )
    
    return (
        <div className="flex flex-col h-screen">
           
            <div className="flex-1 min-h-0 overflow-hidden">
                <div className="h-full overflow-y-auto px-4 md:px-12 py-8 pb-32">
                    <div className="max-w-4xl mx-auto space-y-8">
                        {getChat(chatId)?.map((chat, index) => (
                            <div key={index} className="w-full">
                                <Userinput input={chat.user} />
                                <ModelOutput
                                    modelResponse={chat.model}
                                    loading={!(chat.model.length > 1)}
                                    agent={chat.agent}
                                />
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>
                </div>
            </div>

           
            <div className={`fixed bottom-0 right-0 bg-white border-t border-gray-200 transition-all duration-300 ${
                isOpen ? 'left-64' : 'left-16'
            }`}>
                <div className="max-w-4xl mx-auto px-4 md:px-12 py-4">
                    <Input existingID={chatId} />
                </div>
            </div>
        </div>
    )
}

export default ChatRoom