import React, { useContext } from 'react';
import { UidContext } from '../components/appContext';
import LetfNav from '../components/letfNav';
import Thread from '../components/thread';
import Log from '../components/log';
import NewPostForm from '../components/newPostForm';

const Home = () => {
    const uid = useContext(UidContext)
    return (
       <div className="home">
           <LetfNav />
         <div className="main">
             <div className="home-header">
            {uid ? <NewPostForm /> : <Log SignIn={true} SignUp={false} />}
             </div>
             <Thread />
         </div>
       </div>
    );
};

export default Home;