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