import multer from "multer";

export const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        console.log(file)
        let sp = file.originalname.split('.')[0]
        return cb(
            null,
            `${sp}_${Date.now()}${path.extname(file.originalname)}`
        )
    }
});
