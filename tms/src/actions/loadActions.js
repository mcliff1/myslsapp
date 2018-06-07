const API_ENDPOINT = 'https://tms-api.mattcliff.net/dev/load';


export const closeLoadPanel = () => ({
  type: 'CLOSE_LOAD_PANEL'
});

export const openLoadPanel = (info) => ({
  type: 'OPEN_LOAD_PANEL',
  isNew: !(!!info.Id),
  info
});

// does both PUT and POST (update and create)
export const submitLoad = (isNew, info) => {

  return({
  type: 'SUBMIT_LOAD',
  payload: fetch(API_ENDPOINT, {
    method: isNew ? 'POST' : 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept' : 'application/json, text/plain, */*'
    },
    body: JSON.stringify(info)
  }).then(res => res.json())
});
}

export const deleteLoad = (id) => {

  return({
    type: 'DELETE_LOAD',
    payload: fetch(API_ENDPOINT, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'Id' : id, 'ObjectType' : 'load' })
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
