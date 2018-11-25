import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import paths from './paths';

export default (history) => combineReducers({
    router: connectRouter(history),
    paths
});
