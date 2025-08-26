import Header from "./header";
import { BsLayoutSidebar } from "react-icons/bs";
import History from "./chats";
import Features from "./feats";
import { useSidebarToggle } from "../../../store/utils";
import { useModels } from "../../../store/model";

export default function Sidebar() {
  
    const isOpen = useSidebarToggle((state) => state.isOpen)
    const closeSidebar = useSidebarToggle((state) => state.trigger)
    const selectedmodel = useModels(state => state.ai)
    const sidebartriggerstyles = isOpen?' left-62 w-4 top-4 h-4 ':'w-8 h-8 top-4 left-[18px] cursor-e-resize flex items-center justify-center group'

    return (
        <div className={` p-2  h-[100dvh] z-10 l-0  bg-zinc-50 border-l-2 ${isOpen ? 'w-64' : 'w-16 cursor-e-resize'}`}>
            <Header  isOpen={isOpen} selectedmodel={selectedmodel} />
            <Features isOpen={isOpen} />
            {
                isOpen && <History />
            }

            {/* sidebar trigger */}
            <div className={`rounded-sm hover:bg-zinc-100 cursor-pointer absolute ${sidebartriggerstyles}` } onClick={closeSidebar}>
                <BsLayoutSidebar className={`${!isOpen && 'hidden group-hover:flex'}`}/>
            </div>
        </div>
    )
}


