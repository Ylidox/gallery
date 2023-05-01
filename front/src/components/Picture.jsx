import picture from '../styles/Picture.module.css'

function Picture({data}){
    return (
        <>
            <div className={picture.box}>
                <div className={picture.container}>
                    <div className={picture.img}>
                        <img src={data.path_image} alt={data.name} />
                    </div>
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
                </div>
            </div>
        </>
    );
}

export default Picture;