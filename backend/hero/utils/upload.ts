// external imports
import multer from 'multer';

function uploader(allowed_file_types: string[], max_file_size: number, error_msg: string) {
    // define the storage
    const storage = multer.memoryStorage();

    // preapre the final multer upload object
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: max_file_size,
        },
        fileFilter: (req, file, cb) => {
            console.log(file.mimetype);
            if (allowed_file_types.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error(error_msg));
            }
        },
    });

    return upload;
}

export default uploader;
