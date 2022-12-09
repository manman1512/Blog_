import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home/home.jsx';
import Page from './components/Page';
import Write from './components/Write';
import Setting from './components/Setting/setting.jsx'
import Personal from './components/Personal';
import { useContext, useEffect } from 'react';
import { userApi } from './axiosClient/api/user';
import { setUser } from './components/context/Actions';
import { Context } from './components/context/Context';
import Tags from './components/tags';
import SearchPost from './components/SearchPost';
import Edit from './components/Setting/edit';

function App() {
  // const user = false;
  const [state, dispatch] = useContext(Context);
  useEffect(() => {
    const token = window.localStorage.getItem('accessToken');
    if (token !== null) {
      (async () => {
        const user = await userApi.getMe();
        dispatch(setUser(user));
      })();
    }
  }, []);
  return (
    <Router>
      <div className="App h-screen">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/post/:postId" element={<Page />} />
          <Route path="/write" element={<Write />} />
          <Route path="/:username/posts" element={<Personal />} />
          <Route path="/posts" element={<SearchPost/>}/>
          <Route path="/setting" element={<Setting />}/>
          <Route path="/edit" element={<Edit />} />
          <Route path="/update/:postId" element={<Write/>}/>
          <Route path="/tags" element={<Tags />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
