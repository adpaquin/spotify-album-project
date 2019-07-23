import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import AlbumsIndexContainer from '../containers/AlbumsIndexContainer'
import AlbumsShowContainer from '../containers/AlbumsShowContainer'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/albums' component={AlbumsIndexContainer} />
        <Route exact path='/albums/:id' component={AlbumsShowContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
