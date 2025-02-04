// import { useEffect, useState } from "react"
// import { BACKEND_URL } from "../config";
// import axios from "axios";
// export const useBlogs = () => {
//     const [loading, setloading] = useState(true);
//     const [blogs, setBlogs] = useState([]);



//     const getBlogs = async () => {
//         const res = await axios.get(`${BACKEND_URL}/api/v1/blog/main/bulk`, {
//             headers: {
//                 Authorization: localStorage.getItem("token")
//             }
//         });
//         console.log(res);
//         setBlogs(res.data.posts)
//     }
//     useEffect(() => {
//         getBlogs();
//         setloading(false)
//     }, [])
//     return {
//         loading,
//         blogs
//     }
// }


import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

// Define types for the blog data
interface Blog {
    title: string;
    content: string;
    authorName: string;
    publishedDate: string;
    // Add other fields as needed
}

export const useBlogs = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [blogs, setBlogs] = useState<Blog[]>([]); // Type the blogs state

    // Async function to fetch blogs from the backend
    const getBlogs = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/v1/blog/main/bulk`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is correctly passed as Bearer
                },
            });
            console.log(res); // Optional: to check response structure
            setBlogs(res.data.post || []); // Ensure you handle cases when posts is undefined
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false); // Set loading to false after request completion
        }
    };

    useEffect(() => {
        getBlogs();
    }, []); // Empty dependency array means this runs once when the component mounts

    return {
        loading,
        blogs,
    };
};
