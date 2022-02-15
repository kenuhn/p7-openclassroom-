import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addPost, getPosts } from '../actions/post-actions';
import { isEmpty } from './utils';

const NewPostForm = () => {
    const [isLoading, setisLoading] = useState(true)
    const [message, setMessage] = useState("")
    const [image, setImage] = useState(null)
    const [file, setFile] = useState();
    const userData = useSelector((state) => state.UserReducer);
    const dispatch = useDispatch()

    const handlePost = async () => {
        if (message || image  ){
            const data = new FormData();
            data.append("auteurID", userData.id)
            data.append("description", message)
            if (file){ data.append("imageUrl", file)}
            console.log(file)
            await dispatch(addPost(data, userData.id))
            dispatch(getPosts())
            cancelPost()
        }else {
            alert("veuillez entrer un message")
        }
     }
    const handlePicture = (e) => { 
        setImage(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
    }

    const cancelPost = () => {
        setMessage('');
        setImage('');
        setFile('');
    }


    useEffect(() => {

        if (!isEmpty(userData)) {
            setisLoading(false)
        }
    }, [userData])

    return (
        <div className="post-container">
            {isLoading ? (
                <i className="fas fa-spinner fa-pulse"></i>
            ) : (
                <>
                    <div className="data">
                        <p><span>{userData.posts ? userData.posts.length : 0}</span>
                            {" "}
                            posts
                        </p>
                    </div>
                    <NavLink exact to="/connection">
                        <div className="user-info">
                            <img src={userData.imagesUrl} alt="photo de profil" />
                        </div>
                    </NavLink>
                    <div className="post-form">
                        <textarea
                            name="message"
                            id="message"
                            placeholder="Écrivez votre message ici"
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />
                        {message || image ? (
                            <li className="card-container">
                                <div className="card-left">
                                    <img src={userData.imagesUrl} alt ="photo de profil"/>                                   
                                </div>
                                <div className="card-right">
                                    <div className="card-header">
                                        <div className="pseudo">
                                            <h3>{userData.pseudo}</h3>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <p>{message}</p>
                                        <img src={image} />
                                    
                                    </div>
                                </div>
                            </li>
                            
                        ): null}
                        <div className="footer-form">
                            <div className="icon">
                                <img src="./img/picture.svg" alt="img" />
                                <input
                                    type="file"
                                    id="file-upload"
                                    name="imageUrl"
                                    accept=".jpg, .jpeg, .png"
                                    onChange={(e) => handlePicture(e)}
                                />
                            </div>
                            <div className="btn-send">
                                {message || image || file ? (
                             <button className="cancel" onClick={cancelPost}>Annuler le post</button>
                                ): null}
                                <button className="send" onClick={handlePost}>Envoyer</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NewPostForm;