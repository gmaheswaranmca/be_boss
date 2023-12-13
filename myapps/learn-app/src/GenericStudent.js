import { Component } from "react";

export default class GenericStudent extends Component{
    constructor(props){
        super(props);
        this.state = {id: props.id, 
            name: props.name, 
            mark1: props.mark1, 
            mark2: props.mark2};
    }
    onNameChange = (e) => {        
        this.setState({name: e.target.value})
    }
    onIdChange = (e) => {        
        this.setState({id: parseInt(e.target.value)})
    }
    onMark1Change = (e) => {        
        this.setState({mark1: parseInt(e.target.value)})
    }
    onMark2Change = (e) => {        
        this.setState({mark2: parseInt(e.target.value)})
    }
    render(){
        return(
            <>
            <table width="100%"><tr><td>
            <div>
                <div style={{border:'2px solid green', 
                        backgroundColor:'brown',
                        color:'white'}}><h3>Edit Student</h3></div>
                <div>
                    <label forName="name">Name:</label>
                    <input type="text" value={this.state.name}
                        id="name"
                        onChange={this.onNameChange}/>
                </div>
                <div>
                    <label forName="id">ID:</label>
                    <input type="text" value={this.state.id}
                        id="id"
                        onChange={this.onIdChange}/>
                </div>
                <div>
                    <label forName="mark1">Mark 1:</label>
                    <input type="text" value={this.state.mark1}
                        id="mark1"
                        onChange={this.onMark1Change}/>
                </div>
                <div>
                    <label forName="mark2">Mark 2:</label>
                    <input type="text" value={this.state.mark2}
                        id="mark2"
                        onChange={this.onMark2Change}/>
                </div>
            </div>
            </td><td>
            <div>
                <div style={{border:'2px solid green', 
                        backgroundColor:'brown',
                        color:'white'}}><h3>View Student</h3></div>
                <div>
                    <label>Name:</label>
                    {this.state.name}
                </div>
                <div>
                    <label>ID:</label>
                    {this.state.id}
                </div>
                <div>
                    <label>Mark 1:</label>
                    {this.state.mark1}
                </div>
                <div>
                    <label>Mark 2:</label>
                    {this.state.mark2}
                </div>
                <div>
                    <label>Total:</label>
                    {this.state.mark1 + this.state.mark2}
                </div>
            </div>  
            </td></tr></table>
            </>
        )
    }
}

export  class ContainerStudent extends Component{
    constructor(props){
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
            <table width="100%"><tr>
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
            </td></tr></table>
            </>
        )
    }
}


export  class EditStudent extends Component{
    constructor(props){
        super(props);
        
    }
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
                    <label forName="name">Name:</label>
                    <input type="text" value={this.props.name}
                        id="name"
                        onChange={this.onNameChange}/>
                </div>
                <div>
                    <label forName="id">ID:</label>
                    <input type="text" value={this.props.id}
                        id="id"
                        onChange={this.onIdChange}/>
                </div>
                <div>
                    <label forName="mark1">Mark 1:</label>
                    <input type="text" value={this.props.mark1}
                        id="mark1"
                        onChange={this.onMark1Change}/>
                </div>
                <div>
                    <label forName="mark2">Mark 2:</label>
                    <input type="text" value={this.props.mark2}
                        id="mark2"
                        onChange={this.onMark2Change}/>
                </div>
            </div>
            
            </>
        )
    }
}


export  class ViewStudent extends Component{
    constructor(props){
        super(props);
        
    }
    
    render(){
        return(
            <>   
            <div>
                <div style={{border:'2px solid green', 
                        backgroundColor:'brown',
                        color:'white'}}><h3>View Student</h3></div>
                <div>
                    <label>Name:</label>
                    {this.props.name}
                </div>
                <div>
                    <label>ID:</label>
                    {this.props.id}
                </div>
                <div>
                    <label>Mark 1:</label>
                    {this.props.mark1}
                </div>
                <div>
                    <label>Mark 2:</label>
                    {this.props.mark2}
                </div>
                <div>
                    <label>Total:</label>
                    {this.props.mark1 + this.props.mark2}
                </div>
            </div>  
            
            </>
        )
    }
}