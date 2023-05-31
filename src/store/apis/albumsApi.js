import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//automatically created slice
const albumsApi = createApi({
    // what key for in store
    reducerPath: "albums",
    //gives preconfigured version of fetch
    baseQuery: fetchBaseQuery({
        //provide base url
        baseUrl: "http://localhost:3005",
    }),
    //how to make each request
    endpoints(builder) {
        return {
            //used as a template for hook albumsApi.fetchAlbumsQuery
            fetchAlbums: builder.query({
                query: (user) => {
                    return {
                        url: "/albums",
                        params: {
                            userId: user.id,
                        },
                        method: "GET",
                    };
                },
            }),
        };
    },
});