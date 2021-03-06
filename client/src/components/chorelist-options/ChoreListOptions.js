// import React, { Component } from "react";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
// Local Components
import BackToDashboard from "../back-to-dashboard/BackToDashboard";
// Local CSS
import "../../App.css";

class ChoreListOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: {}
    }
  }

  render() {

    return (
      <>
      <Container>
        <Row>
        <Col lg={12} className="d-flex justify-content-center text-center">
          <Row>
          <Col lg={5}>
          <Button 
          className="btn btn-lg button-hover2"
            style={{
              width: "300px",
              height: "50px",
              fontSize: "15px",
              textTransform: "uppercase",
              borderRadius: "30px",
              border: "2px solid",
              padding: "12px",
              backgroundColor: "#ffffff",
              color: "#42b984",
              letterSpacing: "1.5px"
          }}
            type="button"
            name="listOption"
            value="create"
            onClick={this.props.handleInputChange}
          >
            Create A New Chore List
          </Button>
          </Col>
          <Col lg={2}><br/></Col>
          <Col lg={5}>
          <Button 
          className="btn btn-lg button-hover2"
          style={{
            width: "300px",
            height: "50px",
            fontSize: "15px",
            textTransform: "uppercase",
            borderRadius: "30px",
            border: "2px solid",
            padding: "12px",
            backgroundColor: "#ffffff",
            color: "#42b984",
            letterSpacing: "1.5px"
        }}
            type="button"
            name="listOption"
            value="view"
            onClick={this.props.handleInputChange}
          >
            View Existing Chore Lists
          </Button>
          </Col>
          </Row>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center text-center mt-2">
          <BackToDashboard />
        </Row>
        </Container>
      </>
    )
  }
};


ChoreListOptions.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
});


export default connect(
  mapStateToProps,
)(ChoreListOptions);