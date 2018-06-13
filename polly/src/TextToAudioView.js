import React from 'react';
import PropTypes from 'prop-types';

//import { Field } from 'redux-form';
const handleTextKeyup = (e) => {
  const len = document.getElementById("textToConvert").value.length;
  document.getElementById("charCounter").textContent="Characters: " + len;

}


const TextToAudioView = ({text, translatedText, handleTextChange, lastGenerated}) => {
  return(
    <div>
      <textarea id="textToConvert" value={text}
              onChange={(evt) => handleTextChange(evt.target.value)}
              onKeyUp={handleTextKeyup}></textarea>
      <span id="charCounter">Characters: 0</span>
      {
        lastGenerated ?
        <div>Generated Id: {lastGenerated}</div>
        :
        <div></div>
      }

      {
        translatedText ?
        <div>{translatedText}</div>
        :
        <div></div>
      }
    </div>
  );
}


TextToAudioView.propTypes = {
  handleTextChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  translatedText: PropTypes.string,
  lastGenerated: PropTypes.string
}
export default TextToAudioView;
