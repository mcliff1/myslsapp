import React from 'react';


const AudioList = () => {
  return(
    <div>
      Audio List
      Top line control; and a list with header

      <br></br>
  Provide post ID which you want to retrieve:
   <input type="text" id="postId" />
   <input type="submit" className="buttons" value="Search" id="searchButton" />
  <br/>



  <table id="posts">
    <colgroup>
      <col style={{width:"10%"}}/>
      <col style={{width:"7%"}}/>
      <col style={{width:"45%"}}/>
      <col style={{width:"8%"}}/>
      <col style={{width:"30%"}}/>
    </colgroup>
    <tbody>
      <tr>
        <th>Post ID</th>
        <th>Voice</th>
        <th>Post</th>
        <th>Status</th>
        <th>Player</th>
      </tr>
    </tbody>
  </table>


    </div>
  );
}

export default AudioList;
