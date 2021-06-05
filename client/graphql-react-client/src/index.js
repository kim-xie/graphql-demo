import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { offsetLimitPagination } from "@apollo/client/utilities";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(
    {
      typePolicies: {
        Query: {
          fields: {
            users: {
              data: {
                ...offsetLimitPagination()
                // read(existing, {
                //   args: {
                //     // Default to returning the entire cached list,
                //     // if offset and limit are not provided.
                //     offset = 0,
                //     limit = existing?.length,
                //   } = {},
                // }) {
                //   console.log('read users',offset,limit, existing)
                //   // A read function should always return undefined if existing is
                //   // undefined. Returning undefined signals that the field is
                //   // missing from the cache, which instructs Apollo Client to
                //   // fetch its value from your GraphQL server.
                //   return existing && existing.slice(offset, offset + limit);
                // },
      
                // // The keyArgs list and merge function are the same as above.
                // keyArgs: [],
  
                // merge(existing, incoming, { args: { offset = 0 }}) {
                //   console.log('merge users',offset,incoming, existing)
                //   const merged = existing ? existing.slice(0) : [];
                //   for (let i = 0; i < incoming.length; ++i) {
                //     merged[offset + i] = incoming[i];
                //   }
                //   console.log('merged',merged)
                //   return merged;
                // },
              }
            },
          },
        },
      },
    }
  )
});

console.log('client',client)
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
