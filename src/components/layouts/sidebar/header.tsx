
import { RiExpandUpDownLine } from "react-icons/ri"
import Wrapper from "../../dropdown"
import Models from "./provider"
import { models } from "../../../data"
import gemini from '../../../../public/google-gemini-icon.svg'
import { useSidebarWrapperControl } from "../../../store/utils";
import { useShallow } from "zustand/shallow"

interface Headerprops {
    isOpen: boolean,
    selectedmodel: string

}

function Header({ isOpen, selectedmodel }: Headerprops) {
    const { trigger, isWrapperOpen } = useSidebarWrapperControl(
        useShallow((state) => ({
            trigger: state.trigger,
            isWrapperOpen: state.isOpen
        })))
    const modeldetails = models.find(model => model.key === selectedmodel) ?? {
        name: 'Gemini',
        icon: gemini,
        provider: 'Google Deepmind'
    }

    return (
        <div className="p-2 rounded-lg cursor-pointer hover:bg-zinc-100 flex items-center justify-between" onClick={trigger}>
            <div className="flex items-center justify-start gap-2">
                <div className="w-8 h-8">
                    <img src={modeldetails?.icon} alt={modeldetails?.name} />
                </div>
                {
                    isOpen && <div className="">
                        <div className="font-[500]">
                            {modeldetails?.name}
                        </div>
                        <div className="font-[400] text-sm">
                            {modeldetails?.provider}
                        </div>
                    </div>
                }

            </div>

            {
                isOpen && <div>
                    <RiExpandUpDownLine />
                </div>
            }


            <Wrapper className="absolute z-20 top-10" isOpen={isWrapperOpen} trigger={trigger}>
                <Models />
            </Wrapper>
        </div>
    )
}

export default Header