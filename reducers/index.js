import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
/*import CVsReducer from './reducer_cvs';
import ActiveCVReducer from './reducer_active_cv';
*/
const rootReducer = combineReducers({
    //CVs: CVsReducer,
    //selectedCV: ActiveCVReducer,
    form: formReducer
});

export default rootReducer;