import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Signup from './components/Signup/Signup'
import Signin from './components/Signin/Signin'
import LogoutBox from './components/Home/Topbar/LogoutBox'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './components/Home/Profile/Profile'
import Post from './components/Home/Post/Post'
import PostsPage from './components/Home/PostsPage/PostsPage'
import CreatePost from './components/Home/CreatePosts/CreatePost'
import { useState } from 'react'
import { LoginContext } from './Context/LoginContext'
import OtherProfile from './components/Home/Profile/OtherProfile'
import EditInfo from './components/Home/Profile/EditInfo'
import ChangePassword from './components/Home/Profile/ChangePassword'
import SearchUsers from './components/Home/SearchUsers/SearchUsers'

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <BrowserRouter>
        <LoginContext.Provider value={{ modalOpen, setModalOpen }}>
          <div className="flex flex-col app">
            <Routes>
              <Route path="/" element={<Home />}>
                <Route path='' element={<PostsPage />} />
                <Route exact path='profile' element={<Profile />} />
                <Route exact path='profile/editinfo' element={<EditInfo />} />
                <Route path='profile/editinfo/changepassword' element={<ChangePassword/>} />
                <Route path='searchusers' element={<SearchUsers/>} />
                <Route path='createpost' element={<CreatePost />} />
                <Route path='profile/:userid' element={<OtherProfile />} />
              </Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/signin" element={<Signin />}></Route>
            </Routes>
            <ToastContainer />
          </div>
          {modalOpen && <LogoutBox setModalOpen={setModalOpen}></LogoutBox>}
        </LoginContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
