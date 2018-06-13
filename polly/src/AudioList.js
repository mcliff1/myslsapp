import React from 'react';
import { connect } from 'react-redux';

import AudioListControl from './AudioListControl';
import AudioListView from './AudioListView';
import { updateList, updateFilter } from './actions'

const AudioList = ({needsUpdate, searchFilter, audioList, handleSearch, handleFilterChange}) => {

  if (needsUpdate) {
    setTimeout(() => { handleSearch(searchFilter); }, 200);
  }

  return(
    <div>
      <AudioListControl
          handleFilterChange={handleFilterChange}
          searchFilter={searchFilter}
          handleSearch={handleSearch} />
      <AudioListView list={audioList} />
    </div>
  );
}


const mapStateToProps = (state, ownProps) => {
  return {
    audioList: state.audio.audioList,
    searchFilter: state.audio.searchFilter,
    needsUpdate: state.audio.needsUpdate
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSearch: (filter) => dispatch(updateList(filter)),
    handleFilterChange: (filter) => dispatch(updateFilter(filter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioList);
