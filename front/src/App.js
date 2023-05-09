import {createContext, useEffect, useRef, useState} from "react";
import Registration from "./components/Registration";
import { Login } from "./components/Login";
import {MainPage} from "./components/MainPage";
import styles from './styles/App.module.css'
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom'
import { Home } from "./components/Home";
import { useAuth } from "./hooks/useAuth";
import {AddPicture} from "./components/AddPicture"
import {PicturePage} from "./components/PicturePage"
import { ImageContext } from "./contexts/ImageContext";
import { EditImage } from "./components/EditImage";
// let ImageContext = createContext(null);

function App() {
  let [displayedImage, setDisplayedImage] = useState({
    author_name: "",
    author_path_logo: "",
    date: "",
    description: "",
    name: "Вокзал Сен-Лазар",
    path_image: "",
    id: 0,
    author_id: 0
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
  }, []);

  let homePage = useRef(null);

  let showLinkHome = () => {
    return (user.isAuth) ? styles.visible : styles.hidden; 
  }

  return (
    <BrowserRouter>
      <div className={styles.header}>
        <div className={styles.name}>GALLERY</div>
        <div className={styles.links}>
          <NavLink to="/">Main</NavLink>
          <NavLink to="/home" ref={homePage} className={showLinkHome()}>Home</NavLink>
          <NavLink to="/login">Sign in</NavLink>
          <NavLink to="/registration">Sign up</NavLink>
        </div>
      </div>
      <ImageContext.Provider value={{displayedImage, setDisplayedImage}}>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/home" element={<Home user={user}/>}/>
          <Route path="/registration" element={<Registration setAuthUser={setAuthUser} homePage={homePage}/>}/>
          <Route path="/login" element={<Login setAuthUser={setAuthUser} homePage={homePage}/>}/>
          <Route path="/add" element={<AddPicture id={user.id} token={user.token} homePage={homePage}/>}/>
          <Route path='/image' element={<PicturePage/>}/>
          <Route path='/edit_image' element={<EditImage user={user}/>}/>
        </Routes>
      </ImageContext.Provider>
    </BrowserRouter>
    
  );

}

export default App;
