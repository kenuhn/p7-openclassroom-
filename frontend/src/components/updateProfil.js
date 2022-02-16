import React from 'react';
import LetfNav from './letfNav';
import { useSelector } from 'react-redux';
import UploadImg from './upload-img';
import DeletePorfil from './deletePorfil';

const UpdateProfil = () => {
  const userData = useSelector((state) => state.UserReducer);
  return (
    <div className="profil-container">
      <LetfNav />
      <h1> Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.imagesUrl} alt="user-pic" />
          <UploadImg />
        </div>
        <div className="right-part">
          <div className='bio-update'>
            <h3>Modification du compte</h3>
            <DeletePorfil />
          </div>
        </div>
      </div>
    </div>
  );

};

export default UpdateProfil;

/* <div><p>{error.maxSize}</p>
            <p>{error.format}</p></div>*/