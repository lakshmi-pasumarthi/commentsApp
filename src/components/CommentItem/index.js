// Write your code here
import './index.css'
import {formatDistanceToNow} from 'date-fns'
const CommentItem = props => {
  const {commentDetails} = props
  const {id, name, comment, isLiked, initialClassName, date} = commentDetails
  const initial = name ? name[0].toUppercase() : ''
  const likeText = isLiked ? `button active` : `button`
  const likeImg = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const postedTime = formatDistanceToNow(date)
  const onClickLike = () => {
    const {toggleIsLiked} = props
    toggleIsLiked(id)
  }
  const onDeleteComment = () => {
    const {deleteComment} = props
    deleteComment(id)
  }
  return (
    <li className="item">
      <div className="comment">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div className="username-container">
            <p className="username">{name}</p>
            <p className="time">{postedTime} ago</p>
          </div>
          <p className="comment">{comment} </p>
        </div>
      </div>
      <div className="buttons">
        <div className="like">
          <img src={likeImg} alt="like" className="likeimg" />
          <button className={likeText} type="button" onClick={onClickLike}>
            Like
          </button>
        </div>
        <button
          type="button"
          className="button"
          onClick={onDeleteComment}
          data-testid="delete"
        >
          <img
            className="delete"
            alt="delete"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
          />
        </button>
      </div>
      <hr className="line" />
    </li>
  )
}
export default CommentItem
