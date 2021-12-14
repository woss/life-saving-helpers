import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
// import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = createHttpLink({
  uri: 'https://gitlab.com/api/graphql',
});

// const wsLink = new WebSocketLink({
//   uri: 'https://gitlab.com/api/graphql',
//   options: {
//     reconnect: true
//   }
// });

const authLink = setContext(() => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      "PRIVATE-TOKEN": "xxP6otKyJoUxFkAXhs_6",
    },
  }
});


export const client = new ApolloClient({
  // link: authLink.concat(httpLink, wsLink),
  link: authLink.concat(httpLink,),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
