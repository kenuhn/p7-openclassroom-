import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCommentaire } from '../actions/post-actions';

const DeleteComm = ({commentaire}) => {

    const [isAuthor, setIsAuthor] = useState(false);
    const userData = useSelector((state) => state.UserReducer)
    const AdminID = { id: 1}
    const dispatch = useDispatch();
    console.log(userData.id)

    useEffect(() => {
        const checkAuthor = () => {
          if (userData.pseudo === commentaire.pseudoComm || userData.id === AdminID.id ) {
            setIsAuthor(true);
          }
        };
        checkAuthor();
      }, [userData.pseudo , commentaire.pseudoComm]);

 const handleDelete = () => {
     dispatch(deleteCommentaire(commentaire.id))
     window.location.reload()
 };
  console.log(userData.id)
    
    return (
        <div className="edit-comment">
          { isAuthor &&(<span onClick={() => {
              if (window.confirm("êtes vous sur de supprimer le commentaire de l'utilisateur")){
                handleDelete();
              }
          }}>
          <img src="./img/trash.svg" alt="edit-comment" />
        </span>)}   
        </div>
    );
};

export default DeleteComm;