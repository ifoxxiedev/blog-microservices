import axios from "axios";
import adapter from "axios/lib/adapters/http";

export const postApi = axios.create({
    baseURL: process.env.REACT_APP_POSTS_URI || 'http://localhost:4000',
    adapter
})


export const commentsApi = axios.create({
    baseURL: process.env.REACT_APP_COMMENTS_URI || 'http://localhost:4001',
    adapter,
})


export const postsQueryApi = axios.create({
    baseURL: process.env.REACT_APP_QUERY_URI || 'http://localhost:4002',
    adapter
})