// import gql function
import gql from 'graphql-tag';

export const GET_ME = gql`
    {
        me {
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