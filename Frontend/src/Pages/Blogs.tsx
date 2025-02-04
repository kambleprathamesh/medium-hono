// import { BlogsCards } from "../components/BlogsCard"
// import { useBlogs } from "../Hooks/UseBlogs"



// type Blog = {
//     content: string,
//     title: string,
//     author: {
//         name: string
//     }
// }
// export const Blogs = () => {
//     const { loading, blogs } = useBlogs<Blog>();
//     if (loading) {
//         return <div>Loading....</div>
//     }

//     console.log("BLOGS", blogs)
//     return (


//         <div className="flex justify-center">


//             <div className="flex flex-col justify-center max-w-xl  ">
//                 {
//                     blogs.map((blog, key) => {
//                         return (
//                             <BlogsCards authorName={blog.author.name||""} title={blog.title} content={blog.content} publishedDate="JAN 04,2025" />
//                         )
//                     })
//                 }


//             </div>
//         </div>




//     )
// }



import { BlogsCards } from "../components/BlogsCard";
import { useBlogs } from "../Hooks/UseBlogs";

// Define the type of the Blog object
type Blog = {
    content: string;
    title: string;
    author: {
        name: string;
    };
};

export const Blogs = () => {
    const { loading, blogs } = useBlogs(); // No need for <Blog> here, just call it
    if (loading) {
        return <div>Loading....</div>;
    }

    console.log("BLOGS", blogs);

    return (
        <div className="flex justify-center">
            <div className="flex flex-col justify-center max-w-xl">
                {blogs.map((blog, key) => {
                    return (
                        <BlogsCards
                            key={key} // Adding a key to each element to help React track each element
                            authorName={blog.author.name || ""}
                            title={blog.title}
                            content={blog.content}
                            publishedDate="JAN 04,2025"
                        />
                    );
                })}
            </div>
        </div>
    );
};
