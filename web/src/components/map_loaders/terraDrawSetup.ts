
import {
    TerraDraw,
    TerraDrawMapLibreGLAdapter,
    TerraDrawSelectMode,
    TerraDrawPolygonMode,
    TerraDrawRenderMode
} from "terra-draw";

import { MapLibreGL as lib } from "maplibre-gl";

const setupDraw = (map) => {
    return new TerraDraw({
        adapter: new TerraDrawMapLibreGLAdapter({
            lib,
            map,
            coordinatePrecision: 9,
        }),
        modes: [
            new TerraDrawSelectMode({
                flags: {
                    arbitary: {
                        feature: {},
                    },
                    polygon: {
                        feature: {
                            scaleable: true,
                            rotateable: true,
                            draggable: true,
                            coordinates: {
                                midpoints: true,
                                draggable: true,
                                deletable: true,
                            },
                        },
                    },
                },
            }),
            new TerraDrawPolygonMode({
                // snapping: true,
                allowSelfIntersections: false,
                pointerDistance: 30,
            }),
            new TerraDrawRenderMode({
                modeName: 'arbitary',
                styles: {
                    polygonFillColor: "#4357AD",
                    polygonOutlineColor: "#48A9A6",
                    polygonOutlineWidth: 2,
                },
            }),
        ],
    });
}
export default setupDraw;