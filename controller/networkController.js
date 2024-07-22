import dns from 'dns'

export const networkConnection = (req,res)=>{
    try {
        dns.lookup('google.com',(err)=>{
            if(err){
                res.status(404).send({
                    success:false,
                    isOnline:false,
                    message:"No network"
                })
            }
            else{
                res.send({
                    success:true,
                    isOnline:true,
                    message:"network connected"
                })
            }
        })
        
    } catch (error) {
        console.log('error in network-controller::',error);
        return res.send({
            success:false,
            message:"error in server side"
        })

        
    }

}

