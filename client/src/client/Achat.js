import React from 'react';
//import { BrowserRouter as Router } from 'react-router-dom';

import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

class Achat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: "",
            email: "",
            carte: "",
            password: ""
        
        }
        this.handleChange.bind(this);
        this.send.bind(this);
    }
    send = event => {
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    signin = event => {
        window.location = "/login"
        
    }
    render() {

        return (
            
            <div className="Login">
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="6">

                            <FormGroup controlId="nom" bsSize="large">
                                <FormLabel>nom</FormLabel>
                                <FormControl autoFocus type="text" value={this.state.nom} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup controlId="email" bsSize="large">
                                <FormLabel>email</FormLabel>
                                <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup controlId="email" bsSize="large">
                                <FormLabel>numéro carte</FormLabel>
                                <FormControl autoFocus type="email" value={this.state.carte} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup controlId="password" bsSize="large">
                                <FormLabel>Password</FormLabel>
                                <FormControl value={this.state.password} onChange={this.handleChange} type="password" />
                            </FormGroup>

                            <Button
                                type="submit"
                                onClick={this.send}
                            >
                                Envoyer
                            </Button>

                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
                );
              }
            }
            
export default Achat;