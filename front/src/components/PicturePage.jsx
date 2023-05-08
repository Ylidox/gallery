import { useContext, useState } from "react";
import { ImageContext } from "../contexts/ImageContext";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/PicturePage.module.css"

function PicturePage(){
    let [authUser, saveAuthUser] = useAuth();
    let imageContext = useContext(ImageContext);
    console.log("*****imageContext***",imageContext.displayedImage)

    let image = imageContext.displayedImage;
    let [editImages, setEditImages] = useState(+authUser.id === image.author_id);
    return ( 
        <div className={styles.box}>
            <div className={styles.container}>
                <div className={styles.image}>
                    <img src={image.path_image} alt={image.name} />
                </div>
                <div className={styles.data}>
                    <div className={styles.logo_container}>
                        <div className={styles.logo}>
                            <img src={image.author_path_logo} alt={image.author_name} />
                        </div>
                    </div>
                    <div className={styles.image_data}>
                        <div className={styles.info}>
                            <h3>{image.name}</h3>
                            <p>{image.author_name}</p>
                        </div>
                        <div className={styles.date}>
                            <p>{image.date.slice(0, 4)}г.</p>
                        </div>
                    </div>
                </div>
                <div className={styles.description}>
                    <p>{image.description}</p>
                </div>
                {editImages ? 
                    <div className={styles.button}>
                        <button>Редактировать</button>
                    </div> 
                    :
                    null
                }
            </div>
        </div>
    );
}

export {PicturePage}