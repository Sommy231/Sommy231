import React, { useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents
} from "react-leaflet";

import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

const LocationMarker = ({
  position,
  setPosition
}) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    }
  });

  return position ? (
    <Marker position={position} />
  ) : null;
};

const LocationPicker = ({
  setLocationData
}) => {
  const [position, setPosition] =
    useState(null);

  const handlePositionChange = (
    newPosition
  ) => {
    setPosition(newPosition);

    setLocationData({
      lat: newPosition.lat,
      lng: newPosition.lng
    });
  };

  return (
    <div>
      <h3>Select Violation Location</h3>

      <MapContainer
        center={[4.8156, 7.0498]}
        zoom={13}
        style={{
          height: "300px",
          width: "100%",
          borderRadius: "10px"
        }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker
          position={position}
          setPosition={
            handlePositionChange
          }
        />
      </MapContainer>

      {position && (
        <div className="coordinates">
          <p>
            Latitude:{" "}
            {position.lat}
          </p>

          <p>
            Longitude:{" "}
            {position.lng}
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;