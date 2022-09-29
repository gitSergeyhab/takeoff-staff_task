import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { ContactType } from '../../types/types';
import { getUserFromStorage } from '../../utils/storage-utils';

const BASE_URL = 'http://localhost:5000/api/contacts';

const TagType = {
  Contacts: 'Contacts',
};


const AUTH_TOKEN = 'auth-token';


export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  tagTypes: [TagType.Contacts],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const user = getUserFromStorage();
      const token = user?.token || '';
      headers.set(AUTH_TOKEN, token);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getContacts: build.query<ContactType[], unknown>({
      query: (search) => `?q=${search}`,
      // providesTags: (result) => result ?
      //   [ ...result.map(({ id }) => ({ type: TagType.Contacts, id } as const)), { type: TagType.Contacts, id: 'LIST' } ] :
      //   [ { type: TagType.Contacts, id: 'LIST' } ],
    }),

    postContact: build.mutation({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
      // invalidatesTags: [{type: TagType.Comments, id: 'LIST'}, {type: TagType.Films, id: 'LIST'}],
    }),

    deleteContact: build.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
        // responseHandler: (response) => response.text(),
      }),
      // invalidatesTags: (_, error) => {
      //   if (error?.status && error.status === 404) {
      //     return [];
      //   }
      //   return [{type: TagType.Comments, id: 'LIST'}, {type: TagType.Films, id: 'LIST'}];
      // },
    }),

    putContact: build.mutation({
      query: ({body, id}) => ({
        url: `/${id}`,
        method: 'PUT',
        body,
      }),
      // invalidatesTags: [{type: TagType.Films, id: 'LIST'}],
    }),
  })
});

export const { useGetContactsQuery, usePostContactMutation, useDeleteContactMutation, usePutContactMutation } = contactsApi;
