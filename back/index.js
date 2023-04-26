let express = require('express');
let fileUpload = require('express-fileupload');
let app = express();
let router = require('./routes');
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(fileUpload({
    createParentPath:true
}));
app.use('/api', router);
app.use('/pictures', express.static('pictures'));

app.listen(PORT, () => console.log(`Server starting on port ${PORT}`));
