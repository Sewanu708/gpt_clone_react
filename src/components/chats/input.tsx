import { GoCopy } from "react-icons/go"
function Userinput({ input }: { input: string }) {
    return (
        <div className="w-full group flex flex-col items-end justify-end mb-12 relative px-1 sm:px-0">
            {/* <div className="flex items-center text-zinc-400 text-sm mb-2">
                <MdOutlineSubdirectoryArrowRight className="mr-1" />
                <span className="truncate max-w-xs sm:max-w-sm">Hello World</span>
            </div> */}
            <div className="w-fit max-w-[85%] sm:max-w-[60%] px-4 py-2 bg-zinc-200 rounded-3xl text-sm sm:text-base">
                {input}
            </div>
            <div
                className="absolute -bottom-6 right-2 opacity-0 group-hover:opacity-100 flex items-center text-sm cursor-pointer text-zinc-500 hover:text-black transition-all duration-200 z-10"
            >
                {/* {copied ? <FaCheck /> : <GoCopy />} */}<GoCopy />
            </div>
        </div>
    )
}

export default Userinput