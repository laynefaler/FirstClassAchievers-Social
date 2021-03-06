import axios from 'axios';
import actionTypes from '../store/actionTypes';
import { getFollowers } from './following';
import { getFavorites } from './favorite';
import { getFriends } from './friends';
import { getNotifications } from './notifications';

export function login(data) {
	return function(dispatch) {
		dispatch({type: actionTypes.LOGIN_PENDING});
		axios.post(`http://localhost:8325/api/v1/auth/local/login`, data)
			.then((response) => {
				dispatch({
					type: actionTypes.LOGIN_SUCCESS,
					payload: response.data,
				});
				dispatch(getFollowers(response.data.id));
				dispatch(getFavorites(response.data.id));
				dispatch(getFriends(response.data.id));
				dispatch(getNotifications(response.data.id));
				dispatch(getUser(response.data.id));
			})
			.catch((err) => {
				dispatch({
					type: actionTypes.LOGIN_ERROR,
					payload: err,
				});
			});
	};
}

export function forgottenPassword(data, id) {
	return function(dispatch) {
		dispatch({type: actionTypes.FORGOTTEN_PASSWORD_PENDING});
		axios.post(`http://localhost:8325/api/v1/auth/local/forgotten/password/${id}`, data)
			.then((response) => {
				dispatch({
					type: actionTypes.FORGOTTEN_PASSWORD_SUCCESS,
					payload: response.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: actionTypes.FORGOTTEN_PASSWORD_ERROR,
					payload: err,
				});
			});
	};
}

export function logout() {
	return function(dispatch) {
		dispatch({type: actionTypes.LOGOUT_PENDING});
		axios.get(`http://localhost:8325/api/v1/auth/local/logout`)
			.then((response) => {
				dispatch({
					type: actionTypes.LOGOUT_SUCCESS,
					payload: response.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: actionTypes.LOGOUT_ERROR,
					payload: err,
				});
			});
	};
}

export function register(data) {
	return function(dispatch) {
		dispatch({type: actionTypes.REGISTER_PENDING});
		axios.post(`http://localhost:8325/api/v1/auth/local/register/visitor`, data)
			.then((response) => {
				dispatch({
					type: actionTypes.REGISTER_SUCCESS,
					payload: response.data,
				});
				dispatch(login(data));
			})
			.catch((err) => {
				dispatch({
					type: actionTypes.REGISTER_ERROR,
					payload: err,
				});
			});
	};
}

export function changePassword(data) {
	return function(dispatch) {
		dispatch({type: actionTypes.CHANGE_PASSWORD_PENDING});
		axios.patch(`http://localhost:8325/api/v1/auth/local/change/password`, data)
			.then((response) => {
				dispatch({
					type: actionTypes.CHANGE_PASSWORD_SUCCESS,
					payload: response.data,
				});
				dispatch(login(response.data));
			})
			.catch((err) => {
				dispatch({
					type: actionTypes.CHANGE_PASSWORD_ERROR,
					payload: err,
				});
			});
	};
}

export function changeForgottenPassword(data, id) {
	return function(dispatch) {
		dispatch({type: actionTypes.CHANGE_FORGOTTEN_PASSWORD_PENDING});
		axios.patch(`http://localhost:8325/api/v1/auth/local/forgotten/change/${id}`, data)
			.then((response) => {
				dispatch({
					type: actionTypes.CHANGE_FORGOTTEN_PASSWORD_SUCCESS,
					payload: response.data,
				});
				dispatch(login(response.data));
			})
			.catch((err) => {
				dispatch({
					type: actionTypes.CHANGE_FORGOTTEN_PASSWORD_ERROR,
					payload: err,
				});
			});
	};
}

export function getUser(id) {
	return function(dispatch) {
		dispatch({type: actionTypes.USER_PROFILE_PENDING});
		axios.get(`http://localhost:8325/api/v1/profile/${id}`)
			.then((response) => {
				dispatch({
					type: actionTypes.USER_PROFILE_SUCCESS,
					payload: response.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: actionTypes.USER_PROFILE_ERROR,
					payload: err,
				});
			});
	};
}


export function getUserEmail(id) {
	return function(dispatch) {
		dispatch({type: actionTypes.USER_EMAIL_PENDING});
		axios.get(`http://localhost:8325/api/v1/auth/local/user/${id}`)
			.then((response) => {
				dispatch({
					type: actionTypes.USER_EMAIL_SUCCESS,
					payload: response.data,
				});
				dispatch(login(response.data));
			})
			.catch((err) => {
				dispatch({
					type: actionTypes.USER_EMAIL_ERROR,
					payload: err,
				});
			});
	};
}

