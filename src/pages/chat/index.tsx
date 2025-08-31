import { useEffect, useRef, useState } from "react"
import { useShallow } from "zustand/shallow"
import { useMount, useSidebarToggle } from "../../store/utils"
import { Conversation, useChatConfig } from "../../store/user"
import Input from "../../components/inputs/input"
import { useNavigate } from "react-router-dom"
import ModelOutput from "../../components/chats/output"
import Userinput from "../../components/chats/input"

function ChatRoom({ chatId }: { chatId: string }) {
    const router = useNavigate()
    const [data, setData] = useState<Conversation[] | undefined>()
    const { isMounted, setIsMounted } = useMount(useShallow((state) => ({
        isMounted: state.isMounted,
        setIsMounted: state.setIsMounted
    })))

    const { getChat, uiDetails, user } = useChatConfig(
        useShallow((state) => ({
            getChat: state.getChat,
            uiDetails: state.messageDetails,
            regenerateId: state.regenerateId,
            user: state.user

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

    useEffect(() => {
        function loadChats() {
            const cns = getChat(chatId)
            if (!cns) return
            console.log('before filtering', cns)
            const details = uiDetails.find(u => u.chatId === chatId)

            if (!details) {
                console.log('details not found')
                console.log(uiDetails)
                setData(cns)
                return;
            }

            // check if the last messageid matches any message id to know if the chat is a continuation or a regeneration
            const chatsWithoutLast = [...cns].slice(0, cns.length - 1)
            const Iscontinuation = chatsWithoutLast?.some(c => c.id === cns.at(-1)?.id)
            console.log('con', Iscontinuation)
            if (!Iscontinuation) {
                setData(cns)
                return;
            }
            const filteredChats = cns?.reduce<Conversation[]>((a, c) => {
                if (!details) return a;
                if (c.model.createdAt <= details?.createdAt) {
                    a.push(c)
                }
                if (c.id === details?.messageId && c.regenerateId) {
                    a.push(c)
                }
                return a
            }, [])
            console.log('first filter', filteredChats)
            const getEarliestTime = filteredChats?.find(f => f.id == details?.messageId)

            const d = filteredChats?.reduce<Conversation[]>((a, c) => {
                if (!getEarliestTime) return a;
                if (c.id == getEarliestTime.id || c.model.createdAt < getEarliestTime.model.createdAt) {
                    a.push(c)
                }
                return a
            }, [])
            console.log('filtered', d)
            setData(d)

        }

        loadChats()
    }, [chatId, uiDetails, getChat, setData, user])


    if (isMounted) return <h1>Loading</h1>
    const chats = getChat(chatId)

    if (!chats?.at(0)?.user) return (
        <div className="flex flex-col h-full items-center justify-center">
            <h2 className="text-3xl text-center mb-8">What can I help with?</h2>
            <Input newChat={false} existingID={chatId} />
        </div>
    )


    // const displayindex = getChat(chatId)?.find(chat => chat.id === regenerateId)?.currentDisplayedIndex
    // const regenTime = getChat(chatId)?.find(chat => chat.id === regenerateId)?.model[displayindex??0].createdAt
    // const latestchtas = getChat(chatId)?.find((chat) => chat.)



    return (
        <div className="flex flex-col h-screen">
            <div className="flex-1 min-h-0 mt-16 overflow-hidden">
                <div className="h-full overflow-y-auto px-4 md:px-12 py-8 pb-32">
                    <div className="max-w-4xl mx-auto space-y-4">
                        {data && data.map((chat, index) => {
                            return <div key={index} className="w-full">
                                <Userinput input={chat.user} />
                                <ModelOutput
                                    modelResponse={chat.model}
                                    loading={false}
                                    agent={chat.agent}
                                    id={chat.id}
                                />
                            </div>
                        })}
                        <div ref={bottomRef}  />
                    </div>
                </div>
            </div>


            <div className={`fixed bottom-0 right-0 bg-white md:block hidden border-t border-gray-200 transition-all duration-300 
                    ${isOpen ? 'left-64' : 'left-16'
                }`}>
                <div className="max-w-4xl mx-auto px-4 md:px-12 py-4">
                    <Input existingID={chatId} />
                </div>
            </div>

            <div className="md:hidden block border-t border-gray-200  mx-auto w-full px-2  py-1 ">
                <Input existingID={chatId} />
            </div>
        </div >
    )
}

export default ChatRoom