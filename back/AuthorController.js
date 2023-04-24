const db = require('./db');

class AuthorController{
    async getAuthors(req, res){
        let users = ('limit' in req.query) ?
            await db.query('SELECT * FROM author limit $1', [req.query.limit]) :
            await db.query('SELECT * FROM author');
        res.json(users.rows);
    }
    async getAuthor(req, res){
        const id = req.params.id;
        let user = await db.query('select * from author where id = $1', [id]);
        res.json(user.rows[0]);
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