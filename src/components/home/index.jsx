import React, { Component} from 'react'
import CommentsComponent from '../comment-renderer/CommentsComponent'
import { COMMENTS_LIST } from '../mockdata'

class HomeComponent extends Component {
  render() {
    return (
      <ul>
        {
        COMMENTS_LIST?.map(cmt => (
          <li>
            <CommentsComponent comment={cmt} />
          </li>
        ))
      }
      </ul>
    )
  }
}

export default HomeComponent