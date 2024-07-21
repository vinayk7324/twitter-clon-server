import { upload } from "../Helpers/uploadFile.js";

export const avatarController = async (req,res)=>{
    try {
       upload(req,res,(err)=>{
      
        if(req.file==undefined){
          return  res.status(400).json({  message:"no file selected!"})
        }
        return res.send({
            success:true,
            message:'file uploaded successfully',
            file:`uploads/${req.file?.filename}`
        })

       })
        
    } catch (error) {
        console.log('error in uploading profile :: ',error);
    

        
    }

}