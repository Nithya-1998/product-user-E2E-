import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.loginUser);
        this.state = {
            loginUser: this.props.loginUser,
            isLoggedIn: this.props.isLoggedIn
        }
    }

    render() {
        return (
            <div style={{float:'top'}} className="mt-auto">
                <nav className="navbar navbar-expand-lg navbar-dark mt-auto">
                    <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                        <b className="text-light mr-auto ml-2">BuyKart
                        <i className="material-icons mb-2 text-light" style={{ fontSize: '30px' }}>poll</i>
                        </b>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                    <i className="material-icons text-white">menu</i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item" >
                                <a className="nav-link">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-light font-weight-bold">
                                            <Link to="/login" style={{ color: 'black', textDecoration: 'none' }}>
                                                Login</Link>
                                        </button>
                                    </div>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-light font-weight-bold">
                                            <Link to="/signup" style={{ color: 'black', textDecoration: 'none' }}>Signup</Link>
                                        </button>
                                    </div>
                                </a>
                            </li>
                            <li className="nav-item" >
                                <a className="nav-link">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-light">
                                            <i className="material-icons">account_box</i>
                                            <span className="font-weight-bold">{this.props.loginUser}</span>
                                        </button>
                                    </div>
                                </a>
                            </li>
                            <li className="nav-item" >
                                <a className="nav-link">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-light font-weight-bold">
                                            <Link to="/cart" style={{ color: 'black', textDecoration: 'none' }}> <i className="material-icons">add_shopping_cart</i></Link>
                                        </button>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavigationBar;