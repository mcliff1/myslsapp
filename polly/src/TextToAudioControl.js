import React from 'react';

const voiceList = [
  { id: "Ivy", label: 'Ivy [English - American]' },
  { id: "Joanna", label: 'Joanna [English - American]' },
  { id: "Joey", label: 'Joey [English - American]' },
  { id: "Justin", label: 'Justin [English - American]' },
  { id: "Kendra", label: 'Kendra [English - American]' },
  { id: "Kimberly", label: 'Kimberly [English - American]' },
  { id: "Salli", label: 'Salli [English - American]' },
  { id: "Nicole", label: 'Nicole [English - Australian]' },
  { id: "Russell", label: 'Russell [English - Australian]' },
  { id: "Emma", label: 'Emma [English - British]' },
  { id: "Brian", label: 'Brian [English - British]' },
  { id: "Amy", label: 'Amy [English - British]' },
  { id: "Raveena", label: 'Raveena [English - Indian]' },
  { id: "Geraint", label: 'Geraint [English - Welsh]' },
  { id: "Ricardo", label: 'Ricardo [Brazilian Portuguese]' },
  { id: "Vitória", label: 'Vitória [Brazilian Portuguese]' },
  { id: "Lotte", label: 'Lotte [Dutch]' },
  { id: "Ruben", label: 'Ruben [Dutch]' },
  { id: "Mathieu", label: 'Mathieu [French]' },
  { id: "Céline", label: 'Céline [French]' },
  { id: "Chantal", label: 'Chantal [Canadian French]' },
  { id: "Marlene", label: 'Marlene [German]' },
  { id: "Dóra", label: 'Dóra [Icelandic]' },
  { id: "Karl", label: 'Karl [Icelandic]' },
  { id: "Carla", label: 'Carla [Italian]' },
  { id: "Giorgio", label: 'Giorgio [Italian]' },
  { id: "Mizuki", label: 'Mizuki [Japanese]' },
  { id: "Liv", label: 'Liv [Norwegian]' },
  { id: "Maja", label: 'Maja [Polish]' },
  { id: "Jan", label: 'Jan [Polish]' },
  { id: "Ewa", label: 'Ewa [Polish]' },
  { id: "Cristiano", label: 'Cristiano [Portuquese]' },
  { id: "Inês", label: 'Inês [Portuquese]' },
  { id: "Carmen", label: 'Carmen [Romanian]' },
  { id: "Maxim", label: 'Maxim [Russian]' },
  { id: "Tatyana", label: 'Tatyana [Russian]' },
  { id: "Enrique", label: 'Enrique [Spanish]' },
  { id: "Penélope", label: 'Penélope [US Spanish]' },
  { id: "Enrique", label: 'Miguel [US Spanish]' },
  { id: "Conchita", label: 'Conchita [Castilian Spanish]' },
  { id: "Astrid", label: 'Astrid [Swedish]' },
  { id: "Filiz", label: 'Filiz [Turkish]' },
  { id: "Gwyneth", label: 'Gwyneth [Welsh]' },
]




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
      <select id='selectVoice' >
        {voiceList.map((voiceItem, index) =>
          <option key={index} value={voiceItem.id}>{voiceItem.label}</option>,
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
