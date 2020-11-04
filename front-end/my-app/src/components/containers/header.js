import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import userNameAction from '../actions/userNameAction';
import './header.css';

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.isLoggedIn);
        this.state = {
            isLoggedIn: false,
            isLoggedInUser: null,
            pictures: []
        }
    }
    onDrop = (picture) => {
        console.log(picture);
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }
    componentDidUpdate() {
        console.log("Did Update")
        console.log(this.props.isLoggedIn);
    }
    onLogout = (e) => {
        e.preventDefault();
        this.setState({ isLoggedIn: true });
        this.props.sendUserName(null);
    }

    render() {

        return (
            <div>
                <div className="container-fluid fixed-top postion-fixed bg-dark py-3">
                    <div className="row collapse show no-gutters d-flex h-100 position-relative">
                        <div className="col-3 px-0 w-sidebar navbar-collapse collapse d-none d-md-flex">
                        </div>
                        <div className="col px-3 px-md-0">
                            <a data-toggle="collapse" href="#"  style={{textDecoration: 'none'}} data-target=".collapse" role="button" className="text-white p-1">
                                <i className="material-icons">menu</i> &nbsp;
                                    BuyKart <i className="material-icons mb-2 text-light" style={{ fontSize: '30px' }}>poll</i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="container-fluid px-0" data-toggle="collapse" data-target=".collapse">
                    <div className="row collapse show no-gutters d-flex h-100 position-relative">
                        <div className="col-3 p-0 h-100 w-sidebar navbar-collapse collapse d-none d-md-flex sidebar">
                            <div className="navbar-dark bg-dark text-white position-fixed h-100 align-self-start w-sidebar">
                                <h6 className="px-3 pt-3">
                                    <Link to="/products" style={{ color: 'black', textDecoration: 'none' }}>
                                        <b className="text-light mr-auto ml-2">
                                            {(!this.state.isLoggedIn && this.props.isLoggedIn !== null) &&
                                                // <h3 className="icon-button text-dark  btn-white font-weight-bold"><b>{this.props.isLoggedIn[0].toUpperCase()}</b></h3>}
                                                <h3 className="icon-button text-dark  btn-white font-weight-bold"><img src="" alt={this.props.isLoggedIn[0].toUpperCase()}></img></h3>}
                                        </b>
                                    </Link>
                                    <a data-toggle="collapse" className="px-1 d-inline d-md-none text-white" href="#" data-target=".collapse">
                                    </a>
                                </h6>
                                <ul className="nav flex-column flex-nowrap text-truncate">
                                    {(this.state.isLoggedIn || this.props.isLoggedIn === null) &&
                                        <li className="nav-item" >
                                            <a className="nav-link">
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-white font-weight-bold">
                                                        <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
                                                            Login</Link>
                                                    </button>
                                                </div>
                                            </a>
                                        </li>}
                                    {(this.state.isLoggedIn || this.props.isLoggedIn === null) &&
                                        <li className="nav-item">
                                            <a className="nav-link">
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-white font-weight-bold">
                                                        <Link to="/signup" style={{ color: 'black', textDecoration: 'none' }}>Signup</Link>
                                                    </button>
                                                </div>
                                            </a>
                                        </li>}
                                    {(this.props.isLoggedIn !== null && !this.state.isLoggedIn) &&
                                        <li className="nav-item" >
                                            <a className="nav-link">
                                                <div className="btn-group">
                                                    <button type="button" onClick={this.onLogout}
                                                        className="btn btn-white font-weight-bold">
                                                        <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
                                                            Logout
                                                            </Link>
                                                    </button>
                                                </div>
                                            </a>
                                        </li>}
                                    {(!this.state.isLoggedIn && this.props.isLoggedIn !== null) &&
                                        <li className="nav-item" >
                                            <a className="nav-link">
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-white font-weight-bold">
                                                        <Link to="/products" style={{ color: 'black', textDecoration: 'none' }}>Inventory</Link>
                                                    </button>
                                                </div>
                                            </a>
                                        </li>}
                                    {(!this.state.isLoggedIn && this.props.isLoggedIn !== null) &&
                                        <li className="nav-item" >
                                            <a className="nav-link">
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-white font-weight-bold">
                                                        <Link to="/dashboard" style={{ color: 'black', textDecoration: 'none' }}>Dashboard</Link>
                                                    </button>
                                                </div>
                                            </a>
                                        </li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
function storeToprops(store) {
    console.log(store.userName);
    return {
        isLoggedIn: store.userName
    }
}
function dispatchToaction(dispatch) {
    return bindActionCreators({
        sendUserName: userNameAction
    }, dispatch);
}

export default connect(storeToprops, dispatchToaction)(HeaderComponent);