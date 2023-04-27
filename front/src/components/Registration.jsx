import React from "react";
import {useState, useRef} from "react";
import styles from '../styles/Registration.module.css'

function Registration({setAuthUser, homePage}) {
    let logo = useRef(null);
    let inputFile = useRef(null);
    let [user, setUser] = useState({
        login: '',
        password: '',
        name: '',
        description: '',
        logo: {}
    });
    
    let setLogin = (e) => {
        setUser({...user, login:e.target.value});
    }
    let setPassword = (e) => {
        setUser({...user, password:e.target.value});
    }
    let setName = (e) => {
        setUser({...user, name:e.target.value});
    }
    let setDescription = (e) => {
        setUser({...user, description:e.target.value});
    }
    let sendForm = async (e) => {
      
        let url = '/api/registration';
        let formData = new FormData();
        formData.append('file', user.logo);
        formData.append('login', user.login);
        formData.append('password', user.password);
        formData.append('name', user.name);
        formData.append('description', user.description);
      
  
        let res = await fetch(url, {
            method:'POST',
            body: formData
        });

        let ans = await res.json();
        if(ans.token){
            setAuthUser({
                id: ans.id,
                token: ans.token,
                isAuth: true
            });
            homePage.current.click();
        }else {
            console.log(ans)
        }

        e.preventDefault();
    }

    let selectFile = (e) => {
        inputFile.current.click();
    }
    let drawLogo = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            logo.current.src = reader.result;
            
            setUser({...user, logo:file});
        }
    }
    let downloadLogo = () => {
        let file = inputFile.current.files[0];
        drawLogo(file);
    }

    let dropLogo = (e) => {
        e.preventDefault();
        drawLogo(e.dataTransfer.files[0])
    }
    
    return (
      <>
        <div className={styles.registration}>
            <div className={styles.form}>
                <div className={styles.image}>
                    <div className={styles.container_img} 
                        onDragStart={e => e.preventDefault()}
                        onDragOver={e => e.preventDefault()}
                        onDrop={dropLogo}>
                        <img ref={logo} 
                            src="/pictures/default/cat_.jpg" 
                            accept="image/*, .png, .jpg, .jpeg"
                            alt="Ваш логотип"/>
                    </div>
                    
                    <button onClick={selectFile}>Выбрать файл</button>
                    <input onChange={downloadLogo} className={styles.hidden} ref={inputFile} placeholder="Logo" type="file" />
                </div>
                <div className={styles.fields}>
                    <div className={styles.fields_container}>
                        <input placeholder="Login" value={user.login} onChange={setLogin} required/>
                        <input placeholder="Password" type="password" value={user.password} onChange={setPassword} required/>
                        <input placeholder="Name" value={user.name} onChange={setName} required/>
                        <textarea rows="6" placeholder="Description" value={user.description} onChange={setDescription}/>   
                    </div>
                    <div className={styles.send}>
                        <button type="submit" onClick={sendForm}>Отправить</button>
                    </div>
                </div>
                
                
            </div>
        </div>
      </>
    );
      
  }
  
  export default Registration;