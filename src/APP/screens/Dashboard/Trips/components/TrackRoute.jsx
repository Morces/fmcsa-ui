import React, { useRef, useEffect } from "react";
import Map, { Source, Layer, Marker } from "react-map-gl/maplibre";
import BasicModal from "@/components/modals/BasicModal";

const TrackRoute = ({ showTrack, setShowTrack, trip }) => {
  const mapRef = useRef(null);

  // Prepare GeoJSON for the route
  const routeGeoJson = {
    type: "Feature",
    geometry: trip?.route_data?.geometry || {}, // geometry is already GeoJSON-like
  };

  // Compute bounding box to fit the entire route
  useEffect(() => {
    if (!mapRef.current || !trip?.route_data?.geometry?.coordinates) return;
    const coords = trip?.route_data?.geometry?.coordinates;
    const lats = coords.map((c) => c[1]);
    const lngs = coords.map((c) => c[0]);

    const bounds = [
      [Math.min(...lngs), Math.min(...lats)],
      [Math.max(...lngs), Math.max(...lats)],
    ];
    mapRef.current.fitBounds(bounds, { padding: 50 });
  }, [trip]);

  return (
    <BasicModal
      isOpen={showTrack}
      onClose={() => setShowTrack(false)}
      className="w-[650px] max-md:w-full"
      title="View Track"
    >
      <div className="h-[550px] w-full rounded-lg overflow-hidden border">
        <Map
          ref={mapRef}
          initialViewState={{
            longitude: trip?.pickup_location?.lng,
            latitude: trip?.pickup_location?.lat,
            zoom: 6,
          }}
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        >
          {/* Draw the route polyline */}
          <Source id="route" type="geojson" data={routeGeoJson}>
            <Layer
              id="route-layer"
              type="line"
              paint={{
                "line-color": "#3b82f6", // blue
                "line-width": 4,
                "line-opacity": 0.8,
              }}
            />
          </Source>

          {/* Pickup Marker */}
          <Marker
            longitude={trip?.pickup_location?.lng}
            latitude={trip?.pickup_location?.lat}
            anchor="bottom"
          >
            <div className="bg-green-600 text-white text-xs px-2 py-1 rounded shadow">
              Pickup
            </div>
          </Marker>

          {/* Dropoff Marker */}
          <Marker
            longitude={trip?.dropoff_location?.lng}
            latitude={trip?.dropoff_location?.lat}
            anchor="bottom"
          >
            <div className="bg-red-600 text-white text-xs px-2 py-1 rounded shadow">
              Dropoff
            </div>
          </Marker>
        </Map>
      </div>
    </BasicModal>
  );
};

export default TrackRoute;
