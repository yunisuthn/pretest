
import React, { Component } from 'react';
import axios from 'axios';


export default class ListTous extends Component {

    constructor(props) {
        super(props);
        this.state = { profil: [] };

    }
    componentDidMount() {
        axios.get('http://localhost:8000/article')
            .then(response => {
                console.log('i am a response', response)
                this.setState({ profil: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })

        

    }

    liste() {
        return <div>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOM</th>
                            <th>PRIX</th>
                            <th>DESCRIPTION</th>
                            <th>PHOTO</th>
                            <th>Panier</th>
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
                                    <td>
                                        <button>Ajouter au panier</button>
                                    </td>
                                    {console.log('objetListTous == ', obj)}
                                </tr>

                            })) : ('')
                        }
                    </tbody>
                </table>
            </div>
        </div>
    }
    render() {
        return (
            <div>
                {this.liste()}
            </div>
        );
    }
}