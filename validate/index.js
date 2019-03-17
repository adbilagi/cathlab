/**
 * This file containes genral functions releted validadtio
 */



 /**
  * this fun converts the string into number i.e 23cr into -23 and 23dr into 23
  */
 crDrValidaate = (Amount)=>{
     
    let throwString="Amount has be suffixed with cr or dr for example 500cr or 300dr";
    if(typeof Amount =="number"){
        return(Amount);
    }else if(typeof Amount == "string"){
        Amount= Amount.toLowerCase();
    }else{
        throw throwString ;
        return;
    }
    // ====================================

    if( isNaN(Number(Amount.substr(0, Amount.length-2)))){
        throw throwString;
    }
    else if(Amount.substr(Amount.length-2) ==="cr"){
        
    return(Math.abs(parseFloat(Amount)) * -1)
        
    }
    else if(Amount.substr(Amount.length-2) ==="dr"){
        return(Math.abs(parseFloat(Amount)))
        
    }
    else{
        throw throwString ;
    }
}

module.exports.crDrValidaate = crDrValidaate;