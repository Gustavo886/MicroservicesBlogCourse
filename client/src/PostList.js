import React, { useState, useEffect} from "react";
import axios from 'axios';
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4000/posts');

        setPosts(res.data);
    };
    //To use this function only when display the component and only one time.
    useEffect(() => {
        fetchPosts();
    }, []);

    console.log(posts);

    const renderedPost = Object.values(posts).map(post => {
        return (
            <div
                className="card"
                style={ { width: '30%', marginBottom: '20px' } }
                key={post.id}
            >
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentList postId={post.id}/>
                    <CommentCreate postId={post.id} />
                </div>
        </div>);
    })

    return <div className="d-flex flex-row flex-wrap justify-contex-between">
        {renderedPost}
    </div>;
};