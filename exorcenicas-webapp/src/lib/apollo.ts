import { ApolloClient, DefaultOptions, InMemoryCache } from "@apollo/client";

const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }


export const client  = new ApolloClient({
    uri: import.meta.env.VITE_API_GRAPH_CMS_URL,
    headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_API_GRAPH_CMS_ACCESS_TOKEN}`
    },
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
});