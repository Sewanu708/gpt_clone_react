import { GoCopy } from "react-icons/go"
import { models } from "../../data"
import { LuCheck, LuRefreshCcw } from "react-icons/lu"
import {  useState } from "react"
import { useChatConfig } from "../../store/user"
import { useShallow } from "zustand/shallow"
import { useParams } from "react-router-dom"


function ModelOutput({ loading, agent, id }: {  loading: boolean, agent: string, id: string }) {
    const { id: chatId } = useParams()

    const modeldetails = models.find(model => model.key === agent)
    const [copied, setCopied] = useState(false)
    // const [index, setIndex] = useState(0)
    const handleCopy = async () => {
        // await navigator.clipboard.writeText(modelResponse.text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    const { setRegenerate, setRegenerateId, setMessageDetails } = useChatConfig(
        useShallow((state) => ({
            setRegenerate: state.setRegenerate,
            setRegenerateId: state.setRegenerateId,
            setMessageDetails: state.SetMessageDetails
        })))


    // useEffect(() => {
    //     if (!chatId) return;
    //     updateDisplayIndex(chatId, id, index);
    // }, [index, chatId, id, updateDisplayIndex]);

    // console.log(modelResponse[index])
    if (!chatId) return <h1>Chats not found</h1>
    return (
        <div
            className=" w-[70%] flex flex-col gap-2 items-start justify-start relative"
        >
            <div className="w-4 h-4">
                <img
                    src={modeldetails?.icon}
                    alt={modeldetails?.name || ''}
                />
            </div>
            {
                loading ?
                    <div className="bg-black ai-loading ml-8" /> :
                    <div className="select-text ml-8 shadow-sm px-2 py-1 rounded-sm text-sm">
                        {/* {modelResponse.text} */}
                    </div>
            }
            <div className="flex ml-10 mt-1 gap-4">
                {/* {
                    modelResponse  &&
                    < div className="flex items-center">
                        <LuChevronLeft
                            className={` hover:text-black ${index === 0 ? 'text-zinc-500' : 'text-zinc-800'}`}
                            onClick={() => {
                                setIndex((prev) => {
                                    if (prev === 0) return prev
                                    const newIndex = prev - 1
                                    return newIndex
                                })
                            }} />
                        <span className="text-sm text-zinc-800">
                            {index + 1}/{modelResponse.length}
                        </span>
                        <LuChevronRight
                            className={` hover:text-black ${index === modelResponse.length ? 'text-zinc-500' : 'text-zinc-800'}`}
                            onClick={() => {
                                setIndex((prev) => {
                                    if (prev === modelResponse.length - 1) return prev
                                    const newIndex = prev + 1
                                    if (!chatId) return prev
                                    return newIndex
                                })
                            }} />
                    </div>
                } */}

                <div onClick={handleCopy} className="flex">
                    {copied ? <LuCheck /> : <GoCopy color="grey" />}
                    {copied && <span className="ml-1 text-xs">Copied!</span>}
                </div>
                <div onClick={() => {
                    setRegenerateId(id)
                    // setIndex(prev => prev + 1)
                    setMessageDetails(chatId, id, Date.now())
                    setRegenerate(true)
                }}>
                    <LuRefreshCcw color="grey" />
                </div>

            </div>
        </div >
    )
}

export default ModelOutput