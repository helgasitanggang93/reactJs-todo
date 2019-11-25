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

const fileLimit = {
    files: 1,
    fileSize: 5 * 1024 * 1024
}

const upload = multer({
    storage: fileStorage,
    limits: fileLimit,
    fileFilter
})

module.exports = {
    upload
}