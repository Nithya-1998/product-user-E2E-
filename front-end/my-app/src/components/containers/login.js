import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Axios from 'axios';
import sendUserAction from '../actions/allUserAction';
import { Link } from 'react-router-dom';
import userNameAction from '../actions/userNameAction';
import loginAction from '../actions/loginAction';
import './styles.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginUser: [],
            emailId: '',
            password: '',
            oldUser: [],
            isExist: true,
            emailError: '',
            passwordError: '',
            errorMsg: '',
            buttonStatus: false
        }
        this.getAllUsers();
    }
    componentDidMount() {
        this.getAllUsers();
    }
    getAllUsers = () => {
        Axios.get('http://localhost:8040/register-service/users/').then((response) => {
            console.log(response.data);
            this.setState({ loginUser: response.data });
            this.props.sendAllUser(response.data);
            return response.data;
        }, (error) => {
            console.log(error.data);
        })
        //333

        // return fetch(`http://localhost:8040/register-service/users/`, requestOptions)
        //     .then(handleResponse)
        //     .then(user => {
        //         // login successful if there's a user in the response
        //         if (user) {
        //             // store user details and basic auth credentials in local storage 
        //             // to keep user logged in between page refreshes
        //             user.authdata = window.btoa(username + ':' + password);
        //             localStorage.setItem('user', JSON.stringify(user));
        //         }

        //         return user;
        //     });
    }

    handleNewUserExist = () => {
        let exist = false;
        console.log(this.props.allUser);
        let olduser = this.props.allUser.filter((user) => {
            return ((user.emailId === this.state.emailId) && (user.password === this.state.password))
        })
        console.log(olduser.length);
        if (olduser.length === 0) {
            this.setState({ errorMsg: "Invalid UserId/Password", isExist: false });
        } else {
            this.setState({ oldUser: olduser, isExist: true, buttonStatus: true });
            exist = true;
            this.props.loginClicked(exist);
            this.props.sendUserName(this.state.emailId);
            // this.props.history.push('/products');
        }
        if (exist) {
            console.log(this.state.emailId);
            console.log(this.props.loginClicked(exist))
        }

    }
    handleEmailChange = (event) => {
        console.log(event.target)
        let val = event.target.value
        console.log(event.target.value)
        this.setState({ emailId: event.target.value })
        console.log(val)
        console.log(this.state.emailId)
    }
    handlePwdChange = (event) => {
        console.log(event)
        console.log(event.target)
        console.log(event.target.value)
        this.setState({ password: event.target.value })
        console.log(this.state.password)
    }
    intervaltime = () => {
        setTimeout(() => {
            this.setState({ isExist: true })
        }, 3000)
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let emailId = this.state.emailId;
        let password = this.state.password;
        console.log("Basic Tml0aHlhMUBnbWFpbC5jb206Tml0aHlhMUAxOTk4");
        console.log(window.btoa(emailId + ':' + password));
        Axios.get('http://localhost:8040/authentication-service/authenticate/', {
            headers: {
                 'Content-Type': 'application/json',
                  'Authorization': 'Basic ' + window.btoa(emailId + ':' + password) 
                }
        }).then(res=>{
            console.log(res.data);
            this.setState({ loginUser: res.data });
            this.props.sendAllUser(res.data);
            this.setState({ isExist: true })
        },err=>{
            console.log(err.data);
        });

        // this.handleNewUserExist();
        this.intervaltime();
    }
    render() {
        return (
            <div>
                <form>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-sm-12 col-lg-7">
                                <div className="card mt-4 mb-5">
                                    <div className="card-title h1 ml-4 mt-4">Login</div>
                                    {!this.state.isExist &&
                                        <div className="alert alert-danger mt-2  ml-4 mr-4" role="alert">
                                            {this.state.errorMsg}
                                        </div>}
                                    <div className="mt-2 ml-4 mr-4">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <label for="emailId"><b>Email Id : </b></label>
                                            <input type="text" data-testid="emailId" id="emailId" className="emailId" value={this.state.emailId} onChange={this.handleEmailChange} placeholder="Enter Email-id.." required ></input>
                                        </div>
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <label for="password"><b>Password : </b></label>
                                            <input type="password" data-testid="password" id="password" className="password" value={this.state.password} onChange={this.handlePwdChange}
                                                placeholder="Enter Password" />
                                        </div>
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="btn-group mb-4 mt-4">
                                                <button type="button" onClick={this.handleSubmit} className="btn btn-success font-weight-bold">
                                                    Login
                                                    </button>
                                            </div>
                                            <span className='float-right mt-4'><Link to='/signup'>NewUser?SignUp</Link></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
function storeToprops(store) {
    console.log(store.allUser);
    return {
        allUser: store.allUser
    }
}
function dispatchToaction(dispatch) {
    return bindActionCreators({
        sendAllUser: sendUserAction,
        sendUserName: userNameAction,
        loginClicked: loginAction
    }, dispatch);
}

export default connect(storeToprops, dispatchToaction)(Login);