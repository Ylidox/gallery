import {useEffect, useRef, useState} from "react";
import { MdMenu } from "react-icons/md";
import styles from '../styles/Menu.module.css'
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Menu({user}) {
  let [openMenu, setOpenMenu] = useState(false);
  let [userAuth, saveUser] = useAuth();

  const isAuth = () => !!userAuth?.isAuth;

  const menuHandler = (e) => {
    e.stopPropagation();
    setOpenMenu(!openMenu);
  }

  let homePage = useRef(null);

  const showLinkHome = () => {
    return (user.isAuth) ? styles.visible : styles.hidden; 
  }

  const getClassShowMenu = () => {
    return openMenu ? styles.ul_open : styles.ul_close;
  }

  const getClassMenuOutside = () => {
    return openMenu ? styles.visible : styles.hidden; 
  }

  return ( 
    <div className={styles.header}>
      <div className={styles.name}>GALLERY</div>
      <div className={styles.links}>
        <NavLink to="/">Main</NavLink>
        {isAuth() &&
          <NavLink to="/home" className={showLinkHome()}>Home</NavLink>
        }
        <NavLink to="/login">Sign in</NavLink>
        <NavLink to="/registration">Sign up</NavLink>
      </div>
      <div className={styles.menu}>
        <MdMenu 
          className={styles.menu_button}
          onClick={menuHandler}
        />
        <div className={styles.ul_container}>
          <div 
            className={`${styles.outside_menu} ${getClassMenuOutside()}`}
            onClick={menuHandler}
          ></div>
          <ul 
            className={`${styles.ul} ${getClassShowMenu()}`}
            onClick={() => setOpenMenu(!openMenu)}
          >
            <li><NavLink to="/">Main</NavLink></li>
            {isAuth() &&
              <li><NavLink to="/home" className={showLinkHome()}>Home</NavLink></li>
            }
            <li><NavLink to="/login">Sign in</NavLink></li>
            <li><NavLink to="/registration">Sign up</NavLink></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Menu;