import React, { useState } from 'react'
import { commentsApi } from '../api/axios'

export const CommentCreate = ({ postId }) => {
    const [ content, setContent ] = useState('')

    const submitForm = async (e) => {
        e.preventDefault()
        try {
            await commentsApi.post(`/post/${postId}/comments`, { content })
            setContent('')
        } catch(err) {
            console.log('error => ', err)
        } 
    }

    return (
        <div>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label htmlFor="title">Comment: <small>{content}</small></label>

                    <input 
                        className="form-control" 
                        name="content" 
                        value={content} 
                        onChange={e => setContent(e.target.value)}
                        placeholder="content" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
        </div>
    )
}