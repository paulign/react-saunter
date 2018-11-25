import { ADD_MAP_MARKER } from './types';

export const addMapMarker = (payload) => {
    return { type: ADD_MAP_MARKER, payload }
}

export const createNewPath = () => async (dispatch, getState) => {
    try {
        const path  = getState().form.newPath.values;

        console.log(path);
    } catch (error) {
        console.log(error);
    }
}