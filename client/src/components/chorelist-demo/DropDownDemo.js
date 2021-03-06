// Need for React and Redux
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// API calls
import API from "../../utils/API";

class DropDownDemo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            householdMemberId: "",
            householdMembers: [],
            // householdMembers: [
            //     {
            //         _id: "111",
            //         name: "Susie",
            //         userId: "5fb0747008cf063145ebc887"
            //     },
            //     {
            //         _id: "222",
            //         name: "Hercules",
            //         userId: "5fb0747008cf063145ebc887"
            //     }
            // ],
            auth: {}
        }
    }

    // get household members from the DB
    // TEST: will passing in user.id to the API call successfully get us the household members for the logged in user only?
    componentDidMount() {
        const { user } = this.props.auth

        API.getHouseholdMembers(user.id)
            .then(res => 
                //console.log(res)
                
                this.setState(
                { 
                    householdMemberId: res.data[0]._id,
                    householdMembers: res.data 
                }
            ))
            .catch(err => console.log(err));
    }

    // get the input values and add to state
    handleInputChange = event => {
        event.preventDefault();
        
        this.setState(
            { 
                [event.target.name]: event.target.value
                // household member id
                // don't include ...this.state so the value changes when the drop-down changes 
            }
        );
    };

    render() {

        const { user } = this.props.auth;

        return (
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <h4>
                                <b>Hey there,</b> {user.name.split(" ")[0]}
                                <p className="text-body">
                                    Pick a household member.
                                </p>
                            </h4>
                            <Form.Row>
                                <Form.Group as={Col} md="6" controlId="formHouseholdMember">
                                    <Form.Label>Pick someone:</Form.Label>
                                    <Form.Control 
                                        as="select"
                                        name="householdMemberId"
                                        value={this.state.householdMemberId}
                                        // placeholder="Wash the dishes" 
                                        onChange={this.handleInputChange}
                                    >
                                        {/* Map the household members to the drop-down */}
                                        {
                                            this.state.householdMembers.map(member => (
                                            <option 
                                                key={member._id}
                                                value={member._id}
                                            >
                                                {member.name}
                                            </option>
                                            ))
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Button 
                                variant="primary" 
                                type="submit"
                                // onClick={this.someFunction}
                            >
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

DropDownDemo.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(DropDownDemo);