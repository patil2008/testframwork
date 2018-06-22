export const _local = {
    production:false,
    apiUrl:'http://localhost:8000',
    apiKey:"fba59e6508136b60e7bbb35ea44af36c",
    firebase:{
        apiKey: "AIzaSyCbztMlV_3vfXSQcqLAwM-krcC92KvRrdU",
        authDomain: "reactapp-768a5.firebaseapp.com",
        databaseURL: "https://reactapp-768a5.firebaseio.com",
        projectId: "reactapp-768a5",
        storageBucket: "reactapp-768a5.appspot.com",
        messagingSenderId: "106324498918"
    },
    db: {
        username: "root",
        password: "gatesix",
        host: 'localhost'
    }    
}

export const _stage = {
    production:false,
    apiUrl:'http://localhost:8000',
    apiKey:"fba59e6508136b60e7bbb35ea44af36c",
    firebase:{
        apiKey: "AIzaSyCbztMlV_3vfXSQcqLAwM-krcC92KvRrdU",
        authDomain: "reactapp-768a5.firebaseapp.com",
        databaseURL: "https://reactapp-768a5.firebaseio.com",
        projectId: "reactapp-768a5",
        storageBucket: "reactapp-768a5.appspot.com",
        messagingSenderId: "106324498918"
    },
    db: {
        username: "stageuser",
        password: "123456",
        host: 'localhost'
    }
}

export const _production = {
    production:true,
    apiUrl:'http://localhost:8080',
    firebase:{
        apiKey: "AIzaSyCbztMlV_3vfXSQcqLAwM-krcC92KvRrdU",
        authDomain: "reactapp-768a5.firebaseapp.com",
        databaseURL: "https://reactapp-768a5.firebaseio.com",
        projectId: "reactapp-768a5",
        storageBucket: "reactapp-768a5.appspot.com",
        messagingSenderId: "106324498918"
    },
    db: {
        username: "productionuser",
        password: "123456",
        host: 'localhost'
    }
}

const config = function getConfig(mode) {
    switch (mode) {
        case 'local':
            return _local; 
        case 'stage':
            return _stage; 
        case 'production':
            return _production; 
        default:
            return _local; 
    }
}

export default config(process.env.REACT_APP_MODE);