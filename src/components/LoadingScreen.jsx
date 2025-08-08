import { useEffect, useState } from "react"

export const LoadingScreen = ({onComplete}) => {
    const [text, setText] = useState("");
    const fullText = "< Hello World />";

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setText(fullText.substring(0,index));
            index++;

            if(index > fullText.length){
                clearInterval(interval)

            setTimeout(() => {
                onComplete();
            },1000)
            }

        }, 100)

        return () => clearInterval(interval);
    }, [onComplete])


    return (
        <div className="flex flex-col z-50 items-center justify-center items-center text-gray-100 bg-black fixed inset-0">
            <div className="mb-4 text-4xl font-mono font-bold">
                {text}<span className="ml-1 animate-blink"> |</span>
            </div>
            <div className="w-[200px] h-[2px] bg-gray-800 rounded overflow-hidden">
                <div className="w-[40%] h-full bg-blue-500 animate-loading-bar">{" "}</div>
            </div>
        </div>
        
    )
}