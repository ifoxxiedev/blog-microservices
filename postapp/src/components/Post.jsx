import React from 'react'
import { CommentList } from './CommentList'
import { CommentCreate } from './CommentCreate'

export const Post = ({ id, title, comments }) => {
    return (
        <div className="card m-1" style={{minWidth: '30%'}}>
            <div className="card-body">
                <h3>{title}</h3>
                { comments && <CommentList comments={comments} /> }
                <CommentCreate postId={id} />
            </div>
        </div>
    )
}
