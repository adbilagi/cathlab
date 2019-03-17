const isEmail = require("validator").isEmail


let email = (email)=>{
    return new Promise((resolve, reject)=>{
        if(isEmail(email)==false){
            reject("invalid email");
        }else{
            resolve(true)
        }
    })

}
let openingBalance = (ob)=>{
    let rejectString="Amount has be suffixed with cr or dr for example 500cr or 300dr";
    return new Promise((resolve, reject)=>{
        if(typeof ob =="number"){
            resolve(ob);
        }else if(typeof ob == "string"){
            ob= ob.toLowerCase();
        }else{
            reject(rejectString);
            return;
        }
        // ====================================

        if( isNaN(Number(ob.substr(0, ob.length-2)))){
            reject(rejectString);
        }
        else if(ob.substr(ob.length-2) ==="cr"){
            
        resolve(Math.abs(parseFloat(ob)) * -1)
            
        }
        else if(ob.substr(ob.length-2) ==="dr"){
            resolve(Math.abs(parseFloat(ob)))
            
        }
        else{
            reject(rejectString);
        }
    })
}



openingBalance("234.56cr").then(res=>console.log(res)).catch(err=>console.log(err));
