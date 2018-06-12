/**
 * @file audio.js
 * combined state object for polly app
 *
 */
const defaultState = {
  text: '',
  audioList: '',
  selectedVoice: 'Joanna',
  lastGenerated: null,
  searchFilter: '*'
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
    case 'UPDATE_FILTER':
      return {
        ...state,
        searchFilter: action.payload
      };

    case 'SELECT_VOICE':
      return {
        ...state,
        selectedVoice: action.payload,
      };
    case 'GENERATE_AUDIO_FULFILLED':
      return {
        ...state,
        lastGenerated: action.payload['recordId'],
        searchFilter:  action.payload['recordId']
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
