const db = require('./db');
const config = require('./config');
const {generateToken, saveToken} = require('./useJWT');
const { token } = require('./config');

class AuthorController{
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
            saveToken(token);

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
                saveToken(token);
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
        let users = ('limit' in req.query) ?
            await db.query('SELECT * FROM author limit $1', [req.query.limit]) :
            await db.query('SELECT * FROM author');
        res.json(users.rows);
    }
    async getAuthor(req, res){
        const id = req.params.id;
        let user = await db.query('select * from author where id = $1', [id]);
        res.json({
            user: user.rows[0]
        });
    }
    async getAuthorImages(req, res){
        const id = req.params.id;
        let images = await db.query(
            `select image.name, image.path_image, image.date, image.description 
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
        res.json(image.rows[0]);
    }
}

module.exports = new AuthorController();