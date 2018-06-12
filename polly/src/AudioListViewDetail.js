import React from 'react';



const AudioListViewDetail = ({item}) => {
  return(
    <tr>
      <th>{item.id}</th>
      <th>{item.voice}</th>
      <th>{item.text}</th>
      <th>{item.status}</th>
      <th>
        {
          typeof item['url'] === 'undefined' ?
          <div></div>
          :
          <audio controls>
            <source src={item.url} type='audio/mpeg' />
          </audio>
        }
      </th>
    </tr>
  );
}

export default AudioListViewDetail;
