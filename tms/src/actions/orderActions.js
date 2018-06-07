const API_ENDPOINT = 'https://tms-api.mattcliff.net/dev/order';

export const closeOrderPanel = () => ({
  type: 'CLOSE_ORDER_PANEL'
});

export const openOrderPanel = (info) => ({
  type: 'OPEN_ORDER_PANEL',
  isNew: !(!!info.Id),
  info
});

// does both PUT and POST (update and create)
export const submitOrder = (isNew, info) => ({

  type: 'SUBMIT_ORDER',
  payload: fetch(API_ENDPOINT, {
    method: isNew ? 'POST' : 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept' : 'application/json, text/plain, */*'
    },
    body: JSON.stringify(info)
  }).then(res => res.json())
});

// input is the customer uuid
export const deleteOrder = (id) => {

  return({
    type: 'DELETE_ORDER',
    payload: fetch(API_ENDPOINT, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'Id' : id, 'ObjectType' : 'order' })
    }).then(res => res.json())
  });
}

export const fetchOrderList = () => {
  return({
    type: 'GET_ORDERS',
    payload: fetch(API_ENDPOINT, {
      method: 'GET',
      headers: { 'Content-Type' : 'application/json' }
    }).then(res => res.json())
  });
}
