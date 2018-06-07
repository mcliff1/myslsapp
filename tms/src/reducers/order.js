/**
 * @file order.js
 * ORDER Reducer (Redux)
 *
 */
const defaultState = {
  info: null,
  isNew: true,
  orderList: [],
  needListUpdate: true
}


/**
 * Main reducer functions
 */
const order = (state = defaultState, action) => {
  switch (action.type) {
    case 'OPEN_ORDER_PANEL':
      return {
        ...state,
        info: action.info,
        isNew: action.isNew
      };
    case 'CLOSE_ORDER_PANEL':
      return {
        ...state,
        info: null,
        isNew: true
      };
    case 'GET_ORDERS_FULFILLED':
      return {
        ...state,
        orderList: action.payload,
        needListUpdate: false
      };
    case 'DELETE_ORDER_FULFILLED':
      return {
        ...state,
        info: null,
        isNew: true,
        needListUpdate: true
      };

    case 'SUBMIT_ORDER_FULFILLED':
      return {
        ...state,
        info: null,
        isNew: true,
        needListUpdate: true
      };

    case 'ADD_ORDER_FULFILLED':
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

export default order;
