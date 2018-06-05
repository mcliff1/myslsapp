/**
 * @file carrier.js
 * Carrier Reducer (Redux)
 *
 */
const defaultState = {
  info: null,
  isNew: true,
  carrierList: [],
  needListUpdate: true
}


const blank_carrier =
{
  'name': '',
  'city': '',
  'state': '',
  'phone': ''
};


/**
 * Main reducer functions
 */
const carrier = (state = defaultState, action) => {
  switch (action.type) {
    case 'NEW_CARRIER_PANEL':
      return {
        ...state,
        info: blank_carrier,
        isNew: true
      };
    case 'OPEN_CARRIER_PANEL':
      return {
        ...state,
        info: action.info,
        isNew: false
      };
    case 'CLOSE_CARRIER_PANEL':
      return {
        ...state,
        info: null,
        isNew: true
      };
    case 'GET_CARRIERS_FULFILLED':
      return {
        ...state,
        carrierList: action.payload,
        needListUpdate: false
      };
    case 'DELETE_CARRIER_FULFILLED':
      return {
        ...state,
        info: null,
        isNew: true,
        needListUpdate: true
      };

    case 'SUBMIT_CARRIER_FULFILLED':
      return {
        ...state,
        info: null,
        isNew: true,
        needListUpdate: true
      };

    case 'ADD_CARRIER_FULFILLED':
      return {
        ...state,
        info: null,
        isNew: true,
        needListUpdate: true
      };



    default:
      console.log('Unhandled Action', action)
      return state;
  }
}

export default carrier;
