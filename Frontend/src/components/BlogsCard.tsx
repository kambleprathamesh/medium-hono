import { useState } from "react";

interface BlogsCard {
    authorName: string, title: string, content: string, publishedDate: String
}
export const BlogsCards = ({ authorName, title, content, publishedDate }: BlogsCard) => {
    console.log("authorName", authorName);
    const nameParts = authorName.trim().split(" "); // Remove extra spaces and split
    const firstName = nameParts[0] || ""; // Ensure it's not undefined
    const lastName = nameParts[1] || ""; // Handle cases with only one name

    const firstLetter = firstName ? firstName[0] : ""; // Extract first letter safely
    const lastLetter = lastName ? lastName[0] : ""; // Extract last letter safely
    const [description, setDescription] = useState<boolean>(false);
    const readFull = () => {
        setDescription((prev) => !prev);
    }

    return (

        <div className="p-4 border-b border-slate-100">
            <div className="flex  items-center  gap-2 relative">
                <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 p-4 text-base">
                    <span className=" font-medium text-gray-600 dark:text-gray-300">{firstLetter}{lastLetter}</span>
                </div>
                <div className="flex items-center absolute top-4 left-9">
                    <Circle />
                </div>
                <div className="text-lg font-medium pl-2">{authorName} </div>
                <div className="text-md text-[#6b6b6b] font-thin">{publishedDate}</div>
            </div>

            <div className="text-2xl font-bold ">{title}</div>

            <div onClick={readFull} className="text-xl font-thin cursor-pointer">
                {description ? content : content.length > 100 ? content.slice(0, 100) + " ...." : content}
            </div>
            <div className="text-base font-thin pt-4">{Math.ceil(content.length / 100) + "  minutes"}</div>


        </div>
    )
}


function Circle() {
    return (
        <div className="w-1 h-1 rounded-full bg-slate-500">

        </div>
    )
}



