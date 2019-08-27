import { gql } from "apollo-boost";

const getItemsQuery = gql`
  {
    items {
      name
      brand
      price
      store
      type
      id
    }
  }
`;

const getStoresQuery = gql`
  {
    stores {
      name
      address
      telephone
      url
      id
      items {
        name
        brand
      }
    }
  }
`;

const getStoreQuery = gql`
  query($id: ID) {
    store(id: $id) {
      id
      name
      address
      telephone
      url
      items {
        id
        name
        brand
        price
        type {
          name
        }
        reviews {
          id
          author
          description
          approved
        }
      }
    }
  }
`;

const getItemQuery = gql`
  query($name: String) {
    itemName(name: $name) {
      id
      name
      brand
      price
      store {
        name
        address
      }
      reviews {
        author
        description
      }
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

export {
  getItemsQuery,
  getStoresQuery,
  addBookMutation,
  getStoreQuery,
  getItemQuery
};
