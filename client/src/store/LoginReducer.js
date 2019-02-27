const intialState = {
    Logged : false
}

const reducer = (state=intialState, action)=>{
    const newState = {...state};
    if(action == "LOGIN"){
        newState.Logged = true;
    }
    if(action == "LOGOUT"){
        newState.Logged = false;
    }
    return newState;
}

export default reducer;