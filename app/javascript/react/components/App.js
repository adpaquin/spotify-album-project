import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import AlbumsIndexContainer from '../containers/AlbumsIndexContainer'
import AlbumShowContainer from '../containers/AlbumShowContainer'
import GraphShowContainer from '../containers/GraphShowContainer'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/albums" component={AlbumsIndexContainer} />
        <Route exact path="/albums/:id" component={GraphShowContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
