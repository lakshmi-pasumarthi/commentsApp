import {Component} from 'react'
import {v4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'
const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]
class Comments extends Component {
  state = {
    name: '',
    comment: '',
    commentsList: [],
  }
  deleteComment = commentId => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }
  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }
  renderCommentsList = () => {
    const {commentsList} = this.state
    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }
  onAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      name: name,
      comment: comment,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }
  onChangeComment = event => {
    this.setState({
      comment: event.target.value,
    })
  }
  onChangeName = event => {
    this.setState({
      name: event.target.value,
    })
  }
  render() {
    const {name, comment, commentsList} = this.state
    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="heading">Comments</h1>
          <div className="comments-input">
            <form className="form" onSubmit={this.onAddComment}>
              <p className="para">Say something about 4.0 Technologies</p>
              <input
                type="text"
                className="name-input"
                placeholder="Your Name"
                value={name}
                onChange={this.onChangeName}
              />
              <textarea
                placeholder="Your Comment"
                className="comment-input"
                value={comment}
                onChange={this.onChangeComment}
                rows="6"
              />
              <button type="submit" className="add-btn">
                Add Comment
              </button>
            </form>
            <img
              className="img"
              alt="comments"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            />
          </div>
          <hr className="line" />
          <p className="desc">
            <span className="count">{commentsList.length}</span>
            Comments
          </p>
          <ul className="list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}
export default Comments