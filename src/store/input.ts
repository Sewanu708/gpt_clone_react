import { create } from 'zustand'

interface inputProp {
    input: string,
    saveInput: (value: string) => void
}
export const useInput = create<inputProp>()(
    
        (set) => ({
            input: '',
            saveInput: (value: string) => set({ input: value })
        })
)

