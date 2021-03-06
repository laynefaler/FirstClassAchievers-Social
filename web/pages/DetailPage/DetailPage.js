import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Form } from 'redux-form';
import { getProfile } from '../../redux/actions/profile';
import { getTestimonials } from '../../redux/actions/testimonial';
import { getFollowers, setFollowers } from '../../redux/actions/following';
import { getComment } from '../../redux/actions/comment';
import PostEntry from '../../components/Testimonial/PostEntry';
import pull from 'lodash/pull';


@connect(state => ({
	user: state.user.data,
	profile: state.profile.data,
	testimonial: state.testimonial.data,
	following: state.following.data,
	favorites: state.favorites.data,
}))

@reduxForm({
	form: 'DetailPage',
})

export default class DetailPage extends Component {

	componentDidMount() {
		const { dispatch, params, user } = this.props;
		dispatch(getProfile(params.userId));
		dispatch(getTestimonials());
		if (user) {
			dispatch(getFollowers(user.id));
		}
		dispatch(getComment());
	}

	static formSubmit() {
		const { dispatch, following, user, profile } = this.props;
		let body = {};
		let array = following.followers.slice();
		if (array.includes(profile.user_id)) {
			pull(array, profile.user_id);
		} else {
			array.push(profile.user_id);
		}
		body.followers = array;
		dispatch(setFollowers(body, user.id, profile.user_id));
	}

	render() {
		const { profile, params, testimonial, handleSubmit, user, following, favorites } = this.props;
		return (
			<div id="DetailPage" className="col-sm-12">
				<h1>{profile && profile.firstName && profile.lastName  ? profile.firstName + ' ' + profile.lastName + '\'s Profile' : 'Their Profile'}</h1>
				<span id="profileImage" className="thumbnail-wrapper d32 circular inline m-t-5 s-t-10">
					<img src={profile && profile.image ? profile.image : "http://i.imgur.com/sRbuHxN.png"}
						alt=""
						data-src={profile && profile.image ? profile.image : "http://i.imgur.com/sRbuHxN.png"}
						data-src-retina={profile && profile.image ? profile.image : "http://i.imgur.com/sRbuHxN.png"}
						width="320"
						height="320"/>
				</span>
				<Form onSubmit={handleSubmit(DetailPage.formSubmit.bind(this))}>
					<div id="PrimaryContact" className="col-md-4 col-sm-12 col-xs-12">
						<div className="panel panel-default">
							<div className="panel-heading">
								<div className="panel-title">
                                    About Them
								</div>
							</div>
							<div className="panel-body">
								<h5>
                                    Traditional Standard Style
								</h5>
								<div className="form-group">
									<label>First Name</label>
									<span className="form-control">{profile ? profile.firstName : ''}</span>
								</div>
								<div className="form-group">
									<label>Nick Name</label>
									<span className="form-control">{profile ? profile.nickname : ''}</span>
								</div>
								<div className="form-group">
									<label>Last Name</label>
									<span className="form-control">{profile ? profile.lastName : ''}</span>
								</div>
								{(user && profile && following && params.userId !== user.id) ?
									following.followers.includes(profile.user_id) ? (
										<div className="row">
											<div className="col-sm-12 m-t-10 sm-m-t-10">
												<button type="submit" className="btn btn-complete btn-block m-t-5">Unfollow</button>
											</div>
										</div>
									) : (
										<div className="row">
											<div className="col-sm-12 m-t-10 sm-m-t-10">
												<button type="submit" className="btn btn-complete btn-block m-t-5">Follow</button>
											</div>
										</div>
									)
									: null }
							</div>
						</div>
					</div>
				</Form>
				<div id="SecondaryContact" className="col-md-7  col-sm-12 col-xs-12">
					{testimonial && profile && testimonial
						.filter(e => e.user_id === profile.user_id)
						.map((entry, i) => (
							<PostEntry key={i}
								author={entry.author}
								message={entry.message}
								image={entry.image}
								profileId={entry.user_id}
								entryId={entry.id}
								userId={user && user.id ? user.id : null}
								detail={true}
								favorites={favorites && entry && user && user.id !== entry.user_id ? favorites.entries : null}
								likes={user && entry && user.id !== entry.user_id ? entry.likes : null}
							/>
						))}
				</div>
			</div>
		);
	}

}

