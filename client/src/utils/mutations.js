import gql from 'graphql-tag';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
  }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($bookData: SaveBookInput!) {
        saveBook(bookData: $bookData) {
            _id
            username
            email
            savedBooks {
                _id
                bookId
                title
                authors
                description
                image
                link
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation deleteBook($bookId: String!) {
        deleteBook(bookId: $bookId) {
            user  {
                _id
                username
                bookCount
                savedBooks
            }
        }
    }
`;