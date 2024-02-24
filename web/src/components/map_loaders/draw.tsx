import setupDraw from "./terraDrawSetup";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useMap } from "react-map-gl/maplibre";
import { TerraDraw } from "terra-draw";
import { GeoJSONStoreFeatures } from "terra-draw/dist/store/store";

import { Switch } from "~/ui/switch";

const TerraDrawing = ({ geoJson }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState<string>("static");

  const [selected, setSelected] = useState<GeoJSONStoreFeatures | undefined>();
  const [features, setFeatures] = useState<GeoJSONStoreFeatures[]>([]);

  const [drawInitialized, setDrawInitialized] = useState(false);
  const [featuresAdded, setFeaturesAdded] = useState(false);

  const { current: map } = useMap();

  const m = map?.getMap();

  const draw = useRef<TerraDraw | null>(null);

  useEffect(() => {
    if (m && !draw.current) {
      console.log("SETUP DRAW");
      const terraDraw = setupDraw(m);
      terraDraw.start();
      terraDraw.setMode("polygon");
      setDrawInitialized(true);
      draw.current = terraDraw;
    }

    // return () => {
    //   if (draw.current) {
    //     draw.current?.stop();
    //   }
    // };
  }, [m]);

  const changeMode = useCallback(
    (newMode: string) => {
      if (draw) {
        const mode = isDrawing ? "polygon" : "select";
        draw.current?.setMode(mode);
      }
    },
    [draw]
  );

  useEffect(() => {
    draw.current?.on("change", () => {
      const snapshot = draw.current?.getSnapshot();
      if (snapshot) {
        setFeatures(snapshot);
        setSelected(snapshot.find((f) => f.properties.selected));
      }
    });
  }, [draw]);

  useEffect(() => {
    if (!featuresAdded && draw.current && geoJson && geoJson.length > 0) {
      draw.current?.addFeatures(geoJson);
      setFeaturesAdded(true);
    }

    // So that the original features are removed when the component is unmounted/the geojson changes
    return () => {
      if (draw.current && draw.current.enabled) {
        draw.current?.removeFeatures(geoJson.map((feature) => feature.id));
      }
    };
  }, [draw, geoJson]);

  return (
    <div className="absolute left-0 z-10 flex items-center space-x-2 rounded bg-black p-2">
      <span className="rounded px-1 text-sm text-white">Edit</span>
      <Switch
        checked={isDrawing}
        onCheckedChange={() => setIsDrawing(!isDrawing)}
        className="text-white focus:outline-none"
      />
      {/* {JSON.stringify(geoJson)} */}
      <span className="rounded px-1 text-sm text-white">Draw</span>
    </div>
  );
};

export default TerraDrawing;
