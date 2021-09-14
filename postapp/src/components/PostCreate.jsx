import React, { useState } from 'react'
import { postApi } from '../api/axios'

export const PostCreate = () => {
    const [ title, setTitle ] = useState('')

    const submitForm = async (e) => {
        e.preventDefault()
        try {
            await postApi.post('/posts', { title })
            setTitle('')
        } catch(err) {
            console.log('error => ', err)
        } 
    }

    return (
        <div>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label htmlFor="title">Title: <small>{title}</small></label>

                    <input 
                        className="form-control" 
                        name="title" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)}
                        placeholder="title" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
        </div>
    )
}