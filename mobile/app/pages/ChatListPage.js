import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTestimonials } from '../redux/actions/testimonial'
import { getProfile } from '../redux/actions/profile'
import { getFollowers } from '../redux/actions/following'
import { ScrollView, Text, Image, TouchableOpacity } from 'react-native'
import { Card, CardSection, Input, Button, Spinner, Thumbnail, ProfilePic } from '../commons/index'
import { Actions, ActionConst } from 'react-native-router-flux'

class ChatListPage extends Component {

    renderContactList() {
        const { friends, user } = this.props
        let sorted = friends.sort((a, b) => a.firstName - b.firstName)
        let alphabet = { a: [], b: [], c: [], d: [], e: [], f: [], g: [], h: [], i: [], j: [], k: [], l: [], m: [], n: [], o: [], p: [], q: [], r: [], s: [], t: [], u: [], v: [], w: [], x: [], y: [], z: [] }
        sorted.forEach(e => {
            let key = e.firstName[0].toLowerCase()
            alphabet[key].push(e)
        })
        let array = []
        Object.keys(alphabet).forEach(e => {
            if (alphabet[e].length > 0) {
                array.push(alphabet[e])
            }
        })
        return array.concat.map((e, i) => (
            <Card  key={i}>
                <CardSection>
                    <Text>{e[0].firstName[0]}</Text>
                </CardSection>
                {e.map((ele, idx) => (
                    <TouchableOpacity onPress={() => Actions.chat({type: ActionConst.PUSH, otherId: ele.user_id, userId: user.id})}>
                        <CardSection  key={`${i} ${idx}`}>
                            <Thumbnail image={ele.image} />
                            <Text>{`${ele.firstName} ${ele.lastName}`}</Text>
                        </CardSection>
                    </TouchableOpacity>
                ))}
            </Card>
        ))
    }

  render() {
    const { friends, user } = this.props
    return (
      <ScrollView>
        {this.renderContactList()}
      </ScrollView>
    )
  }
}

export default connect(state => ({
  friends: state.friends.data,
  user: state.user.data
}))(ChatListPage)