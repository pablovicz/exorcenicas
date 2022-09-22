import { ApolloClient, InMemoryCache } from "@apollo/client";


export const client  = new ApolloClient({
    uri: import.meta.env.VITE_API_GRAPH_CMS_URL,
    headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_API_GRAPH_CMS_ACCESS_TOKEN}`
    },
    cache: new InMemoryCache()
});