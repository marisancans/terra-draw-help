import Map, { useMap, Marker } from "react-map-gl"; // react-map-gl/maplibre if you use maplibre instead
import {
  useSupercluster,
  PointFeature,
  PointFeatureProperties,
  PointClusterProperties,
} from "react-map-gl-supercluster"; // or react-map-gl-supercluster/maplibre if you use maplibre instead
import { ReactElement, useMemo } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover";

import Image from "next/image";

import { ScrollArea } from "~/ui/scroll-area";

import { useContext } from "react";
import { ExplorePageContext } from "~/components/explore/pageContext";

type Item = {};
type ItemPointFeatureProperties = PointFeatureProperties<{ item: Item }>;
type ItemPointClusterProperties = PointClusterProperties<{ items: Item[] }>;

// It creates cluster properties from feature properties.
function mapFeature(
  props: ItemPointFeatureProperties
): ItemPointClusterProperties {
  return { items: [props.item] };
}

// It merges clusters properties. Yes, it's simply mutates.
function reduceCluster(
  memo: ItemPointClusterProperties,
  props: ItemPointClusterProperties
): void {
  memo.items = memo.items.concat(props.items);
}

function createPoints(
  items: Item[]
): Array<PointFeature<ItemPointFeatureProperties>> {
  return items.map(createPoint);
}

function createPoint(item: Item): PointFeature<ItemPointFeatureProperties> {
  const coordinates = item.location.coordinates;

  return {
    type: "Feature",
    properties: { cluster: false, item },
    geometry: {
      type: "Point",
      coordinates,
    },
  };
}

type MarkersProps = {
  items: Item[];
};

function Markers(props: MarkersProps): ReactElement {
  const { setCurrentEstate, currentEstate } = useContext(ExplorePageContext);

  const { items } = props;

  const mapRef = useMap().current;

  // Points should be memoized
  const points = useMemo(() => createPoints(items), [items]);

  const { supercluster, clusters } = useSupercluster(points, {
    mapRef,
    map: mapFeature,
    reduce: reduceCluster,
  });

  const renderMarkers = (cluster, index, longitude, latitude) => {
    const estate = cluster.properties.item;
    var imgSrc = "/location-purple.png";

    if (estate.id == currentEstate?.id) imgSrc = "/location-cyan.png";

    return (
      <Marker
        key={`item-${index}`}
        longitude={longitude}
        latitude={latitude}
        offset={[0, -21]}
      >
        <Popover>
          <PopoverTrigger>
            <Image
              alt="Location marker"
              src={imgSrc}
              width={42}
              height={42}
              onClick={() => setCurrentEstate(estate)}
            />
          </PopoverTrigger>
          <PopoverContent>
            <ScrollArea className="max-h-[70vh] overflow-y-auto">
              <div className="h-[200]">Content</div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </Marker>
    );
  };

  return (
    <>
      {clusters.map((cluster, index) => {
        const [longitude, latitude] = cluster.geometry.coordinates;

        const isCluster = cluster.properties.cluster;
        var clusterColor = "bg-purple-500";

        if (isCluster) {
          const estates = cluster.properties.items;
          const ids = estates.map((estate) => estate.id);

          if (ids.includes(currentEstate?.id)) clusterColor = "bg-cyan-400";
        }

        return isCluster ? (
          <Marker
            key={`item-${index}`}
            longitude={longitude}
            latitude={latitude}
            //   onClick={() => expandCluster(cluster.properties.cluster_id, { longitude, latitude })}
          >
            <div
              className={`${clusterColor} flex h-8 w-8 items-center justify-center rounded-full text-lg text-white`}
            >
              {cluster.properties.point_count_abbreviated}
            </div>
          </Marker>
        ) : (
          renderMarkers(cluster, index, longitude, latitude)
        );
      })}
    </>
  );
}

export default Markers;
