import { React, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../actions/post-actions";
import { isEmpty } from "./utils";
import  DeleteComm from "./deleteComm"



const CardComments = ({ post }) => {
  const [text, setText] = useState('')
  const usersData = useSelector((state) => state.UsersReducer);
  const userData = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const AdminID = { id: 1}
  const handleComment = (e) => { 
    e.preventDefault();
    if(text){
      dispatch(addComment(post.id, text, userData.pseudo,))
      .then(() => dispatch(getPosts()))
      .then(() => setText(''))
    }
  }

  return (
    <div className="comments-container">
      {post.commentaires.map((commentaire) => {
        return (
          <div className={commentaire.pseudoComm === userData.pseudo ?
            "comment-container client" : "comment-container"
          } key={commentaire.id}>
            <img
              src={!isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user.pseudo === commentaire.pseudoComm) return user.imagesUrl;
                    else return null;
                  })
                  .join("")} alt="commenter-pic"
            />
            <div className="right-part">
              <div className="pseudo">
                <h3>{commentaire.pseudoComm}</h3>
                <p>{commentaire.texte}</p>
                <DeleteComm commentaire={commentaire} postId={post.id} />
              </div>
            </div>
          </div>
        )
      })}
      {userData.id && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text} placeholder="laisser un commentaire"
          />
          <br />
          <input type="submit" value="Envoyer" />
        </form>
      )}
    </div>
  )
};

export default CardComments;