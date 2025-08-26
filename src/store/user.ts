import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface UserInput {
    user: Record<string, Conversation[]>,
    chatIds: string[],
    createNewChat: () => void
    storeUserInputs: (input: string, chatId: string, agent: string) => void,
    storeModelOutput: (input: string, chatId: string, conversationId: string) => void,
    getChat: (chatId: string) => Conversation[] | undefined,
    getLatestId: () => string | undefined,
    newChat: string,
    setNewChatId: (id: string) => void,
    setIsWriting: (bool: boolean) => void,
    isWriting: boolean,
    title: { id: string, header: string }[],
    getTitle: (id: string) => string | undefined,
    setTitle: (id: string, title: string) => void

}

export interface Conversation {
    id: string;
    model: string;
    user: string;
    agent: string;
}

const noopstorage = {
    getItem: () => null,
    setItem: () => { },
    removeItem: () => { }
}
export const useChatConfig = create<UserInput>()(
    persist(
        (set, get) => ({
            user: {},
            chatIds: [],
            createNewChat: () => set((state) => {

                const id = crypto.randomUUID()
                const newChat = [...state.chatIds, id]
                const newUser = { ...state.user, [id]: [] }
                // if user is empty, create new chat
                const latest = state.getLatestId()
                
                if (!latest) {
                    state.setTitle(id, 'New chat')
                    console.log('user is empty,so i created a new chat')
                    return {
                        chatIds: newChat,
                        user: newUser
                    }
                }
                const chats = state.user[latest]
                // if latest chat is new don't create new chat
                if (chats?.length <= 1 || chats[0]?.model == '') return state
                state.setTitle(id, 'New chat')
                console.log('new chat created, user is not empty')
                return {
                    chatIds: newChat,
                    user: newUser
                }
            }),

            storeUserInputs: (input, chatId, agent) => set((state) => {
                const newId = crypto.randomUUID()
                const conversation = { id: newId, user: input, model: '', agent }
                const chat = state.user[chatId]
                const newChat = [...chat, conversation]
                return {
                    user: { ...state.user, [chatId]: newChat }
                }
            }),
            storeModelOutput: (input, chatId, conversationId) => set((state) => {
                const chat = state.user[chatId]
                const index = chat?.findIndex(item => item.id === conversationId)
                if (index === -1) {
                    return state
                }
                const currentConversation = [...chat]
                const updatedConversation = {
                    ...currentConversation[index], model: input
                }
                currentConversation[index] = updatedConversation
                return {
                    user: { ...state.user, [chatId]: currentConversation }
                }
            }),

            getChat: (chatId) => {
                const state = get()
                return state.user[chatId]
            },
            getLatestId: () => {
                const state = get()
                return state.chatIds.at(-1) || undefined
            },
            newChat: '',
            setNewChatId: (id) => set({
                newChat: id
            }),
            isWriting: false,
            setIsWriting: (bool: boolean) => set({
                isWriting: bool
            }),
            title: [],
            getTitle: (id: string) => {
                const state = get()
                return state.title.find(chat => chat.id === id)?.header
            },
            setTitle: (id: string, title: string) => set((state) => {
                if (title.length === 0) return state
                if (id.length===0) return state
                const chatIndex = state.title.findIndex(chat => chat.id == id)
                if (chatIndex >= 0) {
                    const newTitleArray = [...state.title]
                    newTitleArray[chatIndex] = { id, header: title }
                    return {
                        title: newTitleArray
                    }
                }
                const newTitleArray = [...state.title]
                newTitleArray.push({ id, header: title })
                return {
                    title: newTitleArray
                }
            })

        }), {
        name: 'userinput',
        storage: createJSONStorage(() => typeof window !== 'undefined' ? localStorage : noopstorage
        )
    }))

