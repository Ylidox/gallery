import { useState, useEffect, useContext, useRef } from "react";
import { NavLink, useNavigate} from "react-router-dom";
import styles from "../styles/Author.module.css"
import Picture from "./Picture";
import { AuthorContext } from '../contexts/AuthorContext';
import { useAuth } from "../hooks/useAuth";

let getAuthor = async (id) => {
    let res = await fetch(`/api/author/${id}`);
    let author = await res.json();
    return author;
}

let getAuthorImage = async (id, name, logo) => {
    let res = await fetch(`/api/author/${id}/image`);
    let images = await res.json();
    return images.map(item => {return {
        ...item,
        author_id: id,
        author_name: name,
        author_path_logo: logo
    }})
}


function Author({user, home}){
    let [author, setAuthor] = useState({});
    let [images, setImages] = useState([]);
    let [authUser, saveAuth] = useAuth();
    let {selectAuthor, setSelectAuthor} = useContext(AuthorContext);
    let [showAddPicture, setShowAddPicture] = useState(false);
    let navigate = useNavigate();
    useEffect(() => {
        if(user.id == 0){
            user = authUser;
        }
        if(selectAuthor.id != 0 && !home){
            user = selectAuthor;
        }
        setShowAddPicture(home || selectAuthor.id == authUser.id);
        getAuthor(user.id)
            .then(author => {

                getAuthorImage(user.id, author.name, author.path_logo)
                    .then(res => {
                        let img = res.map(item => <Picture key={item.id + Math.floor(Math.random() * 10000)} data={item}/>)
                        setImages(img);
                        setAuthor(author);
                        setSelectAuthor(author);
                    })
            })
    }, [home]);
    useEffect(() => {
        user = selectAuthor;
        console.log("****update select author****", user)
    }, [selectAuthor]);

    let clickLink = () => {
        
        if(home || selectAuthor.id == authUser.id) navigate('/edit_profile');
    }
    
    return (
        <div className={styles.container}>
            {/* <NavLink to="/edit_profile" className={styles.link}></NavLink> */}
            <div className={styles.author} onClick={clickLink}>
                <div className={styles.logo_container}>
                    <div className={styles.logo}>
                        <img src={author.path_logo} alt={author.name}/>
                    </div>
                </div>
                <div className={styles.author_info}>
                    <h2>{author.name}</h2>
                    <h3>@{author.login}</h3>
                </div>
            </div>
            
            <div className={styles.images}>
                <div className={styles.author_description}>
                    <div className={styles.info}>
                        <p>{author.description}</p>
                    </div>
                    {showAddPicture ? 
                        <div className={styles.add_picture}>
                            <NavLink to="/add">
                            <button>
                                +Add new picture
                            </button>
                            </NavLink>
                        </div>
                        :
                        null
                    }
                    
                    <div className={styles.images_container}>
                        {images}
                    </div>
                </div>
            </div>
        </div>
    );
}

export {Author}