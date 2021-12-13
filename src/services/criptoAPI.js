import  {createApi, fetchBaseQuery}  from '@reduxjs/toolkit/query/react';

const criptoApiHeaders = {
    'x-rapidapi-key': '057e736303msh2ea64eec87f662fp1da44cjsn5baf4dda8b3d',
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
}
const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: criptoApiHeaders });

export const criptoApi = createApi({
    reducerPath: 'criptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCriptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
        getDetalhesCripto: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getHistoricoCripto: builder.query({
            query: ({coinId, timePeriod}) => createRequest(`/coin/${coinId}/history/${timePeriod}`)
        })
    }),
})

export const { useGetCriptosQuery, useGetDetalhesCriptoQuery, useGetHistoricoCriptoQuery} = criptoApi;

