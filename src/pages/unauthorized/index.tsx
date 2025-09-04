import { Outlet } from "react-router-dom";
import Sidebar from "../../components/layouts/sidebar/sidebar";
import Navbar from "../../components/layouts/navbar";
import Footer from "../../components/layouts/footer";
import MobileSidebar from "../../components/layouts/sidebar/mobile-sidebar";
import { useMobileSidebarToggle } from "../../store/utils";
import MainPage from "./main-page";
import { useUser } from "@clerk/clerk-react";

function Default() {
    const { isSignedIn, isLoaded } = useUser();
    const isOpen = useMobileSidebarToggle((state) => state.isOpen)
    if (!isLoaded) {
        return <MainPage/>;
    }
    if (!isSignedIn) {
        return <MainPage/>
    }

    return <div className='w-full flex '>
        <div className="hidden md:block">
            <Sidebar />
        </div>
        <div className="absolute z-100">
            {isOpen &&
                <MobileSidebar />
            }
        </div>

        <main className="flex-1 w-full h-[100dvh] flex flex-col">
            <Navbar />
            <div className='flex-1 overflow-hidden'>
                <Outlet />
            </div>
            <footer className="w-full   items-center justify-center py-1 z-50 hidden msm:flex">
                <Footer />
            </footer>
        </main>
    </div>
}

export default Default