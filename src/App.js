import React from 'react';
import './App.css';
import  Navbar2 from './components/navigation/Navbar2'
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';


import PostMain from './pages/post/PostMain';
import PostView from './pages/post/PostView';
import HotspotView from './pages/HotspotView';
import RegisterPost from './pages/RegisterPost';
import Mypage from './pages/mypage/Mypage';
import MyPostList from './pages/mypage/MyPostList';
import MyScrapList from './pages/mypage/MyScrapList';

import PlaceView from './pages/PlaceView';
import NaverLogin from './components/login/NaverLogin';






const App = () => {
  return (

  
  <BrowserRouter>
  <Navbar2/>
  <>
    <Route path="/" exact={true} component={Home}/>
    <Route path="/mypage" component={Mypage} />
    <Route path="/courses" component={MyPostList} />
    <Route path="/scraps" component={MyScrapList} />
    <Route path="/post" component={PostMain}/>
    <Route path="/postView/:course_id" component={PostView}/>
    <Route path="/hotspots/:hotspot_id" component={HotspotView}/>
    <Route path="/user/course/write" component={RegisterPost}/>
    <Route path="/place/:id" component={PlaceView}/>
    <Route path="/c" component={NaverLogin}/>
    </>
  </BrowserRouter>


  );
};

export default App;
