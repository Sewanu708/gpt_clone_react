'use client'
import { IoIosArrowDown } from "react-icons/io";
import { GoQuestion } from "react-icons/go";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Wrapper from "../dropdown";
import Model from "./sidebar/model";
import { useHeaderToggle, useMobileSidebarToggle } from "../../store/utils";
import { useModel } from "../../store/model";
import { LuAlignLeft } from "react-icons/lu";
import { aiModels } from "../../data";


function Navbar() {
    const isOpen = useHeaderToggle((state) => state.isOpen)
    const closeDropdown = useHeaderToggle((state) => state.trigger)
    const trigger = useMobileSidebarToggle((state) => state.trigger)
    const selectedmodel = useModel(state => state.model)

    const defaultModel = aiModels.google.at(0)?.name
    return (
        < nav className="w-full flex items-center justify-between py-4 border-b-2 border-b-zinc-100 px-4 md:px-12  bg-white" >
            <div className="flex gap-1.5 items-center justify-center">
                <LuAlignLeft className="text-[18px] text-zinc-800 block md:hidden cursor-pointer" onClick={(e)=>{
                    e.stopPropagation() 
                    trigger()
                }}/>
                <div className="flex items-center justify-center font-semibold hover:bg-zinc-50 px-2 py-1 rounded-sm cursor-pointer" onClick={closeDropdown}>
                    <span className="text-sm">{selectedmodel || defaultModel}</span>
                    <IoIosArrowDown className=" text-zinc-500 ml-1" />
                </div>
            </div>
            <div className="hidden sm:flex gap-2 items-center">
                {/* <Button className="rounded-3xl">Log in</Button>
                <Button variant="outline" className="rounded-3xl">Sign up</Button> */}
                <GoQuestion className=" ml-2 text-zinc-500" />
            </div>
            <div className="flex sm:hidden">
                <HiOutlineDotsVertical />
            </div>

            <Wrapper className="absolute z-20 top-10" isOpen={isOpen} trigger={closeDropdown}>
                <Model />
            </Wrapper>
        </nav >)
}

export default Navbar

