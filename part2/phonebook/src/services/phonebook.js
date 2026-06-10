import axios from "axios";

const baseURL = 'http://localhost:3001/api/persons'

const getEntirePhonebook = () => {
	return axios
		.get(baseURL)
		.then(response => response.data)
}

const createPerson = (person) => {
	return axios
		.post(baseURL, person)
		.then(response => response.data)
}

const deletePerson = (id) => {
	return axios
		.delete(`${baseURL}/${id}`)
		.then(response => response.data)
}

const updatePerson = (id, updatedPerson) => {
	return axios
		.put(`${baseURL}/${id}`, updatedPerson)
		.then(response => response.data)
}

export default { getEntirePhonebook, createPerson, deletePerson, updatePerson }