import React from 'react';
import { connect } from 'react-redux';

import TextToAudioView from './TextToAudioView';
import TextToAudioControl from './TextToAudioControl';
import { updateText, generateAudio, selectVoice } from './actions'

const TextToAudio = ({text, selectedVoice, lastGenerated, handleTextChange, handleGenerate, handleVoice}) => {

  return(
    <div>
      <TextToAudioControl
          handleGenerate={(voice) => handleGenerate(voice, text)}
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
    handleGenerate: (voice, text) => dispatch(generateAudio(voice, text)),
    handleTextChange: (text) => dispatch(updateText(text))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextToAudio);
