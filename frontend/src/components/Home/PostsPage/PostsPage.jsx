import React from 'react'
import Post from '../Post/Post'
import './PostsPage.css'

const PostsPage = () => {
    return (
        <>
            <div className="container flex flex-col justify-start items-center gap-4">
                <Post url={`https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} username={`@nancy_2727`} content={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ducimus, eveniet laboriosam blanditiis animi quisquam et nostrum vel eius, impedit consectetur nihil provident soluta doloribus exercitationem magni, ratione cumque ullam.`} />
                <Post url={`https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} username={`@nancy_2727`} content={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ducimus, eveniet laboriosam blanditiis animi quisquam et nostrum vel eius, impedit consectetur nihil provident soluta doloribus exercitationem magni, ratione cumque ullam.`} />
                <Post url={`https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} username={`@nancy_2727`} content={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ducimus, eveniet laboriosam blanditiis animi quisquam et nostrum vel eius, impedit consectetur nihil provident soluta doloribus exercitationem magni, ratione cumque ullam.`} />
                <Post url={`https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} username={`@nancy_2727`} content={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ducimus, eveniet laboriosam blanditiis animi quisquam et nostrum vel eius, impedit consectetur nihil provident soluta doloribus exercitationem magni, ratione cumque ullam.`} />
                <Post url={`https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} username={`@nancy_2727`} content={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ducimus, eveniet laboriosam blanditiis animi quisquam et nostrum vel eius, impedit consectetur nihil provident soluta doloribus exercitationem magni, ratione cumque ullam.`} />
                <Post url={`https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} username={`@nancy_2727`} content={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ducimus, eveniet laboriosam blanditiis animi quisquam et nostrum vel eius, impedit consectetur nihil provident soluta doloribus exercitationem magni, ratione cumque ullam.`} />
            </div>
        </>
    )
}

export default PostsPage