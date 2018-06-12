/**
 * @file audio.js
 * combined state object for polly app
 *
 */
const defaultState = {
  text: '',
  audioList: [],
  selectedVoice: 'Joanna'
}



/**
 * Main reducer functions
 */
const audio = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_TEXT':
      return {
        ...state,
        text: action.text
      };
    case 'SELECT_VOICE':
      return {
        ...state,
        selectedVoice: action.payload,
      };
    case 'GENERATE_AUDIO':
      return {
        ...state,
      };

    default:
      return state;
  }
}

export default audio;
