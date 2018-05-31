const API_ENDPOINT = 'https://tms-api.mattcliff.net/dev';


export const newCustomerPanel = () => ({
  type: 'NEW_CUSTOMER_PANEL'
});

export const closeCustomerPanel = () => ({
  type: 'CLOSE_CUSTOMER_PANEL'
});

export const openCustomerPanel = (info) => ({
  type: 'OPEN_CUSTOMER_PANEL',
  info
});


export const updateCustomer = (method, info) => ({
  type: 'UPDATE_CUSTOMER',
  payload: fetch(API_ENDPOINT, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept' : 'application/json, text/plain, */*'
    },
    body: JSON.stringify(info)
  }).then(res => res.json())
});

export const deleteCustomer = (info) => {

  return({
    type: 'DELETE_CUSTOMER',
    payload: fetch(API_ENDPOINT, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'Id' : info.Id, 'ObjectType' : info.ObjectType })
    }).then(res => res.json())
  });
}

export const fetchCustomerList = () => {
console.log("fetch");
return({
  type: 'GET_CUSTOMERS',
  payload: fetch(API_ENDPOINT, {
    method: 'GET',
    headers: { 'Content-Type' : 'application/json' }
  }).then(res => res.json())
});
}
