

import React, { Component } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';

import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol } from 'mdbreact';

import Achat from './Achat';
import axios from 'axios';
class Accueil extends Component {

    constructor(props) {
        super(props);
        this.state = { profil: [] };

    }
    componentDidMount() {
        axios.get('http://localhost:8000/article')
            .then(response => {
                //console.log('i am a response', response)
                this.setState({ profil: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })



    }
    achat = (x)=> {
        console.log('cccc == ', x);
        window.location = "/achat/"+this.x
        /* 
      return this.state.profil.map(function(object, i){
        return <Achat obj={object} key={i} />; 
    });
        /* console.log('object == ',x)
        
         <TableRow obj={object} key={i} />; */
      
    }
    render() {
        return (
                <div>
            

            {
                (this.state.profil.length > 0) ? (this.state.profil.map((obj) => {

                    return (
                        <MDBCol  id='colonne'className='col-md-4'>
                            <MDBCard  id='carte' key={obj._id}>
                                <MDBCardImage id='sary'cascade className="img-fluid" src={'http://localhost:8000/photos/' + obj.photo_profil} alt="pdp" />
                                <MDBCardBody cascade>
                                    <MDBCardTitle>{obj.nom}</MDBCardTitle>
                                    <MDBCardText>{obj.prix}</MDBCardText>
                                    <MDBBtn onClick={()=>this.achat(obj)} >
                                        Acheter
                                    </MDBBtn>
                                </MDBCardBody>
                                {/*console.log(obj)*/}
                            </MDBCard>
                        </MDBCol>)

                })) : ('')
            }
            </div>
        );
    }
}

export default Accueil;


    /* liste() {
        return <div>
            

                {
                    (this.state.profil.length > 0) ? (this.state.profil.map((obj) => {

                        return (
                            <MDBCol  id='colonne'className='col-md-4'>
                                <MDBCard id='carte' key={obj._id}>
                                    <MDBCardImage id='sary'cascade className="img-fluid" src={'http://localhost:8000/photos/' + obj.photo_profil} alt="pdp" />

                                    <MDBCardBody cascade>
                                        <MDBCardTitle>{obj.nom}</MDBCardTitle>
                                        <MDBCardText>{obj.prix}</MDBCardText>
                                        <MDBBtn onClick={this.achat(obj)} >
                                            Acheter
                                        </MDBBtn>
                                    </MDBCardBody>
                                    {/*console.log(obj)}
                                </MDBCard>
                            </MDBCol>)

                    })) : ('')
                }
        </div>
    } */