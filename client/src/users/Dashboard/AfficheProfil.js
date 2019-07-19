
import React, { Component } from 'react';
import axios from 'axios';

import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

export default class AfficheProfil extends Component {

    constructor(props) {
        super(props);
        this.state = { profil: [] };

    }
    componentDidMount() {
        axios.get(`http://localhost:8000/userArticle/${localStorage.id}`)
            .then(response => {
                console.log('user-article ==== ', response)
                this.setState({ profil: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })

        

    }

    ajout = event => {
        window.location = "/dashboard";
      }
    
    liste() {
        return <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOM</th>
                            <th>PRIX</th>
                            <th>DESCRIPTION</th>
                            <th>PHOTO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (this.state.profil.length > 0) ? (this.state.profil.map((obj) => {
                                
                                return <tr key={obj._id}>
                                    <td>{obj._id}</td>
                                    <td>{obj.nom}</td>
                                    <td>{obj.prix}</td>
                                    <td>{obj.description}</td>
                                    <td><img width="150px" height="50px" src={'http://localhost:8000/photos/'+obj.photo_profil} alt="pdp" />
                                    </td>
                                    {console.log(obj)}
                                </tr>

                            })) : ('')
                        }
                    </tbody>
                </table>
    }
    render() {
        return (
            <div className='app1'>
                {this.liste()}
                      <Button
                          onClick={this.ajout}
                          type="submit"
                      >
                          Retour
                      </Button>


            </div>
        );
    }
}