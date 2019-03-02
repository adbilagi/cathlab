<<<<<<< HEAD


const intialState = {
    logged : true,
=======
import $ from "jquery"

const intialState = {
    logged : false,
    alertErrorLogged : false,
>>>>>>> ed71380eed70413a4aef8b0ea65ad0aeb53e9aef
    user : "",
    role : "",
    responceText : ""
}

const reducer = (state=intialState, action)=>{
    
    const newState = {...state};
   
    if(action.type === "LOGIN"){
<<<<<<< HEAD
        alert(action.payload);
        newState.logged = action.payload;
=======
        if(action.payload.logged == false){
            $.ajax({
                method : "GET",
                url : "api/users/logout",
            })
            
        }
      
        newState.logged = action.payload.logged;
        newState.responceText = action.payload.responceText;
        newState.role = action.payload.role;
        newState.alertErrorLogged = action.payload.alertErrorLogged;
>>>>>>> ed71380eed70413a4aef8b0ea65ad0aeb53e9aef
    }

    if(action.type === "LOGOUT"){
        newState.logged = false;
    }
    return newState;
}

export default reducer;