import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});
// Define Multer configuration options
const multerOptions: multer.Options = {
    storage,
    fileFilter: (req, file, cb) => {
    // Allow only image files
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
    return cb(null, true);
    }
    cb(new Error('Invalid file type. Only JPEG, PNG and GIF image files are allowed.'));
    },
    };
    
    const upload = multer(multerOptions);
    
    export default upload;