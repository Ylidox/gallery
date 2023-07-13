const db = require('./db');
const config = require('./config');
const {generateToken, verifyToken} = require('./useJWT');
// const { token } = require('./config');

class AuthorController{
    async verifyLogin(req, res, next){
        if(req.method == 'OPTIONS') next();
        try{
            const token = req.headers.authorization;
            let decode = verifyToken(token);
            req.id = decode.id;
            next();
        }catch(e){
            console.log(e);
            return res.status(404).json({message:"Пользователь не авторизован"});
        }
    }
    async changeImage(req, res){
        let {name, date, description, id} = req.body;
        date += '-01-02';
        // console.log(date)
        await db.query(`update image set name = $1, date = $2, description = $3 where id = $4`, 
            [name, date, description, id]);
        res.status(200).json({message: "Изменяем изображение"});
    }
    async changeProfile(req, res){
        // console.log("id", req.id);
        // console.log(req.body)
        // console.log(req.files)
        let filePath = req.body.path_logo;
        if(req.files != null){
            let fs = require('fs');
            fs.unlink(__dirname + '/..' + req.body.path_logo, err => {
                if(err) {
                    console.log(err);
                }
            });
            let file = req.files.file;
            // filePath = req.body.path_logo; 
            filePath = `/pictures/${req.body.login}/${file.name}`;
            // console.log("nevFilePath: ", `/pictures/${req.body.login}/${file.name}`);
            await file.mv(`${__dirname}/..${filePath}`, (err) => {
                if(err){
                    res.status(500).json({message:"Ошибка загрузки"});
                    return;
                }
            });
        }
        await db.query(`update author set name = $1, login = $2, description = $3, path_logo = $4 where id = $5`, 
            [req.body.name, req.body.login, req.body.description, filePath, req.id]);

        res.status(200).json({
            ...req.body,
            path_logo: filePath
        });
    }
    async deleteImage(req, res){
        let {id, path} = req.body;
        
        let fs = require('fs');
        fs.unlink(__dirname + '/..' + path, err => {
            if(err) {
                console.log(err);
            }
        });

        await db.query(`DELETE FROM image WHERE id = $1`, [id]);
        res.status(200).json({message: "Изображение удалено"});
    }
    async addImage(req, res){
        let id = req.id;

        let {name, description, date} = req.body;
        date += '-01-02';
        let login = await db.query('select login from author where id = $1', [id]);
        login = login.rows[0].login;

        let file = req.files.file;
        let filePath = `/pictures/${login}/${file.name}`;

        await db.query(`insert into image (name, path_image, date, description, author_id) values
            ($1, $2, $3, $4, $5)`, [name, filePath, date, description, id]);

        file.mv(`${__dirname}/../pictures/${login}/${file.name}`, (err) => {
            if(err){
                res.status(500).json({message:"Ошибка загрузки"});
                return;
            }
        });
        res.status(200).json({message:"Запрос получен"});
    }
    async registrationAuthor(req, res){
        try{
            // console.log(req.body)
            let {login, password, name, description} = req.body
            if(!login) {
                res.status(404).json({message:"Не найден логин"});
                return;
            }
            if(!password) {
                res.status(404).json({message:"Не найден пароль"});
                return;
            }
            let author = await db.query('select * from author where author.login = $1', [login]);
            if(author.rows.length){
                res.status(404).json({message:"Пользователь уже существует"});
                return;
            }

            let filePath = '/pictures/default/cat_.jpg';
            let file = {
                name:'cat_.jpg'
            }

            if(req.body.file != '[object Object]'){
                file = req.files.file;
                filePath = `/pictures/${login}/${file.name}`;
                //console.log(`${__dirname}/..${filePath}`)
                file.mv(`${__dirname}/../pictures/${login}/${file.name}`, (err) => {
                    if(err){
                        res.status(500).json({message:"Ошибка загрузки"});
                        return;
                    }
                });
            }
          
            await db.query(`insert into author (name, login, password, path_logo, description) values ($1,$2, $3, $4, $5)`, 
                [name, login,password,filePath,description]);
            
            author = await db.query('select * from author where author.login = $1', [login]);

            let token = generateToken(author.rows[0].id);
            // saveToken(token);

            res.json({
                fileName: file.name,
                filePath: filePath,
                token: token
            });
            
        }catch(e){
            console.log(e);
            res.status(404).json({message:"Ошибка регистрации"});
        }
    }
    async loginAuthor(req, res){
        try{
            let {login, password} = req.body;
            if(!login) {
                res.status(404).json({message:"Не найден логин"});
                return;
            }
            if(!password) {
                res.status(404).json({message:"Не найден пароль"});
                return;
            }

            let author = await db.query('select * from author where author.login = $1', [login]);
            if(author.rows.length == 1){
                let token = generateToken(author.rows[0].id);
                // saveToken(token);
                res.status(200).json({
                    id: author.rows[0].id,
                    token: token
                });
                return;
            }else{
                res.status(404).json({message: "Ошибка авторизации"});
                return;
            }

        }catch(e){
            console.log(e);
            res.status(404).json({message:"Ошибка входа"});
        }
    }
    async getAuthors(req, res){
        let data = 'description, id, login, name, path_logo';
        let users = ('limit' in req.query) ?
            await db.query(`SELECT ${data} FROM author limit $1`, [req.query.limit]) :
            await db.query(`SELECT ${data} FROM author`);
        res.json(users.rows);
    }
    
    async getAuthor(req, res){
        const id = req.params.id;
        let user = await db.query('select description, id, login, name, path_logo from author where id = $1', [id]);
        res.json(
            user.rows[0]
        );
    }
    async getAuthorImages(req, res){
        const id = req.params.id;
        let images = await db.query(// author.logo_path, author.name
            `select image.name, image.path_image, image.date, image.description, image.id
            from author, image
            where author.id = author_id and author_id = $1`, [id]);
        res.json(images.rows);
    }
    async getImages(req, res){
        let images = ('limit' in req.query) ?
            await db.query('SELECT * FROM image limit $1', [req.query.limit]) :
            await db.query('SELECT * FROM image');
        
        res.json(images.rows);
    }
    async getImage(req, res){
        const id = req.params.id;
        let image = await db.query('select * from image where id = $1', [id]);

        // console.log(image.rows[0].name)
        res.json(image.rows[0]);
    }
    async getCountImages(req, res){
        let count = await db.query('select count(*) as count_img from image');
        res.json(count.rows[0].count_img);
    }

    async getRandomIdImage(req, res){
        let id = await db.query(`SELECT id FROM image ORDER BY RANDOM() LIMIT 1`);
        res.json(id.rows[0].id);
    }
}

module.exports = new AuthorController();