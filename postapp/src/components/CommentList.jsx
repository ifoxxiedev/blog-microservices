import React from 'react'
export const CommentList = ({ comments }) => {
    return (
        <ul>
            {comments.map(comment => (<li key={comment.id}>{comment.content}</li>))}
        </ul>
    )
}