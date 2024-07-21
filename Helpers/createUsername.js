const createUserName = (name)=>{
   
    
    let userName = name.split(' ')[0];
    if(userName.length>5){
        userName = userName.substring(0,5);
        
    }
    userName = userName +'X'+ `${Date.now()}`.substring(6);
    return userName;
}
export default createUserName;