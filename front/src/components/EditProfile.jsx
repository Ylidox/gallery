import styles from "../styles/EditProfile.module.css"
import {NavLink,Link} from "react-router-dom";
import { AuthorContext } from '../contexts/AuthorContext';
import {useContext, useState, useRef} from "react";

function EditProfile({user}){
    let {selectAuthor, setSelectAuthor} = useContext(AuthorContext);
    let [form, setForm] = useState(selectAuthor);
    let input = useRef(null);
    let logo = useRef(null);

    let handleLogin = (e) => setForm({...form, login:e.target.value});
    let handleDescription = (e) => setForm({...form, description: e.target.value});
    let handleName = (e) => setForm({...form, name: e.target.value});

    let clickInput = (e) => {
        input.current.click();
    }

    let drawLogo = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            logo.current.src = reader.result;
            
            setForm({...form, logo:file});
        }
    }

    let dropLogo = (e) => {
        e.preventDefault();
        drawLogo(e.dataTransfer.files[0])
    }

    let dawnloadFile = () => {
        let file = input.current.files[0];
        drawLogo(file);
    }

    let submit = async (e) => {
        let url = '/api/author/edit_profile';
        let formData = new FormData();
        if(form.logo != undefined) formData.append('file', form.logo);
        formData.append('login', form.login);
        formData.append('name', form.name);
        formData.append('description', form.description);
        formData.append('path_logo', form.path_logo);
        
        // let author = {...form};
        // delete author.logo;
        setSelectAuthor({...form})
        // console.log(form)
        let res = await fetch(url, {
            method:'PUT',
            headers: {
                authorization: user.token
            },
            body: formData
        });

        let ans = await res.json();

        e.preventDefault();
        console.log(ans)
    }

    return (
        <div className={styles.container}>
            <div className={styles.image_container}
                onDragStart={e => e.preventDefault()}
                onDragOver={e => e.preventDefault()}
                onDrop={dropLogo}>
                <div className={styles.image}>
                    <img src={form.path_logo} alt={selectAuthor.name} ref={logo}/>
                    <input type="file" ref={input} className={styles.hidden} onChange={dawnloadFile}/>
                </div>
                <button className={styles.change_photo} onClick={clickInput}>Выбрать фото</button>
            </div>
            <div className={styles.form_container}>
                <div className={styles.form}>
                    <input type="text" placeholder="Name:" value={form.name} onChange={handleName}/>
                    <input type="text" placeholder="Login:" value={form.login} onChange={handleLogin}/>
                    <textarea rows="11" placeholder="Description:" value={form.description} onChange={handleDescription}></textarea>
                    <Link to="/home">
                        <div className={styles.button_container}>
                            <button onClick={submit}>+Изменить</button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;