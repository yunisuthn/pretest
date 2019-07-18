import axios from 'axios';
const headers = {
    'Content-Type': 'application/json'
}
const burl = "http://localhost:8000"

export default {
    login : function( email,password) {
        
        return axios.post(burl + '/login',{
            'email' : email,
            'password' : password
        },{
            headers: headers
        })/* .then(
            (res)=>{console.log('test axios', res)}
        ) */
    },
    signup : function(send){
        return axios.post(burl + '/signup',send,{headers: headers})
    },
    
    isAuth : function() {
        return (localStorage.getItem('id') !== null);
    },
    logout : function() {
        localStorage.clear();
    }
}

