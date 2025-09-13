import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import useAxios from "@/hooks/use-axios";
import Map, { Marker, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const AddTrip = () => {
  const request = useAxios();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [trucks, setTrucks] = useState([]);

  const [driver_id, setDriverId] = useState("");
  const [truck_id, setTruckId] = useState("");
  const [start_date, setStartDate] = useState("");

  // Map State
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: -98.5795, // center US
    latitude: 39.8283,
    zoom: 3,
  });

  // Fetch drivers and trucks
  useEffect(() => {
    const fetchData = async () => {
      const d = await request({
        url: "drivers/",
        method: "GET",
        show_loading: false,
      });
      const t = await request({
        url: "trucks/",
        method: "GET",
        show_loading: false,
      });
      if (!d?.error) setDrivers(d);
      if (!t?.error) setTrucks(t);
    };
    fetchData();
  }, []);

  const reverseGeocode = async (longitude, latitude) => {
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_TOKEN}`
    );
    const data = await res.json();
    // You can pick different features like place_name, context, etc.
    return data.features?.[0]?.place_name || "Unknown location";
  };

  const handleMapClick = async (event, type) => {
    const { lngLat } = event;
    const coords = { longitude: lngLat.lng, latitude: lngLat.lat };

    const placeName = await reverseGeocode(coords.longitude, coords.latitude);

    if (type === "origin") {
      setOrigin({ ...coords, name: placeName });
    } else {
      setDestination({ ...coords, name: placeName });
    }
  };

  const handleSubmit = async () => {
    if (!origin || !destination) {
      toast.error("Please select both Origin and Destination on the map");
      return;
    }

    setLoading(true);

    const body = {
      driver_id,
      truck_id,
      start_date,
      pickup_location: {
        lat: origin.latitude,
        lng: origin.longitude,
        name: origin?.name,
      },
      dropoff_location: {
        lat: destination.latitude,
        lng: destination.longitude,
        name: destination?.name,
      },
    };

    const res = await request({
      method: "POST",
      url: "trips/",
      body,
      show_success: true,
      success_message: "Trip created successfully!",
      show_error: true,
    });

    if (res?.error) {
      setLoading(false);
      setOrigin(null);
      setDestination(null);
      return;
    }

    setLoading(false);

    setOrigin(null);
    setDestination(null);
    navigate("/dashboard/trips");
  };

  return (
    <div className="flex justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Add New Trip</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4 max-md:flex-col w-full">
                {/* Driver */}
                <div className="space-y-2 w-full">
                  <Label htmlFor="driver">Driver</Label>
                  <Select
                    value={driver_id}
                    onValueChange={(value) => setDriverId(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select A Driver" />
                    </SelectTrigger>

                    <SelectContent>
                      {drivers.map((d) => (
                        <SelectItem key={d.id} value={d.id}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Truck */}
                <div className="space-y-2 w-full">
                  <Label htmlFor="truck">Truck</Label>
                  <Select
                    value={truck_id}
                    onValueChange={(value) => setTruckId(value)}
                    className="w-full border rounded p-2 bg-background"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select A truck" />
                    </SelectTrigger>

                    <SelectContent>
                      {trucks.map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.plate_number}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Dates */}

              <div className="space-y-2 w-full">
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                  type="date"
                  name="start_date"
                  value={start_date}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border rounded p-2 w-full"
                  required
                />
              </div>

              {/* Map */}
              <div className="space-y-2">
                <Label>Select Origin & Destination on Map</Label>
                <div className="h-[400px] rounded overflow-hidden border">
                  <Map
                    {...viewState}
                    onMove={(evt) => setViewState(evt.viewState)}
                    style={{ width: "100%", height: "100%" }}
                    mapStyle="https://demotiles.maplibre.org/style.json"
                    onClick={(e) => {
                      if (!origin) handleMapClick(e, "origin");
                      else handleMapClick(e, "destination");
                    }}
                  >
                    <NavigationControl position="top-left" />
                    {origin && (
                      <Marker
                        longitude={origin.longitude}
                        latitude={origin.latitude}
                        color="green"
                      />
                    )}
                    {destination && (
                      <Marker
                        longitude={destination.longitude}
                        latitude={destination.latitude}
                        color="red"
                      />
                    )}
                  </Map>
                </div>

                {origin || destination ? (
                  <Button
                    onClick={() => {
                      setOrigin(null);
                      setDestination(null);
                    }}
                  >
                    Clear selection
                  </Button>
                ) : null}

                <p className="text-sm text-muted-foreground">
                  {origin
                    ? destination
                      ? "Both points selected!"
                      : "Now click to set Destination"
                    : "Click the map to set Origin"}
                </p>

                <p className="">
                  <span className="underline">Origin:</span> <br /> Coordinates
                  -{" "}
                  <span className="text-sky-900">
                    Lat-{origin?.latitude}, Lon-{origin?.longitude}
                  </span>{" "}
                  <br />
                  <span>Address : {origin?.name}</span>
                </p>
                <p>
                  <span className="underline">Destination:</span> Coordinates -{" "}
                  <span className="text-sky-900">
                    Lat-{destination?.latitude}, Lon-
                    {destination?.longitude}
                  </span>{" "}
                  <br />
                  <span>Address: {destination?.name}</span>
                </p>
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full mt-4"
                disabled={loading}
              >
                {loading ? "Creating Trip..." : "Create Trip"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AddTrip;
