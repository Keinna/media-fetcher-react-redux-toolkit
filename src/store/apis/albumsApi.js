import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
  }),
  endpoints(builder) {
    return {
        removeAlbum: builder.mutation({
            invalidatesTags: (result, error, album) => {
                return [{ type: "Album", id: album.userId }];
            },
            query: (album) => {
                return {
                    url: `/albums/${album.id}`,
                    method: "DELETE",
                };
            },
        }),
        addAlbum: builder.mutation({
            //after run mutation find all queries and mark them as out of date
            invalidatesTags: (result, error, user) => {
                return [{ type: "Album", id: user.id }];
            },
            //function that is used to tell rtq about parameter to use to make request
            query: (user) => {
                return {
                    url: "/albums",
                    method: "POST",
                    body: {
                        userId: user.id,
                        title: faker.commerce.productName(),
                    },
                };
            },
        }),
        fetchAlbums: builder.query({
            //user is argument that is past to the hook
            providesTags: (result, error, user) => {
                //dynamically generated tag
                return [{ type: "Album", id: user.id }];
            },
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

//automatically generated hooks
export const {
    useFetchAlbumsQuery,
    useAddAlbumMutation,
    useRemoveAlbumMutation,
} = albumsApi;
export { albumsApi };
