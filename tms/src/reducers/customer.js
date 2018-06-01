/**
 * @file customer.js
 * Customer Reducer (Redux)
 *
 */

const defaultState = {
  info: null,
  isNewCustomer: true,
  customerList: [],
  needListUpdate: true
}

const blank_cust =
{
  'name': '',
  'address1': '',
  'address2': '',
  'city': '',
  'state': '',
  'zip' : '',
  'phone' : '',
  'fax' : '',
  'email' : '',
  'website' : ''
};

const customer = (state = defaultState, action) => {
  switch (action.type) {
    case 'NEW_CUSTOMER_PANEL':
      return {
        ...state,
        info: blank_cust,
        isNewCustomer: true
      };
    case 'OPEN_CUSTOMER_PANEL':
      return {
        ...state,
        info: action.info,
        isNewCustomer: false
      };
    case 'CLOSE_CUSTOMER_PANEL':
      return {
        ...state,
        info: null,
        isNewCustomer: true
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
        isNewCustomer: true,
        needListUpdate: true
      };

    case 'UPDATE_CUSTOMER_FULFILLED':
      return {
        ...state,
        info: null,
        isNewCustomer: true,
        needListUpdate: true
      };

    case 'ADD_CUSTOMER_FULFILLED':
      return {
        ...state,
        info: null,
        isNewCustomer: true,
        needListUpdate: true
      };



    default:
      return state;
  }
}

export default customer;
