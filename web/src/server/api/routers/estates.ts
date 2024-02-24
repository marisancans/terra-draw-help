import {
    createTRPCRouter,
    publicProcedure
} from "~/server/api/trpc";

import { z } from "zod";

export const estatesRouter = createTRPCRouter({
    listEstates: publicProcedure.input(z.object({})).query(async ({ input, ctx }) => {
        const results = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            name: `Estate ${i}`,
            location: {
                coordinates: [Math.random() * 0.1 + 24.10863, Math.random() * 0.1 + 56.94871],
            }
        }));

        const totalPages = 10;

        const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        await wait(500);

        const geoJson = [
            {
                "type": "Feature",
                "id": "ff4e298f-f787-40a1-9c04-88e6e5d700e0",
                "properties": {
                    "mode": "polygon",
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                24.108638,
                                56.948719
                            ],
                            [
                                26.109638,
                                56.948719
                            ],
                            [
                                26.109638,
                                57.949719
                            ],
                            [
                                26.108638,
                                57.949719
                            ],
                            [
                                24.108638,
                                56.948719
                            ]
                        ]
                    ]
                }
            },
            {
                "type": "Feature",
                "id": "ba865f56-c8b4-40f9-8378-7bcb41317c7e",
                "properties": {
                    "mode": "polygon",
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                24.108638,
                                56.948719
                            ],
                            [
                                26.109638,
                                56.948719
                            ],
                            [
                                26.109638,
                                57.949719
                            ],
                            [
                                26.108638,
                                57.949719
                            ],
                            [
                                24.108638,
                                56.948719
                            ]
                        ]
                    ]
                }
            },
            {
                "type": "Feature",
                "id": "da8fb854-80fe-4af1-b64b-7425102cefec",
                "properties": {
                    "mode": "polygon",
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                24.108638,
                                56.948719
                            ],
                            [
                                26.109638,
                                56.948719
                            ],
                            [
                                26.109638,
                                57.949719
                            ],
                            [
                                26.108638,
                                57.949719
                            ],
                            [
                                24.108638,
                                56.948719
                            ]
                        ]
                    ]
                }
            },
            {
                "type": "Feature",
                "id": "9a24af3f-96cf-4796-a1c0-7bc4de61d3a7",
                "properties": {
                    "mode": "polygon",
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                24.262538267,
                                57.131492009
                            ],
                            [
                                23.58056599,
                                56.797844783
                            ],
                            [
                                23.956525066,
                                56.470862152
                            ],
                            [
                                24.734672921,
                                56.69236629
                            ],
                            [
                                24.262538267,
                                57.131492009
                            ]
                        ]
                    ]
                }
            },
            {
                "type": "Feature",
                "id": "6b5517f4-654a-43c2-b46d-0990c6980008",
                "properties": {
                    "mode": "polygon",
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                24.216688556,
                                57.163929141
                            ],
                            [
                                23.551547898,
                                56.842932612
                            ],
                            [
                                23.351464936,
                                57.008194193
                            ],
                            [
                                24.216688556,
                                57.163929141
                            ]
                        ]
                    ]
                }
            },
            {
                "type": "Feature",
                "id": "9f300a1a-00c0-461d-840a-4f013ab1576d",
                "properties": {
                    "mode": "polygon",
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                25.042794976,
                                56.726431139
                            ],
                            [
                                24.41830796,
                                57.385171345
                            ],
                            [
                                24.944983757,
                                57.708164011
                            ],
                            [
                                25.908048072,
                                56.598247923
                            ],
                            [
                                25.042794976,
                                56.726431139
                            ]
                        ]
                    ]
                }
            }
        ]

        return { results, totalPages, geoJson };
    }),
});