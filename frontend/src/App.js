import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Connection from './pages/connection';
import Home from './pages/home';
import Profile from './pages/profile';
import { UidContext } from './components/appContext';
import Axios from "axios"
import Navbar from './components/Navbar';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user-actions';

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchToken = async () => {
      await Axios({
        method: "get",
        url: `http://localhost:5050/api/jwtid`,
        withCredentials: true
      })
        .then((res) => {
          console.log(res)
          setUid(res.data.utilisateurId)
        })
        .catch((err) => console.log(err))
    }
    fetchToken()
    if (uid) {
      dispatch(getUser(uid))
    }
  }, [uid, dispatch]);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <UidContext.Provider value={uid}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/connection" element={<Connection />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </UidContext.Provider>
      </BrowserRouter>
    </React.StrictMode>
  );

}

export default App;
