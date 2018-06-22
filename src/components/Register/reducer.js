
const initialState = {
    isRegister: false,
    registerResult: {}
    
};

export default function registerReducer(state = initialState, action) {
    switch (action.type) {
        
        case 'REGISTER_ACTION':
            console.log("action",action);
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
    return state;
};
