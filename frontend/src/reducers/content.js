import {
    GET_CONTENTS,
    GET_CONTENT,
    GET_MY_CONTENT,
    CONTENT_ERROR,
    CREATE_CONTENT,
    UPDATE_CONTENT,
    DELETE_CONTENT
  } from '../actions/types';
  
  const initialState = {
    contents: [],
    myContent: [],
    currentContent: null,
    loading: true,
    error: {}
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_CONTENTS:
        return {
          ...state,
          contents: payload,
          loading: false
        };
      case GET_MY_CONTENT:
        return {
          ...state,
          myContent: payload,
          loading: false
        };
      case GET_CONTENT:
        return {
          ...state,
          currentContent: payload,
          loading: false
        };
      case CREATE_CONTENT:
        return {
          ...state,
          contents: [payload, ...state.contents],
          myContent: [payload, ...state.myContent],
          loading: false
        };
      case UPDATE_CONTENT:
        return {
          ...state,
          contents: state.contents.map(content =>
            content.id === payload.id ? payload : content
          ),
          myContent: state.myContent.map(content =>
            content.id === payload.id ? payload : content
          ),
          loading: false
        };
      case DELETE_CONTENT:
        return {
          ...state,
          contents: state.contents.filter(content => content.id !== payload),
          myContent: state.myContent.filter(content => content.id !== payload),
          loading: false
        };
      case CONTENT_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        };
      default:
        return state;
    }
  }