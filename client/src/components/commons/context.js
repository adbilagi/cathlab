import React from 'react';
export const AppContext = React.createContext();

export default class AppProvider extends React.Component {
    state={
        loggedState : "Logout"
    }
  render() {
    return (
        <AppContext.Provider value={...this.state}>
            {this.props.children}
        </AppContext.Provider>
    )
  }
}
