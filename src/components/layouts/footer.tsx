import { useModel } from "../../store/model"

function Footer() {
    const model = useModel(state=>state.model)

    const initialFooter = <div className="text-[12px] text-zinc-500">
        By messaging {model}, you agree to our  <span className="underline">Terms</span> and have read our  <span className="underline">
            Privacy Policy </span>
    </div>

    const mainFooter = <div className="text-[12px] text-zinc-500"> 
        {model} can make mistakes. Check important info
    </div>

    const startChat = false
    if (startChat) return mainFooter
    return initialFooter
}

export default Footer