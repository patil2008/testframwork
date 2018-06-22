import config from '../config';
import {browserHistory} from 'react-router';
console.log("config",config);
export const apiService = {
    login,
    logout,
    get,
    post,
    postWithUpload
};
 
function login(endPoint,data,headers) {
    headers = headers || {};
    headers['Content-Type'] ='application/json';
    headers['x-api-key'] = config.apiKey;
    console.log("jheaders",headers);
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    };
    let apiUrl = config.apiUrl+endPoint;
    console.log("POST reqyestOptions",requestOptions);
    return fetch(apiUrl, requestOptions)
        .then(response => {
            console.log("POST response",response);
            return response.json();
        }).then(jsonResponse => {
            console.log("jsonResponse",jsonResponse);
            if(jsonResponse.code == 200)
            {
                localStorage.setItem('loginUser', JSON.stringify(jsonResponse.result));
                
            }
            return Promise.resolve(jsonResponse);
        }).catch(function(error) {
            console.log('error', error)
            return Promise.reject(error.statusText);
        });
} 


 
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}
function get(endPoint,queryString,headers) {
    queryString = queryString || ""; 
    headers = headers || {};
    headers['Content-Type'] ='application/json';
    headers['X-API-KEY'] = config.apiKey;
    var loginUser = localStorage.getItem('loginUser');
    
    if(loginUser){
        loginUser = JSON.parse(loginUser);
        console.log("loginUSer",loginUser);
        headers['X-API-TOKEN'] = loginUser['ssoToken'];
    }
    
    const requestOptions = {
        method: 'GET',
        headers: headers
    };

    let apiUrl = config.apiUrl+endPoint;
    if(queryString != ""){
        apiUrl += "?"+queryString;    
    }
    
    return fetch(apiUrl, requestOptions)
        .then(response => {
            console.log("GET response",response);
            // if (!response.ok) {
            //     return Promise.reject(response.statusText);
            // }
            
            return response.json();
        }).then(jsonResponse => {
            console.log("GET jsonResponse",jsonResponse);
            if(jsonResponse.code == 103)
            {
                browserHistory.push('/login');
            }
            return Promise.resolve(jsonResponse);
        }).catch(function(error) {
            console.log('GET error', error)
            return Promise.reject(error.statusText);
        });
} 

 
function post(endPoint,data,headers) {
    headers = headers || {};
    data = data || {};
    headers['Content-Type'] ='application/json';
    headers['X-API-KEY'] = config.apiKey;
    var loginUser = localStorage.getItem('loginUser');
    
    if(loginUser){
        loginUser = JSON.parse(loginUser);
        console.log("loginUSer",loginUser);
        headers['X-API-TOKEN'] = loginUser['ssoToken'];
    }
    
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    };
    let apiUrl = config.apiUrl+endPoint;
    console.log("POST reqyestOptions",requestOptions);
    return fetch(apiUrl, requestOptions)
        .then(response => {
            console.log("POST response",response);
            // if (!response.ok) {
            //     return Promise.reject(response.statusText);
            // }
            
            return response.json();
        }).then(jsonResponse => {
            console.log("jsonResponse",jsonResponse);
            if(jsonResponse.code == 103)
            {
                browserHistory.push('/login');
            }
            return Promise.resolve(jsonResponse);
        }).catch(function(error) {
            console.log('error', error)
            return Promise.reject(error.statusText);
        });
} 

 
function postWithUpload(endPoint,data,headers) {
    headers = headers || {};
    data = data || {};
    
    headers['X-API-KEY'] = config.apiKey;
    var loginUser = localStorage.getItem('loginUser');
    
    if(loginUser){
        loginUser = JSON.parse(loginUser);
        console.log("loginUSer",loginUser);
        headers['X-API-TOKEN'] = loginUser['ssoToken'];
    }
    
    const formdata = new FormData();
    for(var i in data){
        console.log("formdata",i,data[i]);
        formdata.append(i, data[i]);
    }

    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: formdata
       
    };
    let apiUrl = config.apiUrl+endPoint;
    console.log("POSTUPLOAD reqyestOptions",requestOptions);
    return fetch(apiUrl, requestOptions)
        .then(response => {
            console.log("POST response",response);
            // if (!response.ok) {
            //     return Promise.reject(response.statusText);
            // }
            
            return response.json();
        }).then(jsonResponse => {
            console.log("jsonResponse",jsonResponse);
            return Promise.resolve(jsonResponse);
        }).catch(function(error) {
            console.log('error', error)
            return Promise.reject(error.statusText);
        });
} 


function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }
 
    return response.json();
}