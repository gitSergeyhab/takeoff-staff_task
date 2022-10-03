import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { AUTH_TOKEN } from '../../const';
import { ContactType } from '../../types/types';
import { getUserFromStorage } from '../../utils/storage-utils';


const BASE_URL = 'http://localhost:5000/api/contacts';

const TagType = {
  Contacts: 'Contacts',
};


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
    getContacts: build.query<ContactType[], string>({
      query: (search) => `?q=${search}`,
      providesTags: (result) => result ?
        [ ...result.map(({ id }) => ({ type: TagType.Contacts, id } as const)), { type: TagType.Contacts, id: 'LIST' } ] :
        [ { type: TagType.Contacts, id: 'LIST' } ],
    }),

    postContact: build.mutation({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{type: TagType.Contacts, id: 'LIST'}],
    }),

    deleteContact: build.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{type: TagType.Contacts, id: 'LIST'}],
    }),

    putContact: build.mutation({
      query: ({body, id}) => ({
        url: `/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{type: TagType.Contacts, id: 'LIST'}],
    }),
  })
});

export const { useGetContactsQuery, usePostContactMutation, useDeleteContactMutation, usePutContactMutation } = contactsApi;
