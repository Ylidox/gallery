import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css"
import Picture from "./Picture";

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
    useEffect(() => {
        getAuthor(user.id)
            .then(res => {
                console.log(res)
                setAuthor(res);

                getAuthorImage(user.id, res.name, res.path_logo)
                    .then(res => {
                        let img = res.map(item => <Picture key={item.id + Math.floor(Math.random() * 10000)} data={item}/>)
                        setImages(img);
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
                        <button>+Add new picture</button>
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