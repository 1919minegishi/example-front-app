import React, {cache} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";
import {ApolloProvider} from "@apollo/client/react";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

try {
    const client = new ApolloClient({
        link: new HttpLink({
            uri: "http://127.0.0.1:8080/graphql", // Your GraphQL server URI
        }),
        cache: new InMemoryCache()
    });
    console.log("Apollo Client initialized successfully");

    root.render(
        <React.StrictMode>
            <ApolloProvider client={client}>
                <App />
             </ApolloProvider>
        </React.StrictMode>
    );

} catch (error) {
    console.error("Error initializing Apollo Client:", error);
}


// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
