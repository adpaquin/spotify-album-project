import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import AlbumsIndexContainer from '../containers/AlbumsIndexContainer'
import GraphShowContainer from '../containers/GraphShowContainer'
import FormShowContainer from '../containers/FormShowContainer'


export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={AlbumsIndexContainer} />
        <Route exact path="/albums" component={AlbumsIndexContainer} />
        <Route exact path="/albums/:id" component={GraphShowContainer} />
        <Route exact path="/form" component={FormShowContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
