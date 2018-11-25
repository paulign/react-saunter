import React, { Component } from 'react';
import MapElement from '../UI/MapElement'

class MapContainer extends Component {
    render() {
        return ( 
            <MapElement 
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBSaE3x4mMXAPEvjnpc2H8Ns41WvY0HD8c" 
                mapElement={<div className="h-100"/>} 
                loadingElement={<div className="h-100"/>} 
                containerElement={<div className="h-100"/>}
                {...this.props} 
            />
        )
    }
}

export default MapContainer;