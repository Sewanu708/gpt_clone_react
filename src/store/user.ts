import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface UserInput {
    user: Record<string, Conversation[]>,
    chatIds: string[],
    createNewChat: () => void
    storeUserInputs: (input: string, chatId: string, agent: string) => void,
    storeRegeneratedOutput: (input: string | undefined, chatId: string, regenerateId?: string) => void,
    getChat: (chatId: string) => Conversation[] | undefined,
    getLatestId: () => string | undefined,
    newChat: string,
    setNewChatId: (id: string) => void,
    setIsWriting: (bool: boolean) => void,
    isWriting: boolean,
    title: { id: string, header: string }[],
    getTitle: (id: string) => string | undefined,
    setTitle: (id: string, title: string) => void,
    storeModelStreamResponse: (input: string | undefined, chatId: string, conversationId: string, messageIndex: number) => void,
    updateConversationStatus: (id: string, status: ('error' | 'pending' | 'success' | 'incomplete'), chatId: string) => void,
    regenerate: boolean,
    regenerateId: { messageId: string, regenId: string },
    setRegenerate: (value: boolean) => void,
    setRegenerateId: (messageId: string) => void,
    updateDisplayedIndex: (chatId: string, messageId: string) => void,
    createRoomForRegeneratedResponse: (chatId: string, messageId: string) => void,
    SetMessageDetails: (chatId: string, messageId: string, createdAt: number) => void,
    messageDetails: MessageDetails[],
    deleteChat: (chatId: string) => void,
    deleteUnsedChats: () => void
}

export interface Conversation {
    id: string;
    model: { text: string, createdAt: number };
    user: string;
    agent: string;
    status: 'error' | 'pending' | 'success' | 'incomplete',
    regenerateId?: string
}

type MessageDetails = {
    chatId: string,
    messageId: string,
    createdAt: number
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
                    return {
                        chatIds: newChat,
                        user: newUser
                    }
                }
                const chats = state.user[latest]
                // if latest chat is new don't create new chat
                if (chats?.length <= 1) return state
                state.setTitle(id, 'New chat')
                return {
                    chatIds: newChat,
                    user: newUser
                }
            }),

            storeUserInputs: (input, chatId, agent) => set((state) => {
                const newId = crypto.randomUUID()
                const conversation: Conversation = { id: newId, user: input, model: { text: '', createdAt: Date.now() }, agent, status: "pending", }
                const chat = state.user[chatId]
                const newChat = [...chat, conversation]
                return {
                    user: { ...state.user, [chatId]: newChat }
                }
            }),
            storeRegeneratedOutput: (input, chatId, regenerateId) => set((state) => {
                if (!input) return state
                const chat = state.user[chatId]
                const index = chat?.findIndex(item => item.regenerateId === regenerateId)
                if (index === -1) {
                    return state
                }
                const currentConversation = [...chat]
                const oldConversation = currentConversation[index]
                const spreadOldConversation = { ...oldConversation['model'] }
                oldConversation.model = { ...spreadOldConversation, text: input + spreadOldConversation.text }
                currentConversation[index] = ({ ...oldConversation, regenerateId })
                return {
                    user: { ...state.user, [chatId]: currentConversation }
                }
            }),
            createRoomForRegeneratedResponse: (chatId, messageId) => set((state) => {
                const chat = state.user[chatId]
                const index = chat?.findIndex(item => item.id === messageId)
                if (index === -1) {
                    return state
                }
                const currentConversation = [...chat]
                const oldConversation = currentConversation[index]
                const conversation: Conversation = { id: oldConversation.id, user: oldConversation.user, model: { text: '', createdAt: Date.now() }, agent: oldConversation.agent, status: "pending", regenerateId: state.regenerateId.regenId ?? '' }
                currentConversation.push(conversation)
                return {
                    user: { ...state.user, [chatId]: currentConversation }
                }
            }),
            storeModelStreamResponse: (input, chatId, conversationId) => set((state) => {
                if (!input) return state
                const chat = state.user[chatId]
                const index = chat?.findIndex(item => (item.id === conversationId))
                if (index === -1) {
                    return state
                }
                const currentConversation = [...chat]
                const oldConversation = currentConversation[index]
                const spreadOldConversation = { ...oldConversation['model'] }
                oldConversation.model = { ...spreadOldConversation, text: spreadOldConversation.text + input }
                currentConversation[index] = oldConversation
                return {
                    user: { ...state.user, [chatId]: currentConversation }
                }
            }),
            messageDetails: [],
            SetMessageDetails: (chatId, messageId, createdAt) => set((state) => {
                const index = (state.messageDetails.findIndex(d => d.chatId === chatId))
                console.log('first:', index)
                if ((index == -1)) {
                    const d = [...state.messageDetails]
                    d.push({ chatId, messageId, createdAt })
                    return {

                        messageDetails: d
                    }
                }
                const c = [...state.messageDetails]
                c[index] = { chatId, messageId, createdAt }
                return {
                    messageDetails: c
                }
            }),
            updateConversationStatus: (id, status, chatId) => set((state) => {
                const chat = state.user[chatId]
                const index = chat?.findIndex(item => item.id === id)
                if (index === -1) {
                    return state
                }
                const currentConversation = [...chat]
                const oldConversation = currentConversation[index]
                oldConversation.status = status
                currentConversation[index] = oldConversation
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
                if (id.length === 0) return state
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
            }),
            regenerate: false,
            regenerateId: { messageId: '', regenId: '' },
            setRegenerate: (value) => set({
                regenerate: value
            }),
            setRegenerateId: (messageId) => set({
                regenerateId: { messageId, regenId: crypto.randomUUID() }
            }),
            updateDisplayedIndex: (chatId, messageId) => set((state) => {
                const chat = state.user[chatId]
                const index = chat?.findIndex(item => item.id === messageId)
                if (index === -1) {
                    return state
                }
                const currentConversation = [...chat]
                const oldConversation = currentConversation[index]
                // oldConversation.currentDisplayedIndex = displayIndex
                currentConversation[index] = oldConversation
                return {
                    user: { ...state.user, [chatId]: currentConversation }
                }
            }),
            deleteChat: (chatId) => set((state) => {
                const chats = { ...state.user }
                delete chats[chatId]
                const updatedChat = { ...chats }
                const chatIds = [...state.chatIds]
                const newChatId = chatIds.filter(id => id != chatId)
                const titles = [...state.title]
                const newTitles = titles.filter(title => title.id != chatId)
                return {
                    user: updatedChat,
                    chatIds: newChatId,
                    title: newTitles
                }
            }),
            deleteUnsedChats: ()=>set((state)=>{
                return state
            })
        }), {
        name: 'userinput',
        storage: createJSONStorage(() => typeof window !== 'undefined' ? localStorage : noopstorage
        )
    }))



