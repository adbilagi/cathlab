

const intialState = {
    logged : true,
    user : "",
    password : ""
}

const reducer = (state=intialState, action)=>{
    
    const newState = {...state};
    if(action.type === "LOGIN"){
        alert(action.payload);
        newState.logged = action.payload;
    }

    if(action.type === "LOGOUT"){
        newState.logged = false;
    }
    return newState;
}

export default reducer;