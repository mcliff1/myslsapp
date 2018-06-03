const API_ENDPOINT = 'https://tms-api.mattcliff.net/dev/carrier';


export const newCarrierPanel = () => ({
  type: 'NEW_CARRIER_PANEL'
});

export const closeCarrierPanel = () => ({
  type: 'CLOSE_CARRIER_PANEL'
});

export const openCarrierPanel = (info) => ({
  type: 'OPEN_CARRIER_PANEL',
  info
});

// does both PUT and POST (update and create)
export const submitCarrier = (isNew, info) => ({

  type: 'SUBMIT_CARRIER',
  payload: fetch(API_ENDPOINT, {
    method: isNew ? 'POST' : 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept' : 'application/json, text/plain, */*'
    },
    body: JSON.stringify(info)
  }).then(res => res.json())
});


export const deleteCarrier = (info) => {

  return({
    type: 'DELETE_CARRIER',
    payload: fetch(API_ENDPOINT, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'Id' : info.Id, 'ObjectType' : info.ObjectType })
    }).then(res => res.json())
  });
}

export const fetchCarrierList = () => {
  return({
    type: 'GET_CARRIERS',
    payload: fetch(API_ENDPOINT, {
      method: 'GET',
      headers: { 'Content-Type' : 'application/json' }
    }).then(res => res.json())
  });
}