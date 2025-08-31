import bot from '../../../public/Adobe Express - file (1) 1.svg'
import leftmic from '../../../public/Group 1634.svg'
import rightmic from '../../../public/Group 1633.svg'

export default function Hero() {
    return (
        <div className="flex items-center justify-between grid-bg  w-full mt-12 px-12">
            <div className="relative">
                <div className="text-white absolute lg:-top-12 sm:-top-8 -top-6 -left-12 text-start md:text-xl sm:text-sm  msm:text-[12px] xsm:text-[10px] text-[8px]">{`"say what you want"`}</div>
                <img src={leftmic} alt="say what you want" className="" />
            </div>
            <div>
                <img src={bot} alt="ai" className="min-w-[80px]" loading='lazy' />
            </div>
            <div className="relative">
                <div className="text-white absolute lg:-bottom-12 sm:-bottom-8 -bottom-6 text-start md:text-xl sm:text-sm  text-[8px] text-nowrap msm:text-[12px] xsm:text-[10px]">{`"Write, what you want"`}</div>
                <img src={rightmic} alt="Write, what you want" className="" />
            </div>
        </div>
    )
}
