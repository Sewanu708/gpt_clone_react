import { LuAlignJustify, LuArrowUpRight, LuUser } from "react-icons/lu"
import life from '../../../public/Group 1.svg'
import { Link } from "react-router-dom"
import { lazy, Suspense } from "react"


const Hero = lazy(() => import('./hero'))

function MainPage() {
    return (
        <div className="h-full min-h-screen gradient-bg p-8">
            <nav className=" w-full flex items-center justify-between">
                <div className="rounded-full flex justify-center items-center py-2 hover:scale-95 transition-all duration-300 ease-in-out cursor-pointer px-4 border border-white">
                    <LuAlignJustify className="text-white" />
                    <span className="ml-2 text-white hidden sm:block">MENU</span>
                </div>
                {/* <LuAlignLeft className="" /> */}
                <div className="text-white font-bold text-xl">
                    FUTURE.
                </div>
                <Link to={'/auth/sign-in'} className=" hover:scale-95 transition-all duration-300 ease-in-out rounded-full flex justify-center items-center py-2 px-4 border cursor-pointer border-white">
                    <span className=" sm:block hidden text-white mr-2">Sign up</span>
                    <LuUser className="text-white " />
                </Link>
            </nav>

            <div className="flex items-center justify-center mt-12">
                <div className="text-white font-bold md:text-[64px] sm:text-5xl msm:text-3xl xsm:text-2xl text-xl mr-4 ">
                    LIFE IS
                </div>
                <img src={life} alt='ai' className="lg:w-52 md:w-48 sm:w-36 msm:w-32 xsm:w-26 w-22 " />
                <div className="text-white font-bold md:text-[64px] sm:text-5xl msm:text-3xl xsm:text-2xl text-xl ml-4">
                    WITH AI
                </div>
            </div>

            <Suspense fallback={<div>loading...</div>}>
                <Hero />
            </Suspense>


            <div className="flex items-center justify-center gap-2 mt-8">
                <Link to={'/auth/sign-in'} className="bg-[#f5fc9d] hover:scale-95 transition-all duration-300 ease-in-out rounded-full w-fit py-2 px-4 font-semibold cursor-pointer sm:text-xl text-sm">
                    GET STARTED
                </Link>
                <Link to={'/auth/sign-in'} className="p-2 hover:scale-95 transition-all duration-300 ease-in-out cursor-pointer rounded-full w-fit bg-white">
                    <LuArrowUpRight className="sm:text-xl text-sm" />
                </Link>
            </div>
        </div>
    )
}

export default MainPage


// 2238404746