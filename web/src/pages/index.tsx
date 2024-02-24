"use client";

import { api } from "~/utils/api";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { PageContext } from "~/components/explore/pageContext";
import { useRouter } from "next/router";

import { useContext } from "react";
import { ExplorePageContext } from "~/components/explore/pageContext";

import Markers from "~/components/clusterMarkers";

import { FeatureCollection } from "geojson";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/ui/resizable";

import GlMap from "~/components/glMap";

import TerraDrawing from "~/components/map_loaders/draw";

import { ScrollArea, ScrollBar } from "~/ui/scroll-area";

const useRouterReady = () => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsReady(router.isReady);
  }, [router.isReady]);

  return isReady;
};

const DataTable = () => {
  const { setEstates, estates, currentEstate } = useContext(ExplorePageContext);
  const [geoJson, setGeoJson] = useState<FeatureCollection[]>([]);

  const pathname = usePathname();

  const { data, isFetching, refetch } = api.estates.listEstates.useQuery(
    {},
    {
      enabled: !!pathname,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      //   refetchOnReconnect: false,
      //   refetchInterval: false,
      //   refetchIntervalInBackground: false,
    }
  );

  useEffect(() => {
    if (data?.results) {
      setEstates(data.results);
      setGeoJson(data.geoJson);
    }
  }, [data]);

  const drawings = useMemo(() => {
    return <TerraDrawing geoJson={geoJson} />;
  }, [geoJson]);

  const markers = useMemo(() => {
    return <Markers items={estates} />;
  }, [estates]);

  return (
    <div className="h-screen">
      <div className="h-screen">
        <div className="flex h-full">
          <div className="w-1/4">
            <div className="p-4">
              <h1 className="text-2xl font-bold">Estate List</h1>
              <ul>
                {estates.map((estate) => (
                  <li key={estate.id}>{estate.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-3/4">
            <GlMap>
              {drawings}
              {markers}
            </GlMap>
          </div>
        </div>
      </div>
    </div>
  );
};

const Explore = () => {
  console.log("RENDERING EXPLORE");

  return (
    <PageContext>
      <DataTable />
    </PageContext>
  );
};

export default Explore;
