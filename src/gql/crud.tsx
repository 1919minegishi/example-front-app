import {gql} from "@apollo/client";

export const GET_ALL_TWEETS = gql`
    query GetAllTweets {
        tweets {
            id
            content
        }
    }
`;


export const CREATE_TWEET = gql`
    mutation CreateTweet($input: String!) {
        createTweet(content: $input) {
            id
            content
        }
    }
`;

export const UPDATE_TWEET = gql`
    mutation UpdateTweet($id: ID!, $content: String!) {
        updateTweet(id: $id, content: $content) {
            id
            content
        }
    }
`;

export const DELETE_TWEET = gql`
    mutation DeleteTweet($id: ID!) {
        deleteTweet(id: $id) {
            id
            content
        }
    }
`;