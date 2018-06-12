import React from 'react';
import { connect } from 'react-redux';

import AudioListControl from './AudioListControl';
import AudioListView from './AudioListView';
import { updateList, updateFilter } from './actions'

const AudioList = ({searchFilter, audioList, handleSearch, handleFilterChange}) => {
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
    searchFilter: state.audio.searchFilter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSearch: (selectedVoice) => dispatch(updateList(selectedVoice)),
    handleFilterChange: (filter) => dispatch(updateFilter(filter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioList);
