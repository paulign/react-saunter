import React, { Component } from 'react';
import MapElement from '../UI/MapElement'

class MapContainer extends Component {
    
    render() {
        return ( 
            <MapElement 
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
                mapElement={<div className="h-100"/>} 
                loadingElement={<div className="h-100"/>} 
                containerElement={<div className="h-100"/>}
                {...this.props} 
            />
        )
    }
}

export default MapContainer;