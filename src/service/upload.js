import multer from 'multer';

export const uploadimg = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'src/public/images/')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    })

    return storage;
}

