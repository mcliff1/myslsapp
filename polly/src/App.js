import React, { Component } from 'react';
import './App.css';
import TextToAudioComponent from './TextToAudioComponent';
import AudioList from './AudioList';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Polly</h1>
        </header>
        <div><p>
        This page will accept text, when submitted gets converted to MP3.
        The conversion happens via a Lambda function triggered via API Gateway,
        this results in the actual MP3 file being stored on a S3 bucket.
        A 2nd API call is available to pull the meta data for the audio clips
        </p></div>
        <TextToAudioComponent />
        <AudioList />
      </div>
    );
  }
}

export default App;