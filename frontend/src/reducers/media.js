import {
    GET_MEDIA,
    GET_MY_MEDIA,
    MEDIA_ERROR,
    UPLOAD_MEDIA,
    DELETE_MEDIA
  } from '../actions/types';
  
  const initialState = {
    mediaItems: [],
    myMedia: [],
    loading: true,
    error: {}
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_MEDIA:
        return {
          ...state,
          mediaItems: payload,
          loading: false
        };
      case GET_MY_MEDIA:
        return {
          ...state,
          myMedia: payload,
          loading: false
        };
      case UPLOAD_MEDIA:
        return {
          ...state,
          mediaItems: [payload, ...state.mediaItems],
          myMedia: [payload, ...state.myMedia],
          loading: false
        };
      case DELETE_MEDIA:
        return {
          ...state,
          mediaItems: state.mediaItems.filter(item => item.id !== payload),
          myMedia: state.myMedia.filter(item => item.id !== payload),
          loading: false
        };
      case MEDIA_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        };
      default:
        return state;
    }
  }