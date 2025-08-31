import Header from "./header";
import { BsLayoutSidebar } from "react-icons/bs";
import History from "./chats";
import Features from "./feats";
import { useMobileSidebarToggle } from "../../../store/utils";
import { useModels } from "../../../store/model";
import { useCallback, useEffect, useRef } from "react";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { LuLogOut } from "react-icons/lu";
import Avatar from "react-avatar";
export default function MobileSidebar() {
    const { user } = useUser();
    const ref = useRef<HTMLDivElement>(null)
    const isOpen = useMobileSidebarToggle((state) => state.isOpen)
    const closeSidebar = useMobileSidebarToggle((state) => state.trigger)
    const selectedmodel = useModels(state => state.ai)
    const sidebartriggerstyles = isOpen ? ' left-62 w-4 top-4 h-4 ' : 'w-8 h-8 top-4 left-[18px] cursor-e-resize  items-center justify-center group'

    const handleOutsideClick = useCallback((e: Event) => {
        if (ref.current && !ref.current.contains(e.target as Node)) closeSidebar()
    }, [])

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick)
        return () => document.removeEventListener('click', handleOutsideClick)
    }, [])

    return (
        <div
            className={`p-2 h-[100dvh] flex flex-col z-10 l-0 bg-zinc-50 border-l-2 ${isOpen ? "w-64" : "w-16 cursor-e-resize"
                }`}
            ref={ref}
        >
            <div className="shrink-0">
                <Header isOpen={isOpen} selectedmodel={selectedmodel} />
                <Features isOpen={isOpen} />

                {/* sidebar trigger */}
                <div
                    className={`rounded-sm md:flex hidden hover:bg-zinc-100 cursor-pointer absolute ${sidebartriggerstyles}`}
                    onClick={closeSidebar}
                >
                    <BsLayoutSidebar className={`${!isOpen && "hidden group-hover:flex"}`} />
                </div>
            </div>

            {isOpen && (
                <div className="flex-1 overflow-y-auto">
                    <History />
                </div>
            )}

            <div className="w-full shrink-0 border-t-2 border-t-zinc-100 flex p-2">
                <div className="">
                    <Avatar name={`${user?.firstName}`} size="40px" round color="grey" />
                </div>
                {isOpen && (
                    <>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700">Settings</p>
                            <p className="text-xs text-gray-400">Manage preferences</p>
                        </div>
                        <SignOutButton>
                            <div className="w-8 h-8 cursor-pointer flex items-center justify-center ml-4">
                                <LuLogOut className="text-xl text-zinc-800" />
                            </div>
                        </SignOutButton>
                    </>
                )}
            </div>
        </div>

    )
}


