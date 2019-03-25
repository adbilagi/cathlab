/**
 * This file containes genral functions releted validadtio
 */



 /**
  * this fun converts the string into number i.e 23cr into -23 and 23dr into 23
  */
 crDrValidaate = (Amount="")=>{
    let throwString="Amount has be suffixed with cr or dr for example 500cr or 300dr";
    if(Amount == "" || Amount == 0){
        return 0
    }else{
        curAmount = Number(Amount);
        if(isNaN(Amount)){
            //check for cr or dr suffix
            Amount= Amount.toLowerCase();
            let prefixAmount =Number(Amount.substr(0, Amount.length-2));
            if(isNaN(prefixAmount)){
                throw throwString;
            }else{
                let crdrSuffix = Amount.substr(Amount.length-2, Amount.length);
                if(crdrSuffix === "cr"){
                    return Math.abs(prefixAmount) * -1
                }else if(crdrSuffix === "dr"){
                    return prefixAmount
                }else{
                    throw throwString;
                }
            }

        }else{
            return curAmount
        }
    }
    
}


 


module.exports ={
    crDrValidaate
}