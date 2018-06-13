import React from 'react';
import { connect } from 'react-redux';

import TextToAudioView from './TextToAudioView';
import TextToAudioControl from './TextToAudioControl';
import { updateText, generateAudio, selectVoice, selectLanguage } from './actions'

const TextToAudio = ({text,
  selectedVoice, selectedLanguage,
  lastGenerated, handleTextChange, translatedText,
  handleGenerate, handleVoice, handleLanguage
}) => {

  return(
    <div>
      <TextToAudioControl
          handleGenerate={(voice, language) => handleGenerate(voice, language, text)}
          selectedVoice={selectedVoice}
          selectedLanguage={selectedLanguage}
          handleVoice={handleVoice}
          handleLanguage={handleLanguage} />
      <TextToAudioView
          text={text}
          translatedText={translatedText}
          lastGenerated={lastGenerated}
          handleTextChange={handleTextChange} />
    </div>
  );
}


const mapStateToProps = (state, ownProps) => {
  return {
    text: state.audio.text,
    translatedText: state.audio.translatedText,
    selectedLanguage: state.audio.selectedLanguage,
    selectedVoice: state.audio.selectedVoice,
    needListUpdate: state.audio.needListUpdate,
    lastGenerated: state.audio.lastGenerated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleVoice: (selected) => dispatch(selectVoice(selected)),
    handleLanguage: (selected) => dispatch(selectLanguage(selected)),
    handleGenerate: (voice, language, text) => dispatch(generateAudio(voice, language, text)),
    handleTextChange: (text) => dispatch(updateText(text))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextToAudio);
