import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps"

class MapContainer extends Component {
    onMapClick = (e) => {
        const { addingMarker, onAddMarker } = this.props;

        if (addingMarker && onAddMarker) {
            onAddMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        }
    }

    onMarkerDrag = (index, e) => {
        const {onMarkerDrag} = this.props;
        const latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };

        if(onMarkerDrag) {
            onMarkerDrag(index, latLng);
        }

    }

    render() {
        const { markers, addingMarker } = this.props;
        const draggableCursor = addingMarker ? 'crosshair' : undefined;
        return (
            <GoogleMap
                defaultZoom={15}
                options={{ disableDefaultUI: true, draggableCursor }}
                defaultCenter={{ lat: 50.447704, lng: 30.522050 }}
                onClick={this.onMapClick}
            >
                {markers && markers.length && markers.map((marker, index) => {
                    return <Marker key={index} defaultDraggable={true} onDragEnd={(e) => this.onMarkerDrag(index, e)} position={{ lat: marker.lat, lng: marker.lng }} />
                })}
                {markers && markers.length > 1 &&
                    <Polyline path={markers} options={{ strokeColor: '#FF0000', strokeWidth: 2 }} />
                }
            </GoogleMap>
        )
    }
}

export default withScriptjs(withGoogleMap(MapContainer));