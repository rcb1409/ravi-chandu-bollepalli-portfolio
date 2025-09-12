import { useEffect } from "react"

export const Navbar = ({menuOpen, setMenuOpen}) => {

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
    }, [menuOpen])

    return(
        <nav className="fixed top-0 w-full z-40 bg-[rgba(10,10,10,0.8)] backdrop-blur-lg border-white/10">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <a href="#home" className="font-mono font-bold text-white text-xl">{" "}RaviChanduBollepalli<span className="text-blue-500">.me</span> {" "}</a>
                    <div className="w-7 h-5 cursor-pointer md:hidden" onClick={() => {setMenuOpen((prev) => !prev)}}>
                        &#9776;
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#home" className="text-gray-300 hover:text-white transtion-white ">
                            Home
                        </a>
                                                <a href="#about" className="text-gray-300 hover:text-white transtion-white">
                          About
                        </a>
                                                                        <a href="#experience" className="text-gray-300 hover:text-white transtion-white">
                            Experience
                        </a>
                                                <a href="#projects" className="text-gray-300 hover:text-white transtion-white">
                            Projects
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}