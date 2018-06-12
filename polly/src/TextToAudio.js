import React from 'react';
import { connect } from 'react-redux';

import TextToAudioView from './TextToAudioView';
import TextToAudioControl from './TextToAudioControl';
import { updateText, generateAudio, selectVoice } from './actions'

const getState = (dispatch) => new Promise((resolve) => {
  dispatch((dispatch, getState) => { resolve(getState())})
})


const TextToAudio = ({text, selectedVoice, lastGenerated, handleTextChange, handleGenerate, handleVoice}) => {

  //const innerUpdateText = () => updateText(text);


  return(
    <div>
      <TextToAudioControl
          handleGenerate={handleGenerate}
          selectedVoice={selectedVoice}
          handleVoice={handleVoice} />
      <TextToAudioView
          text={text}
          lastGenerated={lastGenerated}
          handleTextChange={handleTextChange} />
    </div>
  );
}


const mapStateToProps = (state, ownProps) => {
  return {
    text: state.audio.text,
    selectedVoice: state.audio.selectedVoice,
    needListUpdate: state.audio.needListUpdate,
    lastGenerated: state.audio.lastGenerated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleVoice: (selectedVoice) => dispatch(selectVoice(selectedVoice)),
    handleGenerate: (selectedVoice) => dispatch(generateAudio(selectedVoice)),
    handleTextChange: (text) => dispatch(updateText(text))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextToAudio);
