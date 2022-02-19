const multer = require('multer'); //Module pour pouvoir traiter les fichiers  en l'occurence des images.

const MIME_TYPES = {
  'image/jpg' : 'jpg',
  'image/jpeg': 'jpg',
  'image/png' : 'png'
};
const storage = multer.diskStorage({ //Stock l'image dans le disktorage 
    destination: (req, file, callback) => {
        callback(null, 'images_post')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split('.')[0].split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + '_' + Date.now() + '.' + extension);
    }
})

module.exports = multer({ storage }).single('imagesUrl');