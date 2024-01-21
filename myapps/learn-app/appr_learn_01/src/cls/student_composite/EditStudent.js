import { Component } from "react";

export default class EditStudent extends Component {    
    onNameChange = (e) => {        
        this.props.onStudentChange(2,e.target.value)
    }
    onIdChange = (e) => {        
        this.props.onStudentChange(1,parseInt(e.target.value))
    }
    onMark1Change = (e) => {        
        this.props.onStudentChange(3,parseInt(e.target.value))
    }
    onMark2Change = (e) => {        
        this.props.onStudentChange(4,parseInt(e.target.value))
    }
    render(){
        return(
            <>
            
            <div>
                <div style={{border:'2px solid green', 
                        backgroundColor:'brown',
                        color:'white'}}><h3>Edit Student</h3></div>
                <div>
                    <label forName="name">Name : </label>
                    <input type="text" value={this.props.name}
                        id="name"
                        onChange={this.onNameChange}/>
                </div>
                <div>
                    <label forName="id">ID : </label>
                    <input type="text" value={this.props.id}
                        id="id"
                        onChange={this.onIdChange}/>
                </div>
                <div>
                    <label forName="mark1">Mark 1 : </label>
                    <input type="text" value={this.props.mark1}
                        id="mark1"
                        onChange={this.onMark1Change}/>
                </div>
                <div>
                    <label forName="mark2">Mark 2 : </label>
                    <input type="text" value={this.props.mark2}
                        id="mark2"
                        onChange={this.onMark2Change}/>
                </div>
            </div>
            
            </>
        )
    }
}
