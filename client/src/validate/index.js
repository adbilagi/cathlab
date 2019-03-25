
/**
 * This file contains generic validadtors for front end
 */
export let numberToCrDr = (Amount = 0)=>{
    if(typeof Amount != "number"){
        throw "invalid number to Cr or Dr";
    }else if(Amount < 0){
        return `${Math.abs(Amount)}Cr`
    }else if(Amount >= 0){
        return `${Amount}Dr`;
    }

}




