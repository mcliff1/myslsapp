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



/**
 * Main reducer functions
 */
const carrier = (state = defaultState, action) => {
  switch (action.type) {
    case 'OPEN_CARRIER_PANEL':
      return {
        ...state,
        info: action.info,
        isNew: action.isNew
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
      return state;
  }
}

export default carrier;
