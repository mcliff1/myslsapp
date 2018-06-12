/**
 * @file audio.js
 * combined state object for polly app
 *
 */
const defaultState = {
  text: '',
  audioList: [],
  selectedVoice: 'Joanna',
  lastGenerated: null
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
    case 'GENERATE_AUDIO_FULFILLED':
      return {
        ...state,
        lastGenerated: action.payload['recordId']
      };
    case 'UPDATE_LIST_FULFILLED':
      return {
        ...state,
        audioList: action.payload,
      }
    default:
      return state;
  }
}

export default audio;
