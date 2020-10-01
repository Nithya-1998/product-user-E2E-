import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './login/login';
import Signup from './signup/signup';
import Home from './home/home';
import Dashboard from './dashboard/dashboard';
import EditProduct from './products/editproduct';
import AddProduct from './products/addProduct';
import AllProduct from './products/products';
// import ProductTable from './products/prodTable';

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/signup" component={Signup}></Route>
                    <Route path="/products" component={AllProduct}></Route>
                    {/* <Route path="/products" component={ProductTable}></Route> */}
                    <Route path="/edit" component={EditProduct} />
                    <Route path="/edit/:id" component={EditProduct} />
                    <Route path="/add/:id" component={AddProduct} />
                    <Route path="/add" component={AddProduct} />
                    <Route path="/dashboard" component={Dashboard} />
                </Switch>
            </div>
        );
    }
}

export default Content;