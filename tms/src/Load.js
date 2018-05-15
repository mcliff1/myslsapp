import React, { Component } from 'react';
import Select from 'react-select';
import { BrowserRouter as Router,  Route, Link } from 'react-router-dom';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';


class SelectBox extends React.Component {
  state = {
    selectedOption: '',
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }

  render() {
    const { selectedOption } = this.state;

    return(
      <div className="container">
        <div className="row">
        <div className="col">Label</div>
        <div className="col">
        <Select
          name="form-field-name"
          value={selectedOption}
          onChange={this.handleChange}
          options={[
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' },
          ]}
        />
        </div>
        </div>
      </div>
    );
  }
}

class LoadDetail extends React.Component {

  render() {
    return(
      <div>
        <div className="container">
          <div className="row">
            <div className="col"><SelectBox /></div>
            <div className="col">
            <FormGroup controlId="formControlProduct">
              <ControlLabel>Product</ControlLabel>
              <FormControl componentClass="text" placeholder="add text" />
            </FormGroup>
            </div>
            <div className="col"><SelectBox /></div>
            <div className="col"><SelectBox /></div>
            <div className="col"><SelectBox /></div>

          </div>
        </div>
        <h3>Shipper</h3>
        <h3>Consignee</h3>
        <h3>Carrier</h3>
      </div>
    );
  }
}


class LoadList extends React.Component {

  render() {
    return(
      <div>
      <h3>Load List</h3>
      </div>
    )
  };
}



class Load extends React.Component {

  render() {
    return(
      <div>
        <h2>Load</h2>
        <Link to="/load/detail">Load Detail</Link> &nbsp; - &nbsp;
        <Link to="/load/list">Load List</Link>

        <Route exact path="/load/detail" component={LoadDetail} />
        <Route exact path="/load/list" component={LoadList} />
        <Route path="/" render={() => <div></div>} />

      </div>
    )
  };

}


export default Load;
