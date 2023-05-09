import styles from "../styles/AddPicture.module.css"
import {useState, useRef} from "react"
function AddPicture({id, token, homePage}){
    let [isSelectedPhoto, setSelectedPhoto] = useState(false);
    let [name, setName] = useState('');
    let [description, setDescription] = useState('');
    let [date, setDate] = useState('');
    let [image, setImage] = useState(null);
    let inputImage = useRef(null);
    let imageContainer = useRef(null);

    let handleName = (e) => {
        setName(e.target.value);
    }
    let handleDescription = (e) => {
        setDescription(e.target.value);
    }
    let handleDate = (e) => {
        setDate(e.target.value);
    }

    let selectFile = (e) => {
        inputImage.current.click();
    }

    let dropImage = (e) => {
        e.preventDefault();
        drawImage(e.dataTransfer.files[0])
    }

    let downloadImage = () => {
        let file = inputImage.current.files[0];
        drawImage(file);
    }

    let drawImage = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            imageContainer.current.src = reader.result;
            
            setImage(file);
            setSelectedPhoto(true);
        }
    }

    let submit = async (e) => {
        if(!(name && date && description && image)) return null;
        let url = `/api/author/${id}/image`;
        let formData = new FormData();
        formData.append('file', image);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('date', date);

        let res = await fetch(url, {
            method:'POST',
            headers: {
                authorization: token
            },
            body: formData
        });
        let ans = await res.json();
        
        console.log(ans)
        homePage.current.click();
    }
    return (
        <>
            <div className={styles.container}>
                <div className={styles.image_container}>
                    <div className={styles.image}
                        onDragStart={e => e.preventDefault()}
                        onDragOver={e => e.preventDefault()}
                        onDrop={dropImage}>

                        <img src="default.jpg"
                        accept="image/*, .png, .jpg, .jpeg"
                        ref={imageContainer}/>
                        {(isSelectedPhoto) ? null :
                            <div className={styles.select_container}>
                                <button className={styles.select_photo} onClick={selectFile}>
                                    Выберите фото
                                </button>
                                <input onChange={downloadImage} className={styles.hidden} ref={inputImage} placeholder="Image" type="file" />
                            </div>
                        }
                    </div>
                </div>
                <div className={styles.form_container}>
                    <input type="text" placeholder="Name:" value={name} onChange={handleName}/>
                    <input type="text" placeholder="Date:" value={date} onChange={handleDate}/>
                    <textarea rows="6" placeholder="Description:" value={description} onChange={handleDescription}></textarea>
                </div>
                <div className={styles.submit}>
                    <button onClick={submit}>Submit</button>
                </div>
            </div>
        </>
    );
}

export {AddPicture};