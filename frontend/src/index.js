import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css"
import './index.css';
import TaskListContainer from './containers/Tasklistcontainer';

class App extends React.Component{

    render(){
        return(
             <div className="App">
                <TaskListContainer />
            </div>
      
        )
    }
}

ReactDOM.render((
      <App />
), document.getElementById('root'));
