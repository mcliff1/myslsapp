import React, { Component } from 'react';
import { BrowserRouter as Router,  Route, Link } from 'react-router-dom';
import { Form, FormGroup, Label, Col, Input, FormText } from 'reactstrap';


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
      <div>
        <div className="col">Label</div>
        <div className="col">
        <Input
          type="select"
          name="mySelect"
          id="exampleMySelect" />
        </div>
      </div>
    );
  }
}

class LoadDetail extends React.Component {

  render() {
    return(
      <div>
        <Form>
          <FormGroup row>
            <SelectBox />
          </FormGroup>
          <FormGroup row>
              <Label for="productName" sm={2}>Product</Label>
              <Col sm={10}>
                <Input type="email" name="email" id="productName" placeholder="product..." />
              </Col>
          </FormGroup>
        </Form>
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
