import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import styles from '../styles/Login.module.css'
function Login({setAuthUser, homePage}){
    let [authUser, saveAuth] = useAuth();
    let [input, setInput] = useState({
        login: "",
        password: ""
    });

    let setLogin = (e) => {
        setInput({...input, login: e.target.value});
    }

    let setPassword = (e) => {
        setInput({...input, password: e.target.value});
    }

    let auth = async () => {
        let res = await fetch('/api/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify( input)
        });
        let ans = await res.json();
        if(ans.token){
            setAuthUser({
                id: ans.id,
                token: ans.token,
                isAuth: true
            });
            saveAuth({
                id: ans.id,
                token: ans.token,
                isAuth: true
            });
            setTimeout(() => homePage.current.click(), 1);
            // homePage.current.click()
        } else {
            console.log(ans)
        }
    }

    return (
        <>
            <div className={styles.form}>
                <div className={styles.fields}>
                    <div className={styles.fields_container}>
                        <input placeholder="Login" value={input.login} onChange={setLogin} required/>
                        <input placeholder="Password" type="password" value={input.password} onChange={setPassword} required/>
                    </div>
                    <div className={styles.send}>
                        <button type="submit" onClick={auth}>Отправить</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export {Login}