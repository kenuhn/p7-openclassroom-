import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  { isEmpty } from "../components/utils";
import CardComments from "./cardComment";
import DeletCard from "./deletCard";
import LikeButton from "./likeButton";

const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const  [showComments, setShowComments] = useState(false);
    const usersData = useSelector((state) => state.UsersReducer);
    const userData = useSelector((state) => state.UserReducer);
    const dispatch = useDispatch();
    useEffect(() => {
         !isEmpty(usersData[0]) && setIsLoading(false) 
    }, [usersData])
   const AdminID = { id: 1}
    return (
        <li className="card-container" key={post.id}>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                <>
                <div className="card-left">
                  <img
                    src={
                      !isEmpty(usersData[0]) &&
                      usersData
                        .map((user) => {
                          if (user.id === post.auteurID) return user.imagesUrl;
                          else return null;
                        })
                        .join("")
                    }
                    alt="poster-pic"
                    />
                </div>
                
                <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user.id === post.auteurID) return user.pseudo;
                        else return null;
                      })
                      .join("")}
                </h3>
              </div>
            </div>
            <p>{post.description}</p>
            {post.imagesUrl &&( <img src={post.imagesUrl} alt="images du post" className="card-pic" />)}
            {userData.id === AdminID.id &&(
              <div className="button-container">
                <DeletCard id={post.id} />
              </div>
            )}
            <div className="card-footer">
              <div className="comment-icon">
                <img onClick={() => setShowComments(!showComments)} src="./img/message1.svg"alt="comment"/>
                <span>{post._count.commentaires}</span>
              </div>
              <LikeButton post={post}/>
                <img src="./img/share.svg" alt="share" />
            </div>
            {showComments && <CardComments post={post} />}
            </div>
    
        </>      
            )}
        
        </li>
    );
}

export default Card;
