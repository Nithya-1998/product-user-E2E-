import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './containers/login';
import Signup from './containers/signup';

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Login}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/signup" component={Signup}></Route>
                </Switch>
            </div>
        );
    }
}

export default Content;