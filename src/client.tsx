import { ApolloClient, InMemoryCache} from '@apollo/client';
export const client = new ApolloClient({
    uri: 'http://172.27.176.1:8080/v1/graphql',
    cache: new InMemoryCache(),
});