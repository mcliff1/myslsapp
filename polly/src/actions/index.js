/**
 * @file index.js
 * main action class for polly REACT ui
 */


// utility const for API
 export const API_ENDPOINT = 'https://polly-api.mattcliff.net/dev';



export const updateText = (text) => ({
  type: 'UPDATE_TEXT',
  text
});


export const selectVoice = (selectedVoice) => ({
  type: 'SELECT_VOICE',
  payload: selectedVoice
});


export const generateAudio = (voice, text) => ({
  type: 'GENERATE_AUDIO',
  payload: fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json',
      'Accept' : 'application/json, text/plain, */*'
      },

      body: '{ "voice" : "' + voice + '", "text" : "' + text + '" }'
    }).then(res => res.json())
});
