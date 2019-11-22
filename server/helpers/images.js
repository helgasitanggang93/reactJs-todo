const multer = require('multer')

const fileStorage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${new Date().toISOString()} - ${file.originalname}`);
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const upload = multer({
    storage: fileStorage,
    fileFilter
})

module.exports = {
    upload
}