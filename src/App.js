
import './App.css';


import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize=9;

  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({
      progress:progress
    })
  }

  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
          color='#f11946'
          height={3}
          progress={this.state.progress}
        />
        
        <Switch>
          <Route exact path="/">
            <News setProgress={this.setProgress} key="general" pagesize={this.pageSize} apikey="f797b3ed033747e08ced76830a97c9cb" country="in" category="general"/>
          </Route>
          <Route exact path="/business">
            <News setProgress={this.setProgress} key="business" pagesize={this.pageSize} apikey="f797b3ed033747e08ced76830a97c9cb" country="in" category="business"/>
          </Route>
          <Route exact path="/entertainment">
            <News setProgress={this.setProgress} key="entertainment" pagesize={this.pageSize} apikey="f797b3ed033747e08ced76830a97c9cb" country="in" category="entertainment"/>
          </Route>
          <Route exact path="/health">
            <News setProgress={this.setProgress} key="health" pagesize={this.pageSize} apikey="f797b3ed033747e08ced76830a97c9cb" country="in" category="health"/>
          </Route>
          <Route exact path="/sports">
            <News setProgress={this.setProgress} key="sports" pagesize={this.pageSize} apikey="f797b3ed033747e08ced76830a97c9cb" country="in" category="sports"/>
          </Route>
          <Route exact path="/technology">
            <News setProgress={this.setProgress} key="technology" pagesize={this.pageSize} apikey="f797b3ed033747e08ced76830a97c9cb" country="in" category="technology"/>
          </Route>
        </Switch>
        </Router>
      </div>
    )
  }
}


