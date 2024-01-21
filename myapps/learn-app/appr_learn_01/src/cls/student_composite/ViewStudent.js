import { Component } from "react";

export default class ViewStudent extends Component {   
    render(){
        return(
            <>   
            <div>
                <div style={{border:'2px solid green', 
                        backgroundColor:'brown',
                        color:'white'}}><h3>View Student</h3></div>
                <div>
                    <label>Name : </label>
                    {this.props.name}
                </div>
                <div>
                    <label>ID : </label>
                    {this.props.id}
                </div>
                <div>
                    <label>Mark 1 : </label>
                    {this.props.mark1}
                </div>
                <div>
                    <label>Mark 2 : </label>
                    {this.props.mark2}
                </div>
                <div>
                    <label>Total : </label>
                    {this.props.mark1 + this.props.mark2}
                </div>
            </div>  
            
            </>
        )
    }
}