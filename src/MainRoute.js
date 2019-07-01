import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import SingUp from './user/SignUp'
import SignIn from './user/SignIn'
import Menu from './core/Menu'


const MainRouter = () => 
(
    <div className="container">
        <Menu/>
        <Switch>
            <Route exact path="/" component={Home} ></Route>
            <Route exact path='/signup' component={SingUp}></Route>
            <Route exact path="/signin" component={SignIn}></Route>
        </Switch>
    </div>
)
export default MainRouter;
