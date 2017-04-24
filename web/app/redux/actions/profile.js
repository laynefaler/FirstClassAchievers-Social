import axios from 'axios'
import actionTypes from '../store/actionTypes'
import { getUser } from './auth'


export function setProfile(data, id) {
	return function(dispatch) {
		dispatch({type: actionTypes.SET_PROFILE_PENDING})
		axios.patch(`/api/profile/${id}`, data)
			.then((response) => {
					dispatch({
						type: actionTypes.SET_PROFILE_SUCCESS,
						payload: response.data
					})
					let body = {}
					body.id = response.data.user_id
					dispatch(getUser(body))
				})
				.catch((err) => {
					dispatch({
						type: actionTypes.SET_PROFILE_ERROR,
						payload: err
					})
				})			
	}
}

export function getProfile(id) {
	return function(dispatch) {
		dispatch({type: actionTypes.GET_PROFILE_PENDING})
		axios.get(`/api/profile/${id}`)
			.then((response) => {
					dispatch({
						type: actionTypes.GET_PROFILE_SUCCESS,
						payload: response.data
					})
				})
				.catch((err) => {
					dispatch({
						type: actionTypes.GET_PROFILE_ERROR,
						payload: err
					})
				})			
	}
}
