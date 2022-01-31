const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-',file.originalname)
    }
})
const upload = multer({storage: storage})

module.exports = {
    upload: upload.single('file')
}
//upload.single('blogImage'), multerConfig.upload,

    // const imageUrl = `http://127.0.0.1/images/${req.file.filename}`
    // const image = {
    //     data: fs.readFileSync(path.join(__dirname, '../images/' + req.file.filename)),
    //     contentType: 'image/png' || 'image/jpg' || 'image/jpeg'
    // }