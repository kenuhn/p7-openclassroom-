import React, { useContext } from 'react';
import Log from '../components/log';
import { UidContext } from '../components/appContext';
import UpdateProfil from '../components/updateProfil';
const Connection = () => {
    const Uid = useContext(UidContext)

    return (
      <div className="profil-page">
     {Uid ? (<UpdateProfil />) : (
            <div className="log-container">
                {<Log SignIn={false} SignUp={true}/>}
             <img src="./img/log.Svg" alt="connection"/> 
            </div> 
            )}
        </div>
        
    )
}

export default Connection