import {FETCH_CVS} from '../actions/index';

export default function(state = [], action){
    switch(action.type){
        case FETCH_CVS:
            return action.payload.data;
        default:    
            return state;
    }
}