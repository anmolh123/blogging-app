import * as actionTypes from '../actions/actionTypes';


const initialState = {
    blogs : [],
    start: 0,
    comments: {}
}

const reducer = (state = initialState, action)=>{

    switch( action.type){
        case actionTypes.CREATE_BLOG: {
            return {
                ...state,
                blogs : [ action.payload , ...state.blogs]
            }
            // console.log('CREATE_BLOG',newState);
            // return newState;
        }
        case actionTypes.LOAD_BLOG:{
            let newState= {
                ...state,
                start: action.start,
                blogs : [ ...state.blogs ,...action.payload]
            }
            // console.log('READ_BLOG', newState);
            return newState;
        }    
        case actionTypes.UPDATE_BLOG: {
            const blogIndex = state.blogs.findIndex( blog => blog.id === action.id );
            const updatedBlog = [...state.blogs];
            updatedBlog[blogIndex] = {
                ...state.blogs[blogIndex], 
                ...action.payload
            };
            // console.log(updatedBlog);
            return { ...state, blogs : updatedBlog };
        }
        case actionTypes.DELETE_BLOG: {
            const blogIndex = state.blogs.findIndex( blog => blog.id === action.id );
            const updatedBlog = [...state.blogs];
            updatedBlog[blogIndex] = {
                ...state.blogs[blogIndex], 
                isDeleted : true
            };
            // console.log("deleted blog", updatedBlog);
            return { ...state, blogs : updatedBlog };
        }
        case actionTypes.LOAD_COMMENTS:{
            const newState = {
                ...state,
                comments: { ...state.comments, [action.postId]: [...action.payload]}
            }
            // console.log("newState ",newState);
            return newState;
        }

        default:
            return state;
    }
}

export default reducer;