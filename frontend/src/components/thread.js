import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/post-actions';
import { getLikes } from '../actions/like-actions';
import Card from './card';
import { isEmpty } from './utils';
const Thread = () => {
    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer)
    const likeData = useSelector((state) => state.likeReducer)
    useEffect(() => {
        dispatch(getLikes())
        if(loadPost){
            dispatch(getPosts());
            setLoadPost(false)
        }
    }, [loadPost, dispatch])
    console.log(likeData)
    return (
        <div className="thread-container">
            <ul>
                {!isEmpty(posts[0]) &&
                    posts.map((post) => {
                        return <Card post={post} key={post.id} />
                    })
                }
            </ul>
            
        </div>
    );
};

export default Thread;