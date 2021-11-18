import React from 'react';
import TodoItem from './TodoItem';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/esm/ListGroup';

const TodoList = (props) => {
    if(!props.todos.length) {
        return null;
    }

    return props.todos.map((item, index) => {
                return  <Card className="border-0" id={`cardid-${index}`} key={index}>
                <Card.Body>
                <Card.Title><span className="circle">{index+1}</span>&nbsp;{item.name} 
                {item.completed ? (
                    <span className="checkmark">
                    <div className="checkmark_stem"></div>
                    <div className="checkmark_kick"></div>
                </span>
                 ) : ( "" )}              
                 </Card.Title>
                <Card.Text>
                <TodoItem handletask={props.handleSubtask} key={index} {...item} />
                </Card.Text>
                </Card.Body>
                </Card>
            })
    
}

export default TodoList