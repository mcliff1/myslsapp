import React from 'react';

const handleTextKeyup = (e) => {
  const len = document.getElementById("textToConvert").value.length;
  document.getElementById("charCounter").textContent="Characters: " + len;
}

const TextToAudioView = () => {
  return(
    <div>
      <textarea id="textToConvert" onKeyUp={handleTextKeyup}></textarea>
      <span id="charCounter">Characters: 0</span>
    </div>
  );
}

export default TextToAudioView;
