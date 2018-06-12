import React from 'react';
import { connect } from 'react-redux';

import AudioListControl from './AudioListControl';
import AudioListView from './AudioListView';
import { updateList } from './actions'

const AudioList = ({handleSearch}) => {
  return(
    <div>
      <AudioListControl handleSearch={handleSearch}/>
      <AudioListView />
    </div>
  );
}


const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSearch: (selectedVoice) => dispatch(updateList(selectedVoice))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioList);
