import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import newPath from './newPath';

import paths from './paths';

export default (history) => combineReducers({
    router: connectRouter(history),
    form: newPath,
    paths
});
