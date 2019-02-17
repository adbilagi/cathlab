import React, { Component } from 'react'
import {AppContext} from "./context"

export default class Home extends Component {
  render() {
    return (
      <div>
        <AppContext.Consumer>
          {
            (c)=>{
              return c.loggedState;
            }
          }

        </AppContext.Consumer>

        
      </div>
    )
  }
}
