import {FETCH_CV, DESELECT_CV} from '../actions/index';

export default function(state = null, action) {
    switch (action.type) {
      case FETCH_CV:
        return action.payload.data;
      case DESELECT_CV:
        return action.payload;
      default:
        return state;
    }
  }