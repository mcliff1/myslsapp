import React from 'react';
import PropTypes from 'prop-types';


const AudioListControl = ({handleSearch}) => {
  return(
    <div>
      Audio List
      Top line control; and a list with header

      <br></br>
  Provide post ID which you want to retrieve:
   <input type="text" id="postId" />
   <input type="submit" onClick={() => handleSearch(document.getElementById("postId").value)} className="buttons" value="Search" id="searchButton" />
    </div>
  );
}

AudioListControl.propTypes = {
  handleSearch: PropTypes.func.isRequired,
}
export default AudioListControl;
