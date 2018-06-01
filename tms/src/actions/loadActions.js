const API_ENDPOINT = 'https://tms-api.mattcliff.net/dev/load';


export const newLoadPanel = () => ({
  type: 'NEW_LOAD_PANEL'
});

export const closeLoadPanel = () => ({
  type: 'CLOSE_LOAD_PANEL'
});

export const openLoadPanel = (info) => ({
  type: 'OPEN_LOAD_PANEL',
  info
});

// does both PUT and POST (update and create)
export const submitLoad = (method, info) => ({
  type: 'SUBMIT_LOAD',
  payload: fetch(API_ENDPOINT, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept' : 'application/json, text/plain, */*'
    },
    body: JSON.stringify(info)
  }).then(res => res.json())
});

export const deleteLoad = (info) => {

  return({
    type: 'DELETE_LOAD',
    payload: fetch(API_ENDPOINT, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'Id' : info.Id, 'ObjectType' : info.ObjectType })
    }).then(res => res.json())
  });
}

export const fetchLoadList = () => {
  return({
    type: 'GET_LOADS',
    payload: fetch(API_ENDPOINT, {
      method: 'GET',
      headers: { 'Content-Type' : 'application/json' }
    }).then(res => res.json())
  });
}
