import React from 'react';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import API from '../../utils/API';

import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            cpassword: ""
        }
        this.handleChange.bind(this);
        this.send.bind(this);
    }
    send = event => {
        if (this.state.email.length === 0) {
            return;
        }
        if (this.state.password.length === 0 || this.state.password !== this.state.cpassword) {
            return;
        }
        var _send = {
            email: this.state.email,
            password: this.state.password
        }
        API.signup(_send).then(function (data) {
            //localStorage.setItem('token', data.data.token);
            localStorage.setItem('id', data.data.id);
            window.location = '/dashboard'
            // window.location = `/dashboard/${data.data.id}`
        }, function (error) {
            console.log(error);
            return;
        })
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    signin = event => {
        window.location = "/login"
        // API.login(this.state.email, this.state.password).then(function(data){
        //     localStorage.setItem('token', data.data.token);
        //     window.location = "/dashboard"
        // },function(error){
        //     console.log(error);
        //     return;
        // })
    }
    render() {
        return (
            <div className="Login">
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="6">

                            <FormGroup controlId="email" bsSize="large">
                                <FormLabel>Email</FormLabel>
                                <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup controlId="password" bsSize="large">
                                <FormLabel>Password</FormLabel>
                                <FormControl value={this.state.password} onChange={this.handleChange} type="password" />
                            </FormGroup>
                            <FormGroup controlId="cpassword" bsSize="large">
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl value={this.state.cpassword} onChange={this.handleChange} type="password" />
                            </FormGroup>

                            <Button
                                type="submit"
                                onClick={this.send}
                            >
                                Inscription
                            </Button>

                            <Button
                                onClick={this.signin}
                                type="submit"
                            >
                                Signin
                            </Button>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}