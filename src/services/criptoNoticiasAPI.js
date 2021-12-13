import  {createApi, fetchBaseQuery}  from '@reduxjs/toolkit/query/react';

const criptoNoticiasHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '057e736303msh2ea64eec87f662fp1da44cjsn5baf4dda8b3d'
  }

  const baseUrl = 'https://bing-news-search1.p.rapidapi.com';


  const createRequest = (url) => ({ url, headers: criptoNoticiasHeaders });

  export const criptoNoticiasApi = createApi({
    reducerPath: 'criptoNoticiasApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCriptoNoticias: builder.query({
            query: ({categoriaNoticia, count}) => createRequest(`/news/search?q=${categoriaNoticia}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        }),
    }),
        
})

export const { useGetCriptoNoticiasQuery } = criptoNoticiasApi;