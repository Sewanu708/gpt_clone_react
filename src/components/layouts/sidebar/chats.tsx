import { useShallow } from "zustand/shallow"
import { useParams } from "react-router-dom";
import { useChatConfig } from "../../../store/user";
import Chats from "./chat";

function History() {
    const { id: chat_id } = useParams()
    // const router = useNavigate()
    const { history } = useChatConfig(
        useShallow((state) => ({
            history: state.title
        })))

    return (
        <div className="w-full mt-8">
            <div className="text-sm  text-zinc-600 px-2 mb-1">
                Chats
            </div>
            <div className="w-[90%] flex flex-col-reverse gap-2">
                { //@ts-ignore
                    history.map((chat) => <Chats chat={chat} chat_id={chat_id} />
                    )
                }

            </div>

        </div>
    )
}



export default History