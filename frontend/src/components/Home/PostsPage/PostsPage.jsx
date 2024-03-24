import React, { useEffect, useState } from 'react'
import Post from '../Post/Post'
import './PostsPage.css'

const PostsPage = () => {
    // const temp = 2;
    const [postData, setPostData] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/")
            .then(res => res.json())
            .then(data => {
                setPostData(data)
            })
    }, [])
    return (
        <>
            <div className="container flex flex-col justify-start items-center gap-4">
                {postData.map((data,index) => {
                    return (
                        <Post url={`https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} username={`@${data.postedby.userName}`} caption={data.caption} content={data.image} key={index} />
                    )
                })}
                <Post url={`https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} username={`@nancy_2727`} caption={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ducimus, eveniet laboriosam blanditiis animi quisquam et nostrum vel eius, impedit consectetur nihil provident soluta doloribus exercitationem magni, ratione cumque ullam.`} content={`https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} />
                <Post url={`https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} username={`@nancy_2727`} caption={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ducimus, eveniet laboriosam blanditiis animi quisquam et nostrum vel eius, impedit consectetur nihil provident soluta doloribus exercitationem magni, ratione cumque ullam.`} content={`https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} />
                <Post url={`https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} username={`@nancy_2727`} caption={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ducimus, eveniet laboriosam blanditiis animi quisquam et nostrum vel eius, impedit consectetur nihil provident soluta doloribus exercitationem magni, ratione cumque ullam.`} content={`https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} />
                <Post url={`https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} username={`@nancy_2727`} caption={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ducimus, eveniet laboriosam blanditiis animi quisquam et nostrum vel eius, impedit consectetur nihil provident soluta doloribus exercitationem magni, ratione cumque ullam.`} content={`https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} />
                <Post url={`https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} username={`@nancy_2727`} caption={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ducimus, eveniet laboriosam blanditiis animi quisquam et nostrum vel eius, impedit consectetur nihil provident soluta doloribus exercitationem magni, ratione cumque ullam.`} content={`https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} />
                <Post url={`https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} username={`@nancy_2727`} caption={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ducimus, eveniet laboriosam blanditiis animi quisquam et nostrum vel eius, impedit consectetur nihil provident soluta doloribus exercitationem magni, ratione cumque ullam.`} content={`https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} />
                <Post url={`https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} username={`@nancy_2727`} caption={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ducimus, eveniet laboriosam blanditiis animi quisquam et nostrum vel eius, impedit consectetur nihil provident soluta doloribus exercitationem magni, ratione cumque ullam.`} content={`https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} />
                <Post url={`https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} username={`@nancy_2727`} caption={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ducimus, eveniet laboriosam blanditiis animi quisquam et nostrum vel eius, impedit consectetur nihil provident soluta doloribus exercitationem magni, ratione cumque ullam.`} content={`https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} />
            </div>
        </>
    )
}

export default PostsPage