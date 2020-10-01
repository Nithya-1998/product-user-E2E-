import React from 'react';
import './signup.css'
import axios from 'axios';
const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });
    return valid;
};
class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: null,
            password: null,
            confirmPwd: null,
            checkStatus: false,
            userCheck: [],
            formErrors: {
                emailId: "",
                password: "",
                confirmPwd: ''
            },
            errorMsg: '',
            isExist: true,
            existMsg: '',
            pwdCheck: false,
            pwdMsg: '',
            buttonStatus: false
        }
        this.getAllUsers();
    }
    getAllUsers = () => {
        axios.get('http://localhost:3000/login')
            .then((response) => {
                console.log(response.data);
                this.setState({ userCheck: response.data });
                console.log(this.state.userCheck);
            }, (error) => {
                console.log(error.data);
            })
    }
    // handleEmailChange = (event) => {
    //     this.setState({ emailId: event.target.value })
    // }
    // handlePwdChange = (event) => {
    //     this.setState({ password: event.target.value })
    // }
    // handleConfirmPwdChange = (event) => {
    //     this.setState({ confirmPwd: event.target.value })
    // }
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "emailId":
                formErrors.emailId = emailRegex.test(value)
                    ? ""
                    : "Invalid email address";
                // console.log(value);
                this.setState({ emailId: value })
                break;
            case "password":
                formErrors.password =
                    value.length < 9 ? "Minimum 8 characaters required" : "";
                break;
            case "confirmPwd":
                formErrors.confirmPwd =
                    value === formErrors.password ? "Password does not match" : "";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };
    userExist() {
        let status = false
        var oldUser = this.state.userCheck.filter((user) => {
            return (user.emailId === this.state.emailId);
        })
        console.log(oldUser)
        let newUser = {
            "emailId": this.state.emailId,
            "password": this.state.password
        }
        console.log(newUser);
        console.log(status)
        if (oldUser.length === 0) {
            // this.setState({ checkStatus: false });
            axios.post('http://localhost:3000/login', newUser).then(
                (response) => {
                    console.log(response.data)
                    this.intervaltime()
                    this.props.history.push('/login');
                }, (error) => {
                    console.log(error.data)
                }
            );
        }
        else {
            this.setState({ errorMsg: "UserId Already Exist", checkStatus: true })
            console.log("User Already Exist");
        }
    }
    intervaltime = () => {
        setTimeout(() => {
            this.setState({ checkStatus: false })
        }, 3000)
    }
    checkStatus = () => {
        if (this.state.password === this.state.confirmPwd) {
            this.setState({ pwdCheck: false })
        } else {
            this.setState({ pwdCheck: true, pwdMsg: "Password Does Not Match" })
            this.intervaltimestatus();
        }
        this.userExist();
    }
    intervaltimestatus = () => {
        setTimeout(() => {
            this.setState({ pwdCheck: false })
        }, 3000)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (formValid(this.state)) {
            this.checkStatus();
            console.log(`
            Email: ${this.state.emailId}
            Password: ${this.state.password}
          `);
        } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }

    };
    // handleSubmit = (event) => {
    //     event.preventDefault();
    // this.checkStatus();
    //     console.log(this.state.errorMsg + this.state.checkStatus);
    //     this.intervaltime();
    //     this.intervaltimestatus();
    //     this.checkStatus();
    // }

    render() {
        const { formErrors } = this.state;
        return (
            <div>
                <form onClick={this.handleSubmit} noValidate>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-sm-12 col-lg-7">
                                <div className="card mt-4 mb-5">
                                    <div className="card-title h1 ml-4 mt-4">SignUp</div>
                                    {this.state.pwdCheck &&
                                        <div className="alert alert-danger mt-2  ml-4 mr-4" role="alert">
                                            {this.state.pwdMsg}
                                        </div>}
                                    {(this.state.checkStatus && this.state.emailId) &&
                                        <div className="alert alert-danger mt-2  ml-4 mr-4" role="alert">
                                            {this.state.errorMsg}
                                        </div>}
                                    <div className="mt-2 ml-4 mr-4">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <label for="emailId"><b>Email Id : </b></label>
                                            <input type="text" id="emailId" name="emailId" className={formErrors.emailId.length > 0 ? "error" : null} onChange={this.handleChange} noValidate placeholder="Enter Email-id.." required ></input>
                                            {formErrors.emailId.length > 0 && (
                                                <div className="alert alert-danger mt-2  ml-4 mr-4" role="alert">
                                                    <span className="errorMessage">{formErrors.emailId}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <label for="password"><b>Password : </b></label>
                                            <input type="password" id="password" name="password" className={formErrors.password.length > 0 ? "error" : null} onChange={this.handleChange} noValidate
                                                placeholder="Enter Password" required />
                                            {formErrors.password.length > 0 && (
                                                <div className="alert alert-danger mt-2  ml-4 mr-4" role="alert">
                                                    <span className="errorMessage">{formErrors.password}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <label><b>Confirm Password : </b></label>
                                            <input type="password" id="confirmPwd" name="confirmPwd" className={formErrors.confirmPwd === formErrors.password ? "error" : null} noValidate
                                                onChange={this.handleChange} placeholder="Confirm Password" required ></input>
                                            {(formErrors.confirmPwd === formErrors.password) && (
                                                <span className="errorMessage">{formErrors.confirmPwd}</span>
                                            )}
                                        </div>
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="btn-group mb-4 mt-4">
                                                <button type="button" className="btn btn-success font-weight-bold">
                                                    Submit
                                                </button>
                                            </div>
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

export default Signup;