import {useState, useEffect } from "react";
import styles from '../styles/MainPage.module.css'
import Picture from './Picture.jsx'

let imageShown = {length: 0};
let randomPicture = async () => {
    let res = await fetch('/api/image/random_id');
    let id = await res.json();
    if(id in imageShown){
        let res = await fetch('/api/image/count');
        let count = await res.json();
        if(imageShown.length >= count) {
            imageShown = {length:0};
            return await randomPicture();
        }
        return await randomPicture();
    } else {
        let res = await fetch(`/api/image/${id}`);
        let img = await res.json();
        res = await fetch(`/api/author/${img.author_id}`);
        let author = await res.json();

        imageShown[id] = id;
        imageShown.length++;

        return {
            ...img,
            id:id,
            author_name : author.name,
            author_path_logo : author.path_logo,
        }
    }

}

let generatePicture = async (arr, len) => {
    for(let i = 0; i < len; i++) 
        arr.push(await randomPicture());
    return arr;
}

function MainPage({imagesMainPage, setImagesMainPage}){
    let [images, setImages] = useState([]);
    let [fetching, setFetching] = useState(false);

    let scrollHandler = (e) => {
        // console.log("scroll");
        let element = e.target.documentElement;
        if(element.scrollHeight - (element.scrollTop + window.innerHeight) < 100){
            setFetching(true);
        }
    }

    let updateImagesStates = res => {
        let arr = []
        for(let item of res){
            arr.push( <Picture key={item.id + Math.floor(Math.random() * 10000)} data={item}/>)
        }
        setImages([...images, ...arr]);
        setImagesMainPage([...images, ...arr]);
        setFetching(false)
    }

    useEffect(() => {
        if(fetching){
            generatePicture([], 6)
                .then(updateImagesStates)
        }
    }, [fetching]);

    useEffect(() => {
        imageShown = {length: 0};
        let arr = [];
        if(imagesMainPage.length){
            setImages(imagesMainPage);
        }
        else generatePicture(arr, 12)
            .then(updateImagesStates)

        document.addEventListener('scroll', scrollHandler);
        return () => document.removeEventListener('scroll', scrollHandler);
    }, []);

    return (
        <>
            <div className={styles.images}>
                {images}
            </div>        
        </>
    );
}

export default MainPage;