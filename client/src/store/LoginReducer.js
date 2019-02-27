const intialState = {
    logged : false,
    user : "",
    password : ""
}

const reducer = (state=intialState, action)=>{
    const newState = {...state};
    if(action.type === "LOGIN"){
        newState.logged = true;
    }

    if(action.type === "LOGOUT"){
        newState.logged = false;
    }
    return newState;
}

export default reducer;