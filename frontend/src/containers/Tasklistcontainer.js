import React from 'react';
import TodoList from '../components/TodoList';
import TaskService from '../services/TaskService';
import Card from 'react-bootstrap/Card';
//import { Link } from 'react-router-dom';

class TaskListContainer extends React.Component {

    constructor() {
        super();
        this.state = {
            tasks: [],
        };
        this.setSubTask.bind(this);
    }

    async componentDidMount() {
        //const userId = parseInt(this.props.match.params.userId, 10);
        try {
            const tasks = await TaskService.getTodos({});
            //console.log("Todo",todos);
            //if(todos != undefined){
                this.setState({tasks});
            //}
            
        } catch (e) {
            //console.error(`An error ${e.message} occured while loading tasks for user ${userId}`);
            console.error(`An error ${e.message} occured while loading tasks `);
        }
    }

    setSubTask = async () => {
        // var templist = this.state.tasks;
        // objIndex = templist.findIndex((obj => obj.id == taskid));
        // var sublist= templist[objIndex].subtask;
        // objIndex = templist.findIndex((obj => obj.id == taskid));
        try {
            const tasks = await TaskService.getTodos({});
            //console.log("Todo",todos);
            //if(todos != undefined){
                this.setState({tasks});
            //}
            
        } catch (e) {
            //console.error(`An error ${e.message} occured while loading tasks for user ${userId}`);
            console.error(`An error ${e.message} occured while loading tasks `);
        }
    
    }

    render () {
        return (
                <Card border="lightgrey" style={{ width: '18rem' }}>
                <Card.Header className="p-1">My Startup Progress</Card.Header>
                <Card.Body>
                    <TodoList todos={this.state.tasks} handleSubtask={this.setSubTask} />
                </Card.Body>
               </Card>
        );
    }

}

export default TaskListContainer;