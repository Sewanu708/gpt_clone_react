import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Orgs {
    ai: 'google' | 'openai' | 'xai' | 'anthropic',
    saveResponse: (response: string) => void
}

interface Model {
    model: string,
    saveResponse: (response: string) => void
}

const noopstorage = {
    getItem: () => null,
    setItem: () => { },
    removeItem: () => { }
}
export const useModels = create<Orgs>()(
    persist((set) => ({
        ai: 'google',
        saveResponse: (response: string) => set((state) => {
            if (!response) return state;
            const validate = ['google', 'openai', 'xai', 'anthropic']
            if (!validate.includes(response)) return state
            return {
                ...state,
                ai: response as 'google' | 'openai' | 'xai' | 'anthropic'
            }
        })
    }), {
        name: 'selected-org',
        storage: createJSONStorage(() => typeof window != undefined ? localStorage : noopstorage)
    })
)

export const useModel = create<Model>()(
    persist((set) => ({
        model: '',
        saveResponse: (response) => set({
            model: response
        })
    }), {
        name: 'selected-model',
        storage: createJSONStorage(() => typeof window != undefined ? localStorage : noopstorage)
    })
)
