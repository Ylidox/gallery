import { useContext, useState } from "react";
import { ImageContext } from "../contexts/ImageContext";
import { NavLink } from "react-router-dom";
import styles from "../styles/EditImage.module.css"

function EditImage({user}){
    let imageContext = useContext(ImageContext);

    let image = imageContext.displayedImage;
    // console.log("****user****", user);
    // console.log("****imageContext****", image);

    let [form, setForm] = useState({
        date: image.date.slice(0, 4),
        description: image.description,
        name: image.name,
        id: image.id,
    });

    let handleDate = (e) => setForm({...form, date:e.target.value});
    let handleDescription = (e) => setForm({...form, description: e.target.value});
    let handleName = (e) => setForm({...form, name: e.target.value});

    let submit = async (e) => {
        let url = `/api/author/${user.id}/image`;
        let res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: user.token
            },
            body: JSON.stringify(form)
        });
        let ans = await res.json();
        // console.log(ans)
    }

    let deleteImage = async (e) => {
        let res = await fetch(`/api/author/${user.id}/image`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: user.token
            },
            body: JSON.stringify({
                id:image.id,
                path: image.path_image
            })
        });
        // let ans = await res.json();
    }

    return (
        <div className={styles.container}>
            <div className={styles.image_container}>
                <img src={image.path_image} alt={image.name} />
            </div>
            <div className={styles.form_container}>
                <div className={styles.form}>
                    <input type="text" placeholder="Name:" value={form.name} onChange={handleName}/>
                    <input type="text" placeholder="Date:" value={form.date} onChange={handleDate}/>
                    <textarea rows="10" placeholder="Description:" value={form.description} onChange={handleDescription}></textarea>
                    <NavLink to="/home">
                        <div className={styles.button_container}>
                            <button onClick={deleteImage}>-Удалить</button>
                            <button onClick={submit}>+Изменить</button>
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export {EditImage};