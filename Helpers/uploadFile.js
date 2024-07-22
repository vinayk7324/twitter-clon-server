import multer from "multer";
import path from 'path'

const storage = multer.diskStorage({
    destination: '../uploads/'
    ,
    filename:(req,file,cb)=>{
      cb(null,`${Date.now()}-${file.originalname}`)

    }
  })
  const checkFileType = (file,cb)=>{
    const fileTypes = /jpeg|jpg|png|gif/;
    const extenstionType = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype)
    if(mimeType && extenstionType){
      return cb(null,true);
    }
    else{
      cb('Error : Images only!')
    }

  }
 
  export const upload = multer({
    
    storage:storage,
    limits: {fileSize:1000000},
    fileFilter:(req,file,cb)=>{
      checkFileType(file,cb);

    }
  }).single('file')