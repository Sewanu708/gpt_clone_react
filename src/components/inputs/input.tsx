'use client'
import React, { useCallback } from "react";
import Actions from "./actions";
import Textbox from "./textbox";
import { useInput } from "../../store/input";
import { useModels } from "../../store/model";
import { useChatConfig } from "../../store/user";
import { useShallow } from "zustand/shallow";
import { main } from "./title";
import { useNavigate } from "react-router-dom";

function Input({ newChat = false, existingID }: { newChat?: boolean, existingID?: string }) {
    const router = useNavigate()
    const input = useInput((state) => state.input)
    const saveInput = useInput((state) => state.saveInput)
    const selectedmodel = useModels(state => state.ai)
    const { createNewChat, chatId, getChat, storeUserInputs, storeModelResponse, saveChatId, setWriting, isWriting } = useChatConfig(
        useShallow((state) => ({
            createNewChat: state.createNewChat,
            chatId: state.getLatestId,
            storeUserInputs: state.storeUserInputs,
            storeModelResponse: state.storeModelOutput,
            getChat: state.getChat,
            newChatId: state.newChat,
            saveChatId: state.setNewChatId,
            setWriting: state.setIsWriting,
            isWriting: state.isWriting,
            setTitle: state.setTitle
        }))
    )


    const handleSend = useCallback(async function send() {
        try {
            let id = existingID
            if (newChat && !existingID) {
                createNewChat()
                id = chatId()
                if (!id) throw new Error('Chat id not found')
            }
            if (!id) throw new Error('Chat id not found')
            router(`/chats/${id}`)
            saveChatId(id)
            setWriting(true)
            console.log('first', input)
            storeUserInputs(input, id, selectedmodel)
            saveInput('')
            // get chat context
      
            // get present conversation id 
            const con_id = getChat(id)?.at(-1)?.id
            if (!con_id) return;
            try {
                
                await main()
                // storeModelResponse(response., id, con_id)
                // await handleChatTitle(id)
            } catch (error) {
                console.log(error)
            }
        } catch (error) {

        } finally {
            setWriting(false)
        }
    }, [storeModelResponse, getChat, setWriting, isWriting, storeUserInputs, saveChatId, saveInput, input, newChat])


    // const handleChatTitle = useCallback(async function handleTitle(id: string) {
    //     try {
    //         const updatedchats = getChat(id)
    //         if (!updatedchats || updatedchats?.length >= 4) return
    //         const handleTitle = (value: string) => setTitle(id, value)
    //         await getTitle(updatedchats, handleTitle)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }, [getChat, setTitle, newChatId])


    return (
        <div className=" mb-3 rounded-3xl border border-zinc-500 bg-white shadow-sm">
            <form className="w-full px-3 flex items-center justify-between">
                <Textbox isWriting={isWriting} input={input} send={handleSend} saveInput={saveInput} />
                <Actions send={handleSend} />
            </form>
        </div>
    )
}

export default React.memo(Input)