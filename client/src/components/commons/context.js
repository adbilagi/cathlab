import React from 'react';
export const AppContext = React.createContext();

export class AppProvider extends React.Component {
    state={
        loggedState : "Logout"
        // ,userLogin  : (e)=>{
        //   e.preventDefault();
        //   // write code to server /login (post) route
        //   let body ={"user" : this.state.user, "password" : this.state.password};
        //   $.ajax({
        //     method : "POST",
        //     url : "/login",
        //     data : body,
        //   }).done((data)=>{
        //     this.setState.loggedState = "Login"
        //   }).catch((er)=>{
        //     this.setState.loggedState = "Logout"
        //   })
           
        // }
    }
  render() {
    return (
        <AppContext.Provider value={{...this.state}}>
            {this.props.children}
        </AppContext.Provider>
    )
  }
}
