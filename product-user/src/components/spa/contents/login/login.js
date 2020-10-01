import React from 'react';
import axios from 'axios';
import './login.css';
import { Link } from 'react-router-dom';

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
    getAllUsers = () => {
        axios.get('http://localhost:3000/login')
            .then((response) => {
                console.log(response.data);
                this.setState({ loginUser: response.data });
                console.log(this.state.loginUser);
            }, (error) => {
                console.log(error.data);
            })
    }
    handleNewUserExist = () => {
        let exist = false;
        let olduser = this.state.loginUser.filter((user) => {
            return (user.emailId === this.state.emailId)
        })
        console.log(olduser.length);
        if (olduser.length === 0) {
            this.setState({ errorMsg: "Invalid UserId/Password", isExist: false });
        } else {
            this.setState({ oldUser: olduser, isExist: true, buttonStatus: true });
            exist = true;
        }
        if (exist) {
            this.props.history.push('/products');
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
        this.handleNewUserExist();
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
                                            <input type="text" id="emailId" className="emailId" value={this.state.emailId} onChange={this.handleEmailChange} placeholder="Enter Email-id.." required ></input>
                                        </div>
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <label for="password"><b>Password : </b></label>
                                            <input type="password" id="password" className="password" value={this.state.password} onChange={this.handlePwdChange}
                                                placeholder="Enter Password" />
                                        </div>
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="btn-group mb-4 mt-4">
                                                <button type="button" onClick={this.handleSubmit} className="btn btn-success font-weight-bold">
                                                    Login
                                                    </button>
                                            </div>
                                            <span className='float-right mt-4'><Link to='/Signup'>NewUser?SignUp</Link></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        );
    }
}

export default Login;