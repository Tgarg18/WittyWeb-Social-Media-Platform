import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Signup from './components/Signup/Signup'
import Signin from './components/Signin/Signin'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './components/Home/Profile/Profile'
import Post from './components/Home/Post/Post'
import PostsPage from './components/Home/PostsPage/PostsPage'
import CreatePost from './components/Home/CreatePosts/CreatePost'

function App() {

  // const currentUser = true;

  // const ProtectedRoute = (Children) => {
  //   if (!currentUser)
  //     return <Navigate to="/signin" />
  //   return Children
  // }

  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col app">
          <Routes>
            <Route path="/" element={
              // <ProtectedRoute>
                <Home />
              // </ProtectedRoute>
            }>
              <Route path='' element={<PostsPage/>} />
              <Route path='profile' element={<Profile />} />
              <Route path='createpost' element={<CreatePost/>} />
            </Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/signin" element={<Signin />}></Route>
          </Routes>
          <ToastContainer />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
