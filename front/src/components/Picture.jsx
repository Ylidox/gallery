import picture from '../styles/Picture.module.css'
import {NavLink} from 'react-router-dom';
import { useContext } from 'react';
import { ImageContext } from '../contexts/ImageContext';
import { AuthorContext } from '../contexts/AuthorContext';

function Picture({data}){
    let imageContext = useContext(ImageContext);
    let {selectAuthor, setSelectAuthor} = useContext(AuthorContext);
    
    let changeImageContext = (e) => {
        let {displayedImage, setDisplayedImage} = imageContext;
        setDisplayedImage(data);
    }
    let changeAuthorContext = (e) => {
        setSelectAuthor({id:+data.author_id});
    }
    return (
        <>
            <div className={picture.box}>
                
                    <div className={picture.container}>
                        <NavLink to="/image" className={picture.link} 
                            onClick={changeImageContext}
                        >
                            <div className={picture.img}>
                                <img src={data.path_image} alt={data.name} />
                            </div>
                        </NavLink>

                        <NavLink to="/author" className={picture.link}
                            onClick={changeAuthorContext}
                        >
                            <div className={picture.data}>
                                <div className={picture.logo_container}>
                                    <div className={picture.logo}>
                                        <img src={data.author_path_logo} alt={data.author_name} />
                                    </div>
                                </div>
                                
                                <div className={picture.image_data}>
                                    <div className={picture.info}>
                                        <h3>{data.name}</h3>
                                        <p>{data.author_name}</p>
                                    </div>
                                    <div className={picture.date}>
                                        <p>{data.date.slice(0, 4)}г.</p>
                                    </div>
                                </div>
                            
                            </div>
                        </NavLink>
                    </div>
                    
            </div>
            
        </>
    );
}

export default Picture;