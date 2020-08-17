import * as actionTypes from './actionTypes';
import axios from 'axios';
import { pageLimit } from '../../constants/number';

export const addBlog = dispatch =>{
    return blogContent => {
        axios.post('https://jsonplaceholder.typicode.com/posts', blogContent)
        .then( response =>{
            // console.log("response",response.data);
            dispatch({ type: actionTypes.CREATE_BLOG, payload: response.data.blog });
        });
    }
}

export const loadData = dispatch =>{
    return (startIndex) => {
        axios.get('https://jsonplaceholder.typicode.com/posts/',{
            params: {
              _start: startIndex,
              _limit: pageLimit
            }
          })
        .then( response =>{
            // console.log("initialize", response.data);
            dispatch({type: actionTypes.LOAD_BLOG, payload: response.data, start: startIndex+pageLimit});
        });
    }
}

export const updateBlog = dispatch => {
    return (postId,blogContent) => {

        axios.patch('https://jsonplaceholder.typicode.com/posts/'+postId, blogContent)
        .then( response =>{
            // console.log("patch ",response.data);
            dispatch({ type: actionTypes.UPDATE_BLOG, payload: response.data , id : postId });
        });
    }
}

export const deleteBlog = dispatch => {
    return ( postId )=>{
        axios.delete('https://jsonplaceholder.typicode.com/posts/'+postId)
        .then( response =>{
            // console.log("delete response",response.data);
            dispatch({ type: actionTypes.DELETE_BLOG, id : postId })
        })
    }
}

export const loadComments = dispatch =>{
    return (postId) => {
        axios.get('https://jsonplaceholder.typicode.com/comments/',{
            params: {
              postId
            }
          })
        .then( response =>{
            // console.log("comment "+ postId," ", response.data);
            dispatch({type: actionTypes.LOAD_COMMENTS, payload: response.data, postId: postId});
        });
    }
}