import { Component } from "react";

import ViewStudent from './ViewStudent';
import EditStudent from './EditStudent';

export default class Student extends Component {
    constructor( props ) {
        super(props);
        this.state = {id: props.id, 
            name: props.name, 
            mark1: props.mark1, 
            mark2: props.mark2};
    }

    onStudentChange = (dataCode, data) => {
        switch(dataCode){
            case 1: this.setState({id: data}); break;
            case 2: this.setState({name: data}); break;
            case 3: this.setState({mark1: data}); break;
            case 4: this.setState({mark2: data}); break;
        } 
    }
    
    render(){
        return(
            <>
            <table width="100%">
                <tr>
                    <td>
                        <EditStudent id={this.state.id}
                            name={this.state.name}
                            mark1={this.state.mark1}
                            mark2={this.state.mark2}
                            onStudentChange={this.onStudentChange} />
                    </td>
                    <td>                
                        <ViewStudent id={this.state.id}
                            name={this.state.name}
                            mark1={this.state.mark1}
                            mark2={this.state.mark2} />              
                    </td>
                </tr>
            </table>
            </>
        )
    }
}

/*
### Use Case: ###
#1
**** App.js ****
import './App.css';
import Student from './cls/student_composite/Student';


function App() {
  return (
    <div className="App">
      <Student/>
    </div>
  );
}

export default App;

*/

