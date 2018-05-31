const defaultState = {
  info: null,
  isNewCustomer: true,
  customerList: []
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
    default:
      return state;
  }
}

export default customer;
