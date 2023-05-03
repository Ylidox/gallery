import { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import styles from "../styles/Home.module.css"
import Picture from "./Picture";
// import {AddPicture} from "./AddPicture";
import { useAuth } from "../hooks/useAuth";

let getAuthor = async (id) => {
    let res = await fetch(`/api/author/${id}`);
    let author = await res.json();
    // console.log(author)
    return author;
}

let getAuthorImage = async (id, name, logo) => {
    let res = await fetch(`/api/author/${id}/image`);
    let images = await res.json();
    // console.log(images)
    return images.map(item => {return {
        ...item,
        author_name: name,
        author_path_logo: logo
    }})
}


function Home({user}){
    let [author, setAuthor] = useState({});
    let [images, setImages] = useState([]);
    let [authUser, saveAuth] = useAuth();
    useEffect(() => {
        if(user.id == 0){
            user = authUser;
        }
        console.log(user)
        getAuthor(user.id)
            .then(author => {
                console.log(author)

                getAuthorImage(user.id, author.name, author.path_logo)
                    .then(res => {
                        let img = res.map(item => <Picture key={item.id + Math.floor(Math.random() * 10000)} data={item}/>)
                        setImages(img);
                        setAuthor(author);

                    })
            })
    }, []);
    
    return (
        <div className={styles.container}>
            <div className={styles.author}>
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
                    
                    <div className={styles.add_picture}>
                        <Link to="/add">
                        <button>
                            +Add new picture
                        </button>
                        </Link>
                    </div>
                    <div className={styles.images_container}>
                        {images}
                    </div>
                </div>
            </div>
        </div>
    );
}

export {Home}