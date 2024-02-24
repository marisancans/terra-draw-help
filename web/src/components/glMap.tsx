import React, { memo } from "react";

import "maplibre-gl/dist/maplibre-gl.css";

import Map, {
  NavigationControl,
} from "react-map-gl/maplibre";

const GlMap = memo(({ children }) => {
  console.log("MAP RENDER");

  const mapStyle = {
    version: 8,
    sources: {
      osm: {
        type: "raster",
        tiles: [
          "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png",
        ],
        tileSize: 256,
        attribution: "&copy; OpenStreetMap Contributors",
        maxzoom: 19,
      },
    },
    layers: [
      {
        id: "osm",
        type: "raster",
        source: "osm",
      },
    ],
  };

  return (
    <Map
      initialViewState={{
        latitude: 56.948719,
        longitude: 24.108638,
        zoom: 10,
      }}
      mapStyle={mapStyle}
      attributionControl={false}
    >
      {children}
      <NavigationControl showCompass={false} position={"bottom-right"} />
    </Map>
  );
});

export default GlMap;
