/**
 * @file customer.js
 * Customer Reducer (Redux)
 *
 */

const defaultState = {
  info: null,
  isNew: true,
  customerList: [],
  needListUpdate: true
}


const customer = (state = defaultState, action) => {
  switch (action.type) {
    case 'OPEN_CUSTOMER_PANEL':
      return {
        ...state,
        info: action.info,
        isNew: action.isNew
      };
    case 'CLOSE_CUSTOMER_PANEL':
      return {
        ...state,
        info: null,
        isNew: true
      };
    case 'GET_CUSTOMERS_FULFILLED':
      return {
        ...state,
        customerList: action.payload,
        needListUpdate: false
      };
    case 'DELETE_CUSTOMER_FULFILLED':
      return {
        ...state,
        info: null,
        isNew: true,
        needListUpdate: true
      };

    case 'SUBMIT_CUSTOMER_FULFILLED':
      return {
        ...state,
        info: null,
        isNew: true,
        needListUpdate: true
      };

    case 'ADD_CUSTOMER_FULFILLED':
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
