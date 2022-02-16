import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../actions/post-actions';

const DeletCard = (props) => {

    const disptach = useDispatch()

    const deleteQuote =() => {
        disptach(deletePost(props.id))
    }
    return (
        <div onClick={() => {
            if (window.confirm('voulez-vous supprimer cet article')){
                deleteQuote()
            }
        }} >
           <img src="./img/trash.svg"/>
        </div>
    );
};

export default DeletCard;