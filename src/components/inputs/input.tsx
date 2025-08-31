'use client'
import React, { useCallback } from "react";
import Actions from "./actions";
import Textbox from "./textbox";
import { useInput } from "../../store/input";
import { useModels } from "../../store/model";
import { useChatConfig } from "../../store/user";
import { useShallow } from "zustand/shallow";
import { useNavigate } from "react-router-dom";
import { ai } from "../../modelconfig";
import { format } from "../../store/utils";

function Input({ newChat = false, existingID }: { newChat?: boolean, existingID?: string }) {
    const router = useNavigate()
    const input = useInput((state) => state.input)
    const saveInput = useInput((state) => state.saveInput)
    const selectedmodel = useModels(state => state.ai)
    const { createNewChat, chatId, getChat, getTitle, createRoomForRegeneratedResponse, regenerate, regenerateId, storeUserInputs, setTitle, updateConversationStatus, storeModelResponse, saveChatId, storeRegeneratedResponse, setWriting, isWriting, setRegenerateId, setRegenerate, } = useChatConfig(
        useShallow((state) => ({
            createNewChat: state.createNewChat,
            chatId: state.getLatestId,
            storeUserInputs: state.storeUserInputs,
            storeModelResponse: state.storeModelStreamResponse,
            getChat: state.getChat,
            newChatId: state.newChat,
            saveChatId: state.setNewChatId,
            setWriting: state.setIsWriting,
            isWriting: state.isWriting,
            setTitle: state.setTitle,
            getTitle: state.getTitle,
            updateConversationStatus: state.updateConversationStatus,
            regenerate: state.regenerate,
            regenerateId: state.regenerateId,
            setRegenerate: state.setRegenerate,
            setRegenerateId: state.setRegenerateId,
            storeRegeneratedResponse: state.storeRegeneratedOutput,
            createRoomForRegeneratedResponse: state.createRoomForRegeneratedResponse,
            setMessageDetails: state.SetMessageDetails,
        }))
    )

    const isStoppedRef = React.useRef(false)

    function stop() {
        isStoppedRef.current = true
    }

    const handleSend = useCallback(async function send() {
        // console.log(regenerate)
        try {
            let id = existingID
            if (newChat && !existingID) {
                createNewChat()
                id = chatId()
                if (!id) throw new Error('Chat id not found')
                router(`/chats/${id}`)
                saveChatId(id)
            }

            if (!id) throw new Error('Chat id not found')
            setWriting(true)
            let context: { role: string, parts: { text: string }[] }[] = []
            const chatTitle = getTitle(id)

            // console.log(regenerate)
            if (regenerate) {
                const getAllChats = getChat(id)
                if (!getAllChats) return;
                console.log('first', getAllChats)
                const chatIndex = getAllChats.findIndex((chat) => chat.id === regenerateId.messageId)
                console.log('first', chatIndex)
                const chatsBefore = [...getAllChats].slice(0, chatIndex + 1)
                const lastChat = chatsBefore.at(-1)
                if (!lastChat) return
                chatsBefore[chatsBefore.length - 1] = { ...lastChat, ['model']: {...chatsBefore[chatsBefore.length - 1].model, ['text']:''} }
                createRoomForRegeneratedResponse(id, regenerateId.messageId)
                console.log('first', chatsBefore)
                context = format(chatsBefore)
            } else {
                storeUserInputs(input, id, selectedmodel)
                const chats = getChat(id)
                if (!chats) return
                context = format(chats)
            }

            const conversation = getChat(id)?.at(-1)
            if (!conversation?.id) return;
            console.log('This is going in', context)
            try {
                const response = await ai.models.generateContentStream({
                    model: "gemini-2.5-flash",
                    contents: context,
                    config: {
                        thinkingConfig: {
                            thinkingBudget: 0, // Disables thinking
                        },
                    },
                });
                for await (const chunk of response) {
                    if (isStoppedRef.current) break
                    // const displayIndex = conversation.model.length > 0 ? conversation.model.length + 1 : 0;
                    if (regenerate) {
                        storeRegeneratedResponse(chunk.text, id, regenerateId.regenId)
                    } else {
                        storeModelResponse(chunk.text, id, conversation?.id, 0)
                    }

                }
                updateConversationStatus(conversation?.id, isStoppedRef.current ? 'incomplete' : 'success', id)
                if ((!chatTitle) || chatTitle == 'New chat') await handleChatTitle(id)
            } catch (error) {
                console.log(error)
                updateConversationStatus(conversation?.id, 'error', id)
            } finally {
                isStoppedRef.current = false
            }
        } catch (error) {

        } finally {
            setWriting(false)
            saveInput('')
            setRegenerate(false)
            setRegenerateId('')
        }
    }, [storeModelResponse, getChat, setWriting, isWriting, regenerate, storeUserInputs, saveChatId, saveInput, input, newChat])


    const handleChatTitle = useCallback(async function (id: string) {

        // const updatedchats = getChat(id)
        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: "Title for this",
                config: {
                    thinkingConfig: {
                        thinkingBudget: 0, // Disables thinking
                    },
                },
            });
            const title = response.text
            setTitle(id, title ?? 'New chat')
            // console.log(title, 'title not created')
        } catch (error) {
            console.log(error)
        }

    }, [getChat, setTitle])

    // const handleRegeneration = useCallback(async function (messageId: string, chatId: string) {
    //     // temporary solution
    //     const getAllChats = getChat(chatId)
    //     if (!getAllChats) return
    //     const chatIndex = getAllChats.findIndex((chat) => chat.id === messageId)
    //     const chatsBefore = [...getAllChats].slice(0, chatIndex + 1)
    //     const lastChat = chatsB  efore.at(-1)
    //     if (!lastChat) return
    //     chatsBefore[chatsBefore.length - 1] = { ...lastChat, ['model']: '' }

    //     try {
    //         const response = await ai.models.generateContentStream({
    //             model: "gemini-2.5-flash",
    //             contents: "Your name",
    //             config: {
    //                 thinkingConfig: {
    //                     thinkingBudget: 0, // Disables thinking
    //                 },
    //             },
    //         });
    //         for await (const chunk of response) {
    //             if (isStoppedRef.current) break
    //             storeModelResponse(chunk.text, chatId, messageId)
    //         }
    //         updateConversationStatus(messageId, isStoppedRef.current ? 'incomplete' : 'success', chatId)
    //     } catch (error) {
    //         console.log(error)
    //         updateConversationStatus(messageId, 'error', chatId)
    //     } finally {
    //         isStoppedRef.current = false
    //     }

    // }, [])



    return (
        <div className=" md:w-full w-full mb-3 rounded-3xl border border-zinc-500 bg-white shadow-sm">
            <form className="w-full px-3 flex items-center justify-between">
                <Textbox isWriting={isWriting} input={input} send={handleSend} saveInput={saveInput} />
                <Actions send={handleSend} stop={stop} />
            </form>
        </div>
    )
}

export default React.memo(Input)


// make messages an array
// for regenerate messages add
// 