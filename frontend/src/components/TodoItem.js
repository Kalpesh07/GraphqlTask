import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import TaskService from '../services/TaskService';
const TodoItem = (props) => {
    //const [state, setstate] = useState()
    const handleChange = async (checked,id) => { 
        try {
            console.log("checked",checked,id);
            const subtask = await TaskService.checkSubtask({id:id,selected:checked});
            console.log("subtask",subtask);
            //if(subtask.checked == true){
                const todos = await TaskService.updateTask({id:subtask.taskid,selected:subtask.checked});
                props.handletask();
            //}
            
        } catch (e) {
            //console.error(`An error ${e.message} occured while loading tasks for user ${userId}`);
            console.error(`An error ${e.message} occured while loading tasks `);
        }
        console.log('The checkbox was toggled'); 
        
    }; 
    return <ListGroup key={`list-${props.id}`}>
    {
      props.subtask.map((item, index) => {        
          return <ListGroup.Item className="p-1 border-0" key={index}>
      <div key={`default-checkbox-${item.id}`}>
    <Form.Check
      label={item.name}
      name="group1"
      type="checkbox"
      defaultChecked={item.checked}
      id={`default-checkbox-${item.id}`}
      key={item.id}
      onChange={() => handleChange(!item.checked,item.id)}
    />
  </div>
  </ListGroup.Item>
     })
    }
     </ListGroup>
}

export default TodoItem;