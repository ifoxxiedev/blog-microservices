import React, { useEffect, useState } from 'react'
import { Post } from './Post'
import { postsQueryApi } from '../api/axios'

export const PostList = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await postsQueryApi.get('/posts')
                setPosts(() => data.posts)
            } catch(err) {

            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])


    const renderPosts = () => {
        if (loading && !posts.length) {
            return (
                <div>
                    <h3>Carregando posts</h3>
                </div>
            )
        }


        if (!loading && !posts.length) {
            return (
                <div>
                    <h3>Nenhum post encontrado!</h3>
                </div>
            )
        }


        return posts.map(post => (<Post {...post} key={post.id} />))
    }


    return (
        <div>
            <h2 className="mx-1">Lista de Posts </h2>
            <div className="d-flex flex-wrap justify-content-start flex-row">
                {renderPosts()}
            </div>
        </div>
    )
}