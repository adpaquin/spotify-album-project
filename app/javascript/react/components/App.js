import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import AlbumsIndexContainer from '../containers/AlbumsIndexContainer'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={AlbumsIndexContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
