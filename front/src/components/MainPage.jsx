import { useState, useEffect } from "react";
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
            // console.log(id,'reload')
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

// let arr = [];
// generatePicture(arr, 10).then(res => console.log(res));

function MainPage(){
    let [images, setImages] = useState([]);
    // let [imageShown, setImageShown] = useState({length: 0});

    useEffect(() => {
        let arr = [];
        generatePicture(arr, 12)
            .then(res => {
                console.log(res)
                let arr = []
                for(let item of res){
                    arr.push( <Picture key={item.id + Math.floor(Math.random() * 10000)} data={item}/>)
                }
                setImages(arr)
            })
    }, []);

    return (
        <>
            <div className={styles.images}>
                {images}
            </div>        
        </>
    );
}

export {MainPage}