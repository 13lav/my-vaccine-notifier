import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    map: {
        height: '100%'
    }
}));

const NewMap = (props) => {
    const classes = useStyles();

    const position = [28.505, 72.09]

    return (
        <MapContainer center={[28.675, 77.2]} zoom={12} scrollWheelZoom={false} className={classes.map}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[28.675, 77.2]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default NewMap