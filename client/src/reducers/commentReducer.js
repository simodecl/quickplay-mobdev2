import { GET_COMMENTS, CREATE_COMMENT, COMMENT_ERROR } from '../constants';

const initialState = {
	comments: [],
	error: undefined,
}

function commentReducer(state = initialState, action) {
	switch (action.type) {
		case GET_COMMENTS:
			return {
				...state,
				comments: action.payload
			};
		case CREATE_COMMENT:
			return {
				...state,
				comments: [action.payload, ...state.comments] 
            };
        case COMMENT_ERROR:
        return {
            ...state,
            error: action.payload
        }
		default:
			return state;
	}
}

export default commentReducer;