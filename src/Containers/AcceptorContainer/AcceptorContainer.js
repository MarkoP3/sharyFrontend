import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import foodBasket from "../../Assets/img/foodBasket.svg";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
import StationServices from "../../Services/StationServices/StationServices";
import { useLocation } from "react-router";

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 46,
  lng: 19,
};

export default function AcceptorContainer() {
  const [userLocation, setuserLocation] = useState(null);
  useEffect(() => {
    StationServices.getStations().then(({ data }) => {
      setMarkers(data);
      console.log(`data`, data);
    });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setuserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.log(`error`, error);
      }
    );
  }, []);
  useEffect(() => {
    if (mapRef.current != undefined) mapRef.current.panTo(userLocation);
  }, [userLocation]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        <Marker position={userLocation}></Marker>
        {markers.map((marker) => (
          <Marker
            position={{ lat: marker.latitude, lng: marker.longitude }}
            onClick={() => {
              setSelected(marker);
            }}
            icon={{
              url: foodBasket,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.latitude, lng: selected.longitude }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div align="center">
              <span role="img" aria-label="bear">
                &#127970;
              </span>{" "}
              <br></br>
              {selected.name}
              <br></br>
              {selected.street} {selected.streetNumber} {selected.city} ,{" "}
              {selected.country}
              <p>Meals: {selected.receivedMeals - selected.sharedMeals}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}
