// import {useState, useEffect} from "react";
// import { NavLink } from "react-router-dom";

// export default BurgerButton = () => {
// 	let [size, setSize] = useState(window.innerWidth);
// 	let [showMenuButton, setShowMenuButton] = useState(false);
// 	let [showMenu, setShowMenu] = useState(false);
	
//   let resizeHandler = () => {
//     size = window.innerWidth;
//     setSize(window.innerWidth);
//   }

//   useEffect(() => {
//     // resizeHandler();
//     window.addEventListener('resize', resizeHandler);
//     return () => {window.removeEventListener('resize', resizeHandler)};
//   }, []);

//   useEffect(() => {
//     if(size < 660) setShowMenuButton(true);
//     else setShowMenuButton(false);
//   }, [size]);


//   return (
//     <>        
//       <div className={styles.burger_button} onClick={setShowMenu(!showMenu)}>
//         <div className={styles.line}></div>
//         <div className={styles.line}></div>
//         <div className={styles.line}></div>
//       </div>
//     </>
// 	);
// }