import {useEffect, useRef, useState} from "react";
import Registration from "./components/Registration";
import { Login } from "./components/Login";
import MainPage from "./components/MainPage";
import styles from './styles/App.module.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Author } from "./components/Author";
import { useAuth } from "./hooks/useAuth";
import {AddPicture} from "./components/AddPicture"
import {PicturePage} from "./components/PicturePage"
import { ImageContext } from "./contexts/ImageContext";
import {AuthorContext} from "./contexts/AuthorContext";
import { EditImage } from "./components/EditImage";
import EditProfile from "./components/EditProfile";

import Menu from './components/Menu';

function App() {
  let [imagesMainPage, setImagesMainPage] = useState([]);
  let [displayedImage, setDisplayedImage] = useState({
    author_name: "",
    author_path_logo: "",
    date: "",
    description: "",
    name: "",
    path_image: "",
    id: 0,
    author_id: 0
  });
  let [selectAuthor, setSelectAuthor] = useState({
    id: 0,
  });
  let [authUser, saveAuth] = useAuth();
  let [user, setUser] = useState({
    id: 0,
    token: '',
    isAuth: false,
  });
  let setAuthUser = (obj) => {
    setUser({...obj});
    // homePage.current.click();
  }

  useEffect(() => {
    if(authUser.isAuth) {
      setUser({...authUser});
    }
  }, [authUser.isAuth]);

  

  return (
    <BrowserRouter>
      <Menu user={user}/>
      {/* <br style={{
        margin: 'calc(3vh + 4px)',
        height: 0,
      }}/> */}
      <ImageContext.Provider value={{displayedImage, setDisplayedImage}}>
        <AuthorContext.Provider value={{selectAuthor, setSelectAuthor}}>
          <Routes>
            <Route path="/" element={<MainPage imagesMainPage={imagesMainPage} setImagesMainPage={setImagesMainPage}/>}/>
            <Route path="/home" element={<Author user={user} home={true}/>}/>
            <Route path="/author" element={<Author user={user}/>}/>
            <Route path="/registration" element={<Registration setAuthUser={setAuthUser}/>}/>
            <Route path="/login" element={<Login setAuthUser={setAuthUser}/>}/>
            <Route path="/add" element={<AddPicture id={user.id} token={user.token}/>}/>
            <Route path='/image' element={<PicturePage/>}/>
            <Route path='/edit_image' element={<EditImage user={user}/>}/>
            <Route path='/edit_profile' element={<EditProfile user={user}/>}/>
          </Routes>
        </AuthorContext.Provider>
      </ImageContext.Provider>
    </BrowserRouter>
    
  );

}

export default App;
