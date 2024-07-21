import  bcrypt from 'bcrypt'

export const hashXPassword =async ({password})=>{
    try {
        const saltRound = 10
        const hashedXpass = await bcrypt.hash(password,saltRound)
        return hashedXpass

        
    } catch (error) {
        console.log("error at hashXpassword with :: ",error);
        res.redirect(`${client_url}/error-page`);
        return;
        
    }

}

export const compareXpassword =async ({userPassword,reqPassword})=>{
    try {
        const matchedPass = await bcrypt.compare(reqPassword,userPassword);
        return matchedPass  
        
    } catch (error) {
        console.log("error at hashXpassword with :: ",error);
        res.redirect(`${client_url}/error-page`);
        return;
    }

}