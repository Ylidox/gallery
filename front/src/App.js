import {useRef, useState} from "react";
import Registration from "./components/Registration";
import { Login } from "./components/Login";
import {MainPage} from "./components/MainPage";
import styles from './styles/App.module.css'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import { Home } from "./components/Home";

function App() {
  let [user, setUser] = useState({
    id: 0,
    token: '',
    isAuth: false,
  });
  let setAuthUser = (obj) => {
    setUser({...obj});
  }

  let homePage = useRef(null);

  let showLinkHome = () => {
    return (user.isAuth) ? styles.visible : styles.hidden; 
  }
  // let linkHomePage = <Link to="/home" ref={homePage}>Home</Link>;
  return (
    <BrowserRouter>
      <div className={styles.header}>
        <div className={styles.name}>Gallery</div>
        <div className={styles.links}>
          <Link to="/">Main</Link>
          <Link to="/home" ref={homePage} className={showLinkHome()}>Home</Link>
          {/* {user.isAuth ? linkHomePage : null} */}
          <Link to="/login">Sign in</Link>
          <Link to="/registration">Sign up</Link>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/registration" element={<Registration setAuthUser={setAuthUser} homePage={homePage}/>}/>
        <Route path="/login" element={<Login setAuthUser={setAuthUser} homePage={homePage}/>}/>
      </Routes>

    </BrowserRouter>
  );

}

export default App;
