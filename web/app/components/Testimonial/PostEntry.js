import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import find from 'lodash/find'


class PostEntry extends Component {

    render() {
        const { author, message, testimonial } = this.props
        let entry = testimonial.filter(ele => ele.author == author)
        return (
            <div className="PostEntry">
                <div className="card share col1" data-social="item" style={{width: '100%'}}>
                    <div className="circle" data-toggle="tooltip" title="" data-container="body" data-original-title="Label"></div>
                        <div className="card-header clearfix">
                            <div className="user-pic">
                                <img alt="Profile Image"
                                    width="122" height="122" 
                                    data-src-retina={(entry && entry.image) ? entry.image : "theme/assets/img/default-user.png"} 
                                    data-src={(entry && entry.image) ? entry.image : "theme/assets/img/default-user.png"} 
                                    src={(entry && entry.image) ? entry.image : "theme/assets/img/default-user.png"}/>
                            </div>
                            <h5>{author}</h5>
                            <h6>Created posted
                                <span className="location semi-bold">
                                    <i className="icon-map"></i> 
                                </span>
                             </h6>
                        </div>
                    <div className="card-description">
                        <p>{message}</p>
                    </div>
                </div>
            </div>
        )
    }

}

export default connect(state => ({
    testimonial: state.testimonial.data
}))(PostEntry)