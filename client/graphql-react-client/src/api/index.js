import { gql } from '@apollo/client';

const COMPANY_LIST = gql`
  query {
    companies {
      id
      name
    }
  }
`;

const USER_LIST = gql`
  query {
    users {
      id
      name
      company {
        id
        name
      }
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id) {
      id
      name
    }
  }
`;

const ADD_USER = gql`
  mutation addUser($name: String!, $companyId: String!) {
    addUser(name: $name, companyId: $companyId) {
      id
      name
      company{
        name
      }
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($id: String!,$name: String!, $companyId: String!) {
    updateUser(id: $id, name: $name, companyId: $companyId) {
      id
      name
      company{
        id
        name
      }
    }
  }
`;

export {
  COMPANY_LIST,
  USER_LIST,
  DELETE_USER,
  ADD_USER,
  UPDATE_USER
}