import React from 'react';
import PropTypes from 'prop-types';


const AudioListControl = ({handleSearch, handleFilterChange, searchFilter}) => {
  return(
    <div>
      Audio List
      Top line control; and a list with header

      <br></br>
      Provide post ID which you want to retrieve:
      <br/>
      <input type="text" id="postId" defaultValue={searchFilter} onChange={(evt) => handleFilterChange(evt.target.value)} />
      <input type="submit" onClick={() => handleSearch(document.getElementById("postId").value)} className="buttons" value="Search" id="searchButton" />
    </div>
  );
}

AudioListControl.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
}
export default AudioListControl;
