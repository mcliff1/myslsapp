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
