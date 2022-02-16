import React, { useEffect, useState, useContext, } from 'react';
import { useSelector } from "react-redux";
import { UidContext } from './appContext';
import { render } from 'react-dom';
import Axios from 'axios'



const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState(false)
    const uid = useContext(UidContext)
    const usersData = useSelector((state) => state.UsersReducer);
    const userLikeData = useSelector((state) => state.likeReducer)
    const userLike = post.like.map((userLike) => {
      return userLike.userlikedID
    })
    const [like, setLike] = useState(0)
    useEffect(() => {
        if (userLike.includes(uid)) setLiked(true);
        else setLiked(false);
    }, [uid, userLike, like]);
/*
    const likePost = () => {
            setLike(c => c = 1)
            console.log(like)
    
    }

    const dislikePost = () => {
            
        setLike(c => c = 0)
           console.log(like)
    
       }*/
    

    const HandleLike = (e) => {
       if (like === 0 ){
        e.preventDefault();
        setLike(like => like = 1)
            setLiked(true)
        console.log(like)
       } else {
        e.preventDefault();
        setLike(like => like = 0)
        setLiked(false)
            
            console.log(like)
    
       }

        Axios({
            method: "post",
            url: `http://localhost:5050/api/home/${post.id}/like`,
            withCredentials: true,
            data: {
                like
            }
        })
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
                throw err
            })
    }
    return (
        <div className="like-container">
            {uid && liked === false && (
                <img src="./img/heart.svg" onClick={HandleLike} alt="like" />
            )}
             {uid && liked && (
            <img src="./img/heart-filled.svg" onClick={HandleLike} alt="unlike" />
             )}
            <span>{post._count.like}</span>
        </div>
    );
};
export default LikeButton;