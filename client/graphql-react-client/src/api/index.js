import { gql } from '@apollo/client';

const COMPANY_LIST = gql`
  query getCompanies($offset: Int, $limit: Int){
    companies(offset:$offset, limit:$limit) {
      data {
        id
        name
        users{
          id
          name
        }
      }
      total
    }
  }
`;

const ADD_COMPANY = gql`
  mutation addCompany($name: String!, $userIds: [String]) {
    addCompany(name: $name, userIds: $userIds) {
      id
      name
      users{
        id
        name
      }
    }
  }
`;

const DELETE_COMPANY = gql`
  mutation deleteCompany($id: String!) {
    deleteCompany(id: $id) {
      id
      name
    }
  }
`;

const UPDATE_COMPANY = gql`
  mutation updateCompany($id: String!,$name: String!, $userIds: [String]) {
    updateCompany(id: $id, name: $name, userIds: $userIds) {
      id
      name
      users{
        id
        name
      }
    }
  }
`;

const USER_LIST = gql`
  query getUsers($offset: Int, $limit: Int){
    users(offset:$offset, limit:$limit) {
      data {
        id
        name
        company{
          name
        }
      }
      total
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
  ADD_COMPANY,
  DELETE_COMPANY,
  UPDATE_COMPANY,
  USER_LIST,
  DELETE_USER,
  ADD_USER,
  UPDATE_USER
}