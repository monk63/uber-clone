import { Stylesheet, View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import tw from "tailwind-react-native-classnames";
import { useDispatch, useSelector } from "react-redux";
import { selectDestination, selectOrigin } from "../slices/navSlice";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useRef } from "react";
import { GOOGLE_MAPS_APIKEY} from "@env";


const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destination) return;

    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'],
    {edgePadding: {top:50, right:50,botton:50, left: 50},
});
  },
  [origin, destionation]);

  useEffect(( ) => {
    if (!origin || !destination) return;

    const getTravelTime = async() => {
        fetch( `https://maps.googleapis.com/maps/api/distancematrix/json?
        units=imperial&origins=$origin.description}$&destinations=$
        {destination.description}&key=${GOOGLE_MAPS_API_KEY}`
        ).then((res) => res.json())
        .then((data) => {
            dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        });
    };
    getTravelTime();
  },[origin, destination, GOOGLE_MAPS_APIKEY])



  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origMapViewDirectionsin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.loaction.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}
      {destionation?.location && (
        <Marker
        coordinate={{
            latitude: destionation.location.lat,
            longtitude: destionation.location.lng,
        }}
        title="Destination"
        description={destination.description}
        identifier="destionation"

        />
      )}
    </MapView>
  );
};

export default Map;

const style = Stylesheet.create({});
