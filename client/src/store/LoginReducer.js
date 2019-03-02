import $ from "jquery"

const intialState = {
    logged : false,
    alertErrorLogged : false,
    user : "",
    role : "",
    responceText : ""
}

const reducer = (state=intialState, action)=>{
    
    const newState = {...state};
   
    if(action.type === "LOGIN"){
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
    }

    if(action.type === "LOGOUT"){
        newState.logged = false;
    }
    return newState;
}

export default reducer;