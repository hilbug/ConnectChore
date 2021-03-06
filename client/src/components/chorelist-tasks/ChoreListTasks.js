// import React, { Component } from "react";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setTasksAction } from "../../actions/chorelistActions";
// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
// API Calls
import API from "../../utils/API";
// Local CSS
import "./choreListTasks.css";

class ChoreListTasks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: {}
    }
  }

  //need something here to prevent the chorelists previously in state from showing?
  // maybe in parent component? Still need them to render when viewing tasks,
  //just not when creating a new one.
  // componentDidMount() {
  //   this.props.setTasks([]);
  // }

  handleCompletionStatusChange = async e => {
    const choreListId = this.props.choreListToEdit;
    //using e.currentTarget here instead of e.target so that the click event
    // is always linked to the button itself and not to the icon in the button
    const taskId = e.currentTarget.dataset.id;
    const currentCompletionStatus = e.currentTarget.value;
    let newCompletionStatus;

    if (currentCompletionStatus === "false") {
      newCompletionStatus = true;
    } else {
      newCompletionStatus = false;
    }

    //update the completion of the status in the chorelist (not populated with task data)
    await API.updateTaskCompletion(taskId, newCompletionStatus);

    try {
      const newListWithTasks = await API.getChoreListWithTasks(choreListId);
      this.props.setTasks(newListWithTasks.data.tasks);
    } catch (err) {
      console.log(err);
    }
  };

  handleDeleteTask = async e => {
    const choreListId = this.props.choreListToEdit;

    //using e.currentTarget here instead of e.target so that the click event
    // is always linked to the button itself and not to the icon in the button
    const taskId = e.currentTarget.dataset.id;

    await API.deleteTaskFromChoreList(choreListId, taskId);

    try {
      const newListWithTasks = await API.getChoreListWithTasks(choreListId);
      
      this.props.setTasks(newListWithTasks.data.tasks);
    } catch (err) {
      console.log(err);
    }

  };

  render() {
    const tasks = this.props.tasks;
    const checkbox = (completionStatus) => {

      return completionStatus ? (
        <FontAwesomeIcon icon={faCheckSquare} />
      ) : (
          <FontAwesomeIcon icon={faSquare} />
        )
    };

    return (
      <>
        <Row>
          <Col xs="4" md="5">
            <h6 className="chorelistHeading">Task</h6>
          </Col>
          <Col xs="4" md="3">
            <h6 className="chorelistHeading">Frequency</h6>
          </Col>
          <Col xs="2" md="2">
            <h6 className="chorelistHeading">Done?</h6>
          </Col>
          <Col xs="2" md="2">
            <h6 className="chorelistHeading">Delete</h6>
          </Col>
        </Row>
        {/* if tasks exist map the chosen tasks here, otherwise return Null */}
        {tasks.length ?
          tasks.map((task, index) => {
            const { description, frequency } = task.task;
            return (
              <Row key={index}>
                <Col xs="4" md="5">
                  <p>{description}</p>
                </Col>
                <Col xs="4" md="3">
                  <p>{frequency}</p>
                </Col>
                <Col xs="2" md="2">
                  <Button
                    variant="outline-success"
                    type="button"
                    value={task.completionStatus}
                    data-id={task._id}
                    className="taskListButton"
                    onClick={this.handleCompletionStatusChange}
                  >
                    {checkbox(task.completionStatus)}
                  </Button>
                </Col>
                <Col xs="2" md="2">
                  <Button
                    variant="outline-danger"
                    type="button"
                    data-id={task._id}
                    className="taskListButton"
                    onClick={this.handleDeleteTask}
                  >
                    <i className="fas fa-times"></i>
                  </Button>
                </Col>
              </Row>
            )
          }) : (
            null
          )
        }
      </>
    )
  }
};


ChoreListTasks.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  tasks: state.chorelist.tasks
});

const mapDispatchToProps = (dispatch, props) => (
  {
    setTasks: (tasksArray) => dispatch(setTasksAction(tasksArray))
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChoreListTasks);