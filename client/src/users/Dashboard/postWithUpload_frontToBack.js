
import React from 'react';

import { Button } from "react-bootstrap";

import API from '../../utils/API';
class PostFrontToBack extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
     nom: '',
     prix:'',
      description:'',
      photo_profil:'',
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
    data.append('nom',this.state.nom);
    data.append('prix',this.state.prix);
    data.append('description',this.state.description)
    data.append('user',localStorage.id)

    
    
    fetch('http://localhost:8000/article', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ photo_profil: `http://localhost:8000/article/${body.photo_profil}` });
        console.log('ity ilay body.fil',body);
        
      });
    });
  }

  componentDidMount() {
    console.log('this.props.location.pathname',localStorage.id);
    
    /* axios.get('http://localhost:8000/user/')
        .then(response => {
            console.log('user_tokony-misy awy doly', response)
            this.setState({ profil: response.data });
        })
        .catch(function (error) {
            console.log(error);
        }) */

    

}

  render() {
    return (
      <form onSubmit={this.handleUploadImage}>
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
      
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" name="photo_profil"/>
       
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
      </form>
    );
  }
}

export default PostFrontToBack;
