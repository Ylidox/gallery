import {useState, useRef} from "react";
import Registration from "./components/Registration";
import styles from './styles/App.module.css'

function App() {  
  return (
    <>
      <div className={styles.header}>
        <div className={styles.name}>Gallery</div>
      </div>
      <Registration/>
    </>
  );
    
}

export default App;
