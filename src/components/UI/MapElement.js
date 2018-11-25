import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps"

class MapContainer extends Component {
    onMapClick = (e) => {
        const {addingMarker, onAddMarker} = this.props;

        if(addingMarker && onAddMarker) {
            onAddMarker({lat: e.latLng.lat(), lng: e.latLng.lng()});
        }
    }

    render() {
        const {markers, addingMarker} = this.props;
        const draggableCursor = addingMarker ? 'crosshair' : undefined;
        return (
            <GoogleMap
                defaultZoom={15}
                options={{ disableDefaultUI: true, draggableCursor }}
                defaultCenter={{ lat: 50.447704, lng: 30.522050 }}
                onClick={this.onMapClick}
            >
                {markers && markers.length && markers.map((marker, key) => {
                    return <Marker key={key} position={{ lat: marker.lat, lng: marker.lng }} />
                })}
                {markers && markers.length > 1 &&
                    <Polyline path={markers} options={{strokeColor: '#FF0000', strokeWidth: 2}} />
               }
            </GoogleMap>
        )
    }
}

export default withScriptjs(withGoogleMap(MapContainer));