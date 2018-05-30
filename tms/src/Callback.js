import { Component } from 'react';


class Callback extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // setAccessToekn();
    // setIdToken();
    window.location.href = '/';
  }

  render() {
    return null;
  }

}

export default Callback;
