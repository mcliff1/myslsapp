import React from 'react';
import PropTypes from 'prop-types';

//import { Field } from 'redux-form';
const handleTextKeyup = (e) => {
  const len = document.getElementById("textToConvert").value.length;
  document.getElementById("charCounter").textContent="Characters: " + len;

}


const TextToAudioView = ({text, handleTextChange}) => {
  return(
    <div>
      <textarea id="textToConvert" value={text}
              onChange={(evt) => handleTextChange(evt.target.value)}
              onKeyUp={handleTextKeyup}></textarea>
      <span id="charCounter">Characters: 0</span>
    </div>
  );
}


TextToAudioView.propTypes = {
  handleTextChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
}
export default TextToAudioView;
