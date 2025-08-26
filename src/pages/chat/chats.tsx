import {  useParams } from "react-router-dom"
import ChatRoom from "./index"

function ChatRoomWrapper() {
    const { id } = useParams()


    if (!id) return <h1>Chat id not found</h1>
    return (
        <ChatRoom chatId={id} />
    )
}

export default ChatRoomWrapper