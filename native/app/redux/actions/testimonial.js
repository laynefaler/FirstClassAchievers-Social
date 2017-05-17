import axios from 'axios'
import actionTypes from '../store/actionTypes'


export function getTestimonials() {
	return function(dispatch) {
		dispatch({type: actionTypes.GET_TESTIMONIAL_PENDING})
		axios.get(`http://localhost:3214/api/testify`)
			.then((response) => {
					dispatch({
						type: actionTypes.GET_TESTIMONIAL_SUCCESS,
						payload: response.data
					})
				})
				.catch((err) => {
					dispatch({
						type: actionTypes.GET_TESTIMONIAL_ERROR,
						payload: err
					})
				})			
	}
}

export function createTestimonials(data) {
	return function(dispatch) {
		dispatch({type: actionTypes.CREATE_TESTIMONIAL_PENDING})
		axios.post(`http://localhost:3214/api/testify`, data)
			.then((response) => {
					dispatch({
						type: actionTypes.CREATE_TESTIMONIAL_SUCCESS,
						payload: response.data
					})
				})
				.catch((err) => {
					dispatch({
						type: actionTypes.CREATE_TESTIMONIAL_ERROR,
						payload: err
					})
				})			
	}
}

export function likeTestimonial(data, id) {
	return function(dispatch) {
		dispatch({type: actionTypes.UPDATE_TESTIMONIAL_PENDING})
		axios.patch(`http://localhost:3214/api/like/testify/${id}`, data)
			.then((response) => {
					dispatch({
						type: actionTypes.UPDATE_TESTIMONIAL_SUCCESS,
						payload: response.data
					})
				})
				.catch((err) => {
					dispatch({
						type: actionTypes.UPDATE_TESTIMONIAL_ERROR,
						payload: err
					})
				})			
	}
}