
import React from 'react';

import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

import { MDBContainer, MDBRow, MDBCol} from 'mdbreact';


import API from '../../utils/API';
class PostFrontToBack extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      nom: '',
      prix: '',
      description: '',
      photo_profil: '',
      user: ''

    };
    this.onChange = this.onChange.bind(this)
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.disconnect.bind(this);
  }


  disconnect = event => {
    API.logout();
    window.location = "/";
  }

  liste = event => {
    window.location = "/userArticle";
  }


  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }



  disconnect = event => {
    API.logout();
    window.location = "/";
  }


  handleUploadImage(ev) {

    ev.preventDefault();

    const data = new FormData();
    data.append('photo_profil', this.uploadInput.files[0]);
    data.append('nom', this.state.nom);
    data.append('prix', this.state.prix);
    data.append('description', this.state.description)
    data.append('user', localStorage.id)



    fetch('http://localhost:8000/article', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ photo_profil: `http://localhost:8000/article/${body.photo_profil}` });
        console.log('ity ilay body.fil', body);

      });
    });
  }

  componentDidMount() {
    console.log('this.props.location.pathname', localStorage.id);
  }

  render() {
    return (
      <div className="Login">

          <MDBContainer>
              <MDBRow>
                  <MDBCol md="6">

                      <FormGroup controlId="email" bsSize="large">
                          <FormLabel>Nom:</FormLabel>
                          <FormControl autoFocus type="text"
                            value={this.state.value}
                            onChange={this.onChange}
                            name="nom"/>
                      </FormGroup>
                      <FormGroup controlId="password" bsSize="large">
                          <FormLabel>Prix:</FormLabel>
                          <FormControl type="text"
                            value={this.state.value}
                            onChange={this.onChange}
                            name="prix" />
                      </FormGroup>
                      <FormGroup controlId="description" bsSize="large">
                          <FormLabel>Description:</FormLabel>
                          <FormControl type="text"
                            value={this.state.value}
                            onChange={this.onChange}
                            name="description" />
                      </FormGroup>

                      <FormGroup controlId="file" bsSize="large">
                          <FormControl 
                          ref={(ref) => { this.uploadInput = ref; }} 
                          type="file"
                           name="photo_profil" />
                      </FormGroup>

                      <Button variant="primary"
                          onClick={this.handleUploadImage}
                          type="submit">
                           Ajouter
                      </Button>

                      <Button
                          onClick={this.disconnect}
                          type="submit"
                      >
                          Deconnecter
                      </Button>
                      <Button
                          onClick={this.liste}
                          type="submit"
                      >
                          Mes produits
                      </Button>


                  </MDBCol>
              </MDBRow>
          </MDBContainer>
      {/* <form onSubmit={this.handleUploadImage}>
        <label>Nom:</label>
        <input type="text"
          value={this.state.value}
          onChange={this.onChange}
          name="nom" /><br></br>
        <label>Prix:</label>
        <input type="text"
          value={this.state.value}
          onChange={this.onChange}
          name="prix" /><br></br>
        <label>Description:</label>
        <input type="text"
          value={this.state.value}
          onChange={this.onChange}
          name="description" /><br></br>

        <input ref={(ref) => { this.uploadInput = ref; }} type="file" name="photo_profil" />

        <button>Ajouter</button>
        <Button
          onClick={this.disconnect}
          block
          bsSize="large"
          type="submit"
        >
          Se déconnecter
                </Button>
        <Button
          onClick={this.liste}
          block
          bsSize="large"
          type="submit"
        >
          Tous mes produits
                </Button>
      </form> */}
      </div>
    );
  }
}

export default PostFrontToBack;
