import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
    width: '50%',
    height: '66%',
    position: 'absolute',
    left: '1%'
};

const LocationsMap = (props) => {
    return (
        <div>
            <Map
                google={props.google}
                zoom={10}
                style={mapStyles}
                initialCenter={{ lat: 28.60, lng: 77.20 }}
            >
                <Marker position={{ lat: 28.60, lng: 77.20 }} />
            </Map>
        </div>
    )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyA2Jy9DUAS5xATcH4MpZZCs5EgCuFvnfv4'
})(LocationsMap);