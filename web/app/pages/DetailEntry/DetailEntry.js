import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, FormReducer, Form } from 'redux-form'
import { getTestimonials, likeTestimonial } from '../../redux/actions/testimonial'
import { getComment } from '../../redux/actions/comment'
import { setFavorites } from '../../redux/actions/favorite'
import pull from 'lodash/pull'
import CommentEntry from '../../components/Testimonial/CommentEntry'


class DetailEntry extends Component {

    formSubmit() {
        const { dispatch, favorites, user, params } = this.props
        let body = {}
        let array = favorites.entries.slice()
        if (array.includes(params.entryId)) {
             pull(array, params.entryId)
        } else {
            array.push(params.entryId)
        }
        body.user_id = user.id
        body.entries = array
        dispatch(setFavorites(body, user.id))
    }

    formLikesSubmit() {
        const { dispatch, user, profile, userProfile, params } = this.props
        let body = {}
        body.user_id = Number(user.id)
        body.author = `${userProfile.firstName} ${userProfile.lastName}`
        body.image = userProfile.image
        body.to = profile.id
        dispatch(likeTestimonial(body, params.entryId))
        dispatch(getTestimonials())
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getComment())
    }

    render() {
        const { testimonial, params, user, favorites, handleSubmit, profile } = this.props
        return (
            <div id="DetailEntry">
                {testimonial
                    .filter(e => e.id == params.entryId)
                    .map((e, i)=> (
                    <div className="PostEntry" key={i}>
                    <h1>{e.author + `'s Post`}</h1>
                        <div className="card bodi share col1" data-social="item" style={{width: '100%'}}>
                            <div className="circle" data-toggle="tooltip" title="" data-container="body" data-original-title="Label"></div>
                                <div className="card-header clearfix">
                                    <div className="user-pic">
                                        <img alt={`Profile Image ${e.user_id}`}
                                            width="122" height="122" 
                                            data-src-retina={e.image ? e.image : "http://i.imgur.com/sRbuHxN.png"} 
                                            data-src={e.image ? e.image : "http://i.imgur.com/sRbuHxN.png"} 
                                            src={e.image ? e.image : "http://i.imgur.com/sRbuHxN.png"} />
                                    </div>
                                    <h5>{e.author}</h5>
                                    <h6>Created posted
                                        <span className="location semi-bold">
                                            <i className="icon-map"></i> 
                                        </span>
                                    </h6>
                                </div>
                            {(favorites && e.user_id != user.id) ? 
                                (favorites.entries.includes(e.id)) ? 
                                (<a onClick={() => this.formSubmit()} type="submit" className={`${e.likes && e.likes.length > 0 ? 'fav' : 'no-likes'}`}><i className="fa fa-heart"></i></a>) 
                                : (<a onClick={() => this.formSubmit()} type="submit" className={`${e.likes && e.likes.length > 0 ? 'fav' : 'no-likes'}`}><i className="fa fa-heart-o"></i></a>)
                            : null}
                            {(e.likes) ? 
                                (e.likes.includes(user.id)) ? 
                                (<a onClick={() => this.formLikesSubmit()} type="submit" className="like">{e.likes && e.likes.length > 1 ? `${e.likes.length} Likes   `: e.likes && e.likes.length == 1 ? `${e.likes.length} Like   `: ''}<i className="fa fa-thumbs-up"></i></a>) 
                                : (<a onClick={() => this.formLikesSubmit()} type="submit" className="like">{e.likes && e.likes.length > 1 ? `${e.likes.length} Likes   `: e.likes && e.likes.length == 1 ? `${e.likes.length} Like   `: ''}<i className="fa fa-thumbs-o-up"></i></a>)
                            : null}
                            <div className="card-description">
                                <p>{e.message}</p>
                            </div>
                            {user && user.id ? <CommentEntry profileId={profile.user_id} entryId={params.entryId} /> : null}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

}

DetailEntry = reduxForm({
    form: 'DetailEntry'
})(DetailEntry)

export default connect(state => ({
    testimonial: state.testimonial.data,
    user: state.user.data,
    favorites: state.favorites.data,
    profile: state.profile.data,
    userProfile: state.user.profile
}))(DetailEntry)