/**
 * @file load.js
 * Load Reducer (Redux)
 *
 */
const defaultState = {
  info: null,
  isNew: true,
  loadList: [],
  needListUpdate: true
}




const load = (state = defaultState, action) => {
  switch (action.type) {
    case 'NEW_LOAD_PANEL':
      return {
        ...state,
        info: {},
        isNew: true
      };
    case 'OPEN_LOAD_PANEL':
      return {
        ...state,
        info: action.info,
        isNew: false
      };
    case 'CLOSE_LOAD_PANEL':
      return {
        ...state,
        info: null,
        isNew: true
      };
    case 'GET_LOADS_FULFILLED':
      return {
        ...state,
        loadList: action.payload,
        needListUpdate: false
      };
    case 'DELETE_LOAD_FULFILLED':
      return {
        ...state,
        info: null,
        isNew: true,
        needListUpdate: true
      };

    case 'SUBMIT_LOAD_FULFILLED':
      return {
        ...state,
        info: null,
        isNew: true,
        needListUpdate: true
      };

    case 'ADD_LOAD_FULFILLED':
      return {
        ...state,
        info: null,
        isNew: true,
        needListUpdate: true
      };



    default:
      return state;
  }
}

export default load;
