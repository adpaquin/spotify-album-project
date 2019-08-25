import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import AlbumsIndexContainer from '../containers/AlbumsIndexContainer'
import GraphShowContainer from '../containers/GraphShowContainer'
import FormShowContainer from '../containers/FormShowContainer'
import HomePageContainer from '../containers/HomePageContainer'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePageContainer} />
        <Route exact path="/albums" component={AlbumsIndexContainer} />
        <Route exact path="/albums/new" component={FormShowContainer} />
        <Route exact path="/albums/:id" component={GraphShowContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
