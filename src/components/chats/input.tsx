import { GoCopy } from "react-icons/go";
import { useState } from "react";
import Avatar from "react-avatar";
import { LuCheck } from "react-icons/lu";
import { useUser } from "@clerk/clerk-react";

function Userinput({ input }: { input: string }) {
    const [copied, setCopied] = useState(false);
    const {  user } = useUser();
    const handleCopy = async () => {
        await navigator.clipboard.writeText(input);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    return (
        <div className=" md:w-[70%] msm:max-w-[2rem] flex flex-col gap-2 items-start justify-start relative">
            <div>
                <Avatar
                    color="#71717b"
                    name={`${user?.firstName}`}
                    round
                    size="25"
                />
            </div>
            <div className="w-full   ml-8 group relative flex flex-col items-start justify-start  px-1 sm:px-0">
                <div className=" px-4 py-1 text-sm shadow-sm rounded-md bg-zinc-200 max-w-full break-words">
                    {input}
                </div>
                <div
                    role="button"
                    aria-label="Copy message"
                    onClick={handleCopy}
                    className="mt-2 opacity-0 group-hover:opacity-100 flex items-center text-sm cursor-pointer text-zinc-500 hover:text-black transition-all duration-200 z-10"
                >
                    {copied ? <LuCheck /> : <GoCopy />}
                    {copied && <span className="ml-1 text-xs">Copied!</span>}
                </div>
            </div>
        </div>
    );
}

export default Userinput;
