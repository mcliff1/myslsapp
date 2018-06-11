import React from 'react';


const AudioListControl = () => {
  return(
    <div>
      Audio List
      Top line control; and a list with header

      <br></br>
  Provide post ID which you want to retrieve:
   <input type="text" id="postId" />
   <input type="submit" className="buttons" value="Search" id="searchButton" />
    </div>
  );
}

export default AudioListControl;
