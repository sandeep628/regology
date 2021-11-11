import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './comments.css'

class CommentsComponent extends Component {
  static propTypes = {
    comment: PropTypes.any,
    isChild: PropTypes.bool,
    // updateComment: PropTypes.func,
  };

  state = {
    showChildren: true,
    comment: this.props.comment,
    reply: '',
  };

  // updateComment = (children) => {
  //   const {updateComment} = this.props;
  // }

  handleReply = (e) => {
    this.setState({
      reply: e.target.value
    })
  }

  toggleShowChildren = () => {
    const { showChildren } = this.state;
    this.setState(prevState => ({
      ...prevState,
      showChildren: !showChildren,
    }));
  }

  submitReply = () => {
    const { comment, reply } = this.state;
    const tempComment = {...comment};

    if (tempComment.children) {
      tempComment.children.push({
        comment: reply
      });
    } else {
      tempComment.children = [{comment: reply}];
    }
    this.setState({
      comment: tempComment,
      reply: ''
    });
  }

  render() {
    const {isChild} = this.props;
    const {showChildren, comment} = this.state

    return (
      <div className="comment-box">
        <div className="comment-text">
         {isChild && <span className="bullet">{'\u26ac'}</span>}{comment.comment}
        </div>
        <div className="actions-section">
          <div className="input-box bottom-spacing">
            <textarea value={this.state.reply} onChange={this.handleReply}></textarea>
          </div>
          <div className="reply bottom-spacing">
            <button onClick={this.submitReply}>Reply</button>
          </div>
          {
            comment.children && comment.children.length > 0 && (
              <div className="toggle-comments bottom-spacing">
                <button onClick={this.toggleShowChildren}>{showChildren ? 'Hide Comments' : 'Show Comments'}</button>
              </div>
            )
          }
        </div>
        {
          showChildren && (
            <div className="children-section">
              {
                comment.children?.map(cmt => (
                  <><CommentsComponent comment={cmt} isChild /></>
                ))
              }
            </div>
          )
        }
      </div>
    );
  }
}

export default CommentsComponent