import axios from 'axios'
const baseURL = '/api/persons';

const create = (person) => {
  return axios.post(baseURL, person)
}

const readAll = () => {
  return axios.get(baseURL)
}

const update = (person) => {
  return axios.put(`${baseURL}/${person.id}`, person)
}

const deleteById = (id) => {
  return axios.delete(`${baseURL}/${id}`)
}

const service = { create, readAll, update, deleteById }

export default service