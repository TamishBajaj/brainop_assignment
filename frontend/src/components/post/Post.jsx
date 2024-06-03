import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Post.css'
import { useNavigate } from 'react-router-dom';

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchPosts = async () => {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'x-auth-token': token
                }
            };
            const res = await axios.get(`http://localhost:3000/api/v1/posts`, config);
            if (res.data.length === 0) {
                setHasMore(false);
            } else {
                setPosts((prevPosts) => [...prevPosts, ...res.data]);
            }
        };
        fetchPosts();
    }, [page]);

    const handleClk=()=>{
        navigate('/create-post');
    }

    const loadMore = () => {
        if (hasMore) {
            setPage(page + 1);
        }
    };

  return (
    <div className="post_main">

            <h2 className="post_head">Lets Check out your recent posts</h2>
            <h4 className='btm_line'>Looks Amazing Right</h4>
            <button className='crt_post' onClick={handleClk}>Create Post</button>
            <div className="total_posts">
                {posts.map((post) => (
                    <div key={post._id} className="single_post">
                        <h3 className="post_title">{post.title}</h3>
                        <p className='post_cont'>{post.content}</p>
                        <button className='post_btn'>Explore</button>
                    </div>
                ))}
            </div>
            {/* {hasMore && (
                <button onClick={loadMore} className="w-full bg-blue-500 text-white p-2 mt-4">
                    Load More
                </button>
            )} */}
        </div>
  )
}

export default Post