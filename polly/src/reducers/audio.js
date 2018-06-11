/**
 * @file audio.js
 * combined state object for polly app
 *
 */
const defaultState = {
  text: null,
  audioList: [],
}



/**
 * Main reducer functions
 */
const audio = (state = defaultState, action) => {
  switch (action.type) {
    case 'SAY_IT':
      return {
        ...state,
      };
    case 'REFRESH_LIST_FULFILLED':
      return {
        ...state,
        carrierList: action.payload,
      };
    case 'DELETE_AUDIO_FULFILLED':
      return {
        ...state,
      };

    default:
      return state;
  }
}

export default audio;
