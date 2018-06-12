import React from 'react';
import { connect } from 'react-redux';

import TextToAudioView from './TextToAudioView';
import TextToAudioControl from './TextToAudioControl';
import { updateText } from './actions'


const TextToAudioComponent = ({text, handleTextChange}) => {

  //const innerUpdateText = () => updateText(text);


  return(
    <div>
      <TextToAudioControl />
      <TextToAudioView text={text} handleTextChange={handleTextChange} />
    </div>
  );
}


const mapStateToProps = (state, ownProps) => {
  return {
    text: state.audio.text,
    needListUpdate: state.audio.needListUpdate
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleTextChange: (e) => dispatch(updateText(e))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextToAudioComponent);
