import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import PostEntry from '../../components/Testimonial/PostEntry';
import { getTestimonials } from '../../redux/actions/testimonial';
import '../../redux/utils/search';


@connect(state => ({
	user: state.user.data,
	testimonial: state.testimonial.data,
	following: state.following.data,
	favorites: state.favorites.data,
}))

@reduxForm({
	form: 'MainPage',
})

export default class MainPage extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			searchTerm: '',
		};
	}

	componentDidMount() {
		const { dispatch, user } = this.props;
		if (user && user.id) {
			dispatch(getTestimonials());
		}
	}

	render() {
		const { user, testimonial, following, favorites } = this.props;
		return (
			<div id="mainPage">
				<h1>{user && user.id ? 'News Feed' : 'Welcome to First Class'}</h1>
				<div id="mainContainer">
					{user && user.id && testimonial && following && following.followers ? (
						<div className="col-sm-12">
							<div className="input-group">
								<input type="text"
									className="form-control"
									id="search-bar"
									onChange={e => this.setState({searchTerm: e.target.value})}
									placeholder="Search"
									aria-required="true"
									aria-invalid="true"/>
								<span className="input-group-addon" />
							</div>
							<div id="testimonial-background" className="col-sm-12">
								{testimonial
									.filter(e => following.followers.includes(e.user_id))
									.mainSearch(this.state.searchTerm)
									.map((entry, i) => (
										<PostEntry key={i}
											author={entry.author}
											message={entry.message}
											image={entry.image}
											profileId={entry.user_id}
											entryId={entry.id}
											userId={user ? user.id : null}
											favorites={favorites ? favorites.entries : null}
											likes={entry.likes}
											detail={false}
										/>
									))}
							</div>
						</div>
					) : null}
				</div>
			</div>
		);
	}
}
