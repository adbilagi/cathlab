import React from 'react';
import $ from "jquery"
export const AppContext = React.createContext();


export class AppProvider extends React.Component {
    state={
        loggedState : "Logout",
        user : "",
        password :"",
        errLogged : false,// this state stores the value to alert in case of ajax error follwing logging
        setUser : (e)=>{
          this.setState({
            user : e.target.value
          });
        },
        setPassword : (e)=>{
          this.setState({
            password : e.target.value
          });
        },
        userLogin  : (e)=>{
          e.preventDefault();
          // write code to server /login (post) route
          let body ={"user" : this.state.user, "password" : this.state.password};
          $.ajax({
            method : "POST",
            url : "/api/users/login",
            data : body,
            success :(data)=>{
              this.setState({
                loggedState : "Login",
                errLogged : false
              });

            },
            error : (err)=>{
              this.setState({
                loggedState : "Logout",
                errLogged : true
              });
            }
          });//end of ajax
        }////end ofuserLogin
    }// end of state
  render() {
    return (
        <AppContext.Provider value={{...this.state}}>
            {this.props.children}
        </AppContext.Provider>
    )
  }
}
