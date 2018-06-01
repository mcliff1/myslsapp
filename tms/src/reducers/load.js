/**
 * @file load.js
 * Load Reducer (Redux)
 *
 */

const defaultState = {
  info: null,
  isNewLoad: true,
  loadList: [],
  needListUpdate: true
}


const blank_load =
{
  'status': '',
  'product': '',
  'salesRep': '',
  'quantity': '',
  'equipment': '',
  'carrier' : '',
  'pickupDate' : '',
  'deliveryDate' : '',
  'destinationLocation' : '',
  'pickupLocation' : ''
};


const load = (state = defaultState, action) => {
  switch (action.type) {
    case 'NEW_LOAD_PANEL':
      return {
        ...state,
        info: blank_load,
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

export default customer;
