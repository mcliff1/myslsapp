import React from 'react';

const voiceList = [
  'lisa',
  'bart',
];

const handleDeviceIdChange = (e) => {
  alert(e);
}

const handleTextKeyup = (e) => {
  const len = document.getElementById("textToConvert").value.length;
  document.getElementById("charCounter").textContent="Characters: " + len;
}

const TextToAudioControl = () => {
  return(
    <div>
      Text to Audio Control
      a drop down to select voice and generate
      <div>
      <select id='selectVoice' onChange={handleDeviceIdChange}>
        {voiceList.map((id, index) =>
          <option key={index} value={id}>{id}</option>
        )}
      </select>
      <button>Generate</button>
      </div>
      <br/>
      <div>
        <textarea id="textToConvert" onKeyUp={handleTextKeyup}></textarea>
        <span id="charCounter">Characters: 0</span>
      </div>
    </div>
  );
}

export default TextToAudioControl;
