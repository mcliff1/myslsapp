import React from 'react';


class LoadContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: false,
      data: [],
    };
  }

  componentDidMount() {
    this.setState({loading: true});
    fetch(this.props.url)
      // we should check status code here and throw on errors
      .then(res => res.json())
      .then((data) => this.setState({data, loading: false}))
      .catch((err) => this.setState({loading: false, error: true}))
  }



  render() {
    return(
      <div>
        {this.props.children({
          ...this.props,
          ...this.state,
        })}
      </div>
    )
  }
}

export default LoadContent;
