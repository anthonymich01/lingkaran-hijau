import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./pages/Home"
import Upload from "./pages/Upload"
import Detail from "./pages/Detail"

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/upload" component={Upload} />
          <Route path="/g/:id" component={Detail} />
        </Switch>
      </Router>
    )
  }
}

export default App
