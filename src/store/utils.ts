import { create } from "zustand"

interface WrapperProps {
    isOpen: boolean,
    trigger: () => void
}
interface MountProps {
    isMounted: boolean,
    setIsMounted: (bool: boolean) => void
}


export const useWrapperControl = create<WrapperProps>()((set) => ({
    isOpen: false,
    trigger: () => set((state) => ({ isOpen: !state.isOpen }))
}))

export const useMount = create<MountProps>((set) => ({
    isMounted: true,
    setIsMounted: (bool) => set({ isMounted: bool })
}))


export const useSidebarWrapperControl = create<WrapperProps>()((set) => ({
    isOpen: false,
    trigger: () => set((state) => ({ isOpen: !state.isOpen }))
}))

export const useSidebarToggle = create<WrapperProps>()((set) => ({
    isOpen: true,
    trigger: () => set((state) => ({ isOpen: !state.isOpen }))
}))

export const useMobileSidebarToggle = create<WrapperProps>()((set) => ({
    isOpen: true,
    trigger: () => set((state) => ({ isOpen: !state.isOpen }))
}))


export const useHeaderToggle = create<WrapperProps>()((set) => ({
    isOpen: false,
    trigger: () => set((state) => ({ isOpen: !state.isOpen }))
}))

export const useHistoryToggle = create<WrapperProps>()((set) => ({
    isOpen: false,
    trigger: () => set((state) => ({ isOpen: !state.isOpen }))
}))

interface chat {
    id: string,
    user: string,
    model: {text:string,createdAt:number},
}
export const format = (chats: chat[]) => {
    const formatted = chats.reduce((accum, chat) => {
        const user = { role: 'user', parts: [{ text: chat.user }] }
        // if (chat.model)
        const model = { role: 'model', parts: [{ text: chat.model.text}] }
        accum.push(user, model)
        return accum
    }, [] as { role: string, parts: { text: string }[] }[])

    // console.log(formatted)
    return formatted
}

