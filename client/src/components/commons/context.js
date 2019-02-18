import React from 'react';
import $ from "jquery"
export const AppContext = React.createContext();


export class AppProvider extends React.Component {
    state={
        loggedState : "Logout",
        user : "",
        password :"",
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
                loggedState : "Login"
              })
            },
            error : (err)=>{
              this.setState({
                loggedState : "Logout"
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
