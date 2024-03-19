import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Signup from './components/Signup/Signup'
import Signin from './components/Signin/Signin'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './components/Home/Profile/Profile'
import Post from './components/Home/Post/Post'

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
              <Route path='' element={<Post />} />
              <Route path='profile' element={<Profile />} />
            </Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
          <ToastContainer />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
