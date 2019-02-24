import React from 'react';
import $ from "jquery"
export const AppContext = React.createContext();


export class AppProvider extends React.Component {
    state={
        loggedState : "Logout",// this state is check logged state for navabar menu as well componentdidmount
        user : "",
        password :"",
        loggedUser : "",// this is for getting user name of logged user for for frontend authenticacian
        loggedUserRole : "",// this is role of logged user for frontend authenticacian
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
          this.setState({
            errLogged : false
          })
          let body ={"user" : this.state.user, "password" : this.state.password};
          $.ajax({
            method : "POST",
            url : "/api/users/login",
            data : body,
            success :(data)=>{
              
              this.setState({
                loggedState : "Login",
                loggedUser : data.user,
                loggedUserRole : data.role,
                errLogged : false
              });

            },
            error : (err)=>{
              this.setState({
                loggedState : "Logout",
                loggedUser : "",
                errLogged : true
              });
            }
          });//end of ajax
        }////end ofuserLogin
    }// end of state
    componentDidMount(){
      $.ajax({
        method : "GET",
        url : "/api/users/validjwt",
        success : (data)=>{
          this.setState({
            loggedState : "Login",
            loggedUser: data.user.user,// this is access from jwt payload so double dots
            loggedUserRole : data.user.role// this is access from jwt payload so double dots
            
          });
        },
        error :(er)=>{
          this.setState({
            loggedState : "Logout",
            loggedUser: "",
            loggedUserRole : ""
          });
        }
      })
    }
  render() {
    return (
        <AppContext.Provider value={{...this.state}}>
            {this.props.children}
        </AppContext.Provider>
    )
  }
}
