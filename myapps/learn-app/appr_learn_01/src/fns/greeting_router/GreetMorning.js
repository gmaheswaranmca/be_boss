// ES6 class component "GreetMorning"  
//      allows to navigate to "GreetHi" component 
//      allows to process the url param "fullname"

import { Component } from "react";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

class GreetMorning extends Component{
    constructor(props){
         super(props);
         this.state = { 
             isRedirected : false,
             redirectUrl : ''
         }
    }
     onGoToHi = (event) => {
         //const navigate = useNavigate();
         
         if(window.confirm("Are you sure to go to hi?")) {
             this.setState( { isRedirected: true , redirectUrl : '/hi' } )
         }
     }
     render() {
         if(this.state.isRedirected) { 
             return(
                 <Navigate to="/hi"/>
             )
         }
         return(
             <>
             <h3>Hi Good Morning <span style={{ backgroundColor : 'orange'}}> { this.props.fullname }</span>!!!!</h3>
             <button type="button" onClick={ this.onGoToHi }>Go To Hi</button>
             </>
         )
     }
 }
 
 
 const WrapFullNameToGreetMorning = ( GreetMorning ) => {
     const GreetMorningWithFullname = ( props ) => {
        let params = useParams();
        const fullname = params.fullname;   
        return( <GreetMorning { ...props } fullname={ fullname }/> );
     };
     return GreetMorningWithFullname;
 };

 export default WrapFullNameToGreetMorning(GreetMorning);


/*
// functional component "GreetMorning"  
//      allows to navigate to "GreetHi" component 
//      allows to process the url param "fullname"

import { Component } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function GreetMorning(){
    const navigate = useNavigate(); 
    const params = useParams();
    function onGoToHi(event) {
        
        if(window.confirm("Are you sure to go to hi?")) {
            navigate("/hi")
        }
    }

    return(
        <>
        <h3>Hi Good Morning <span style={{ backgroundColor : 'orange'}}>{ params.fullname }</span>!!!!</h3>
        <button type="button" onClick={onGoToHi}>Go To Hi</button>
        </>
    )
}



*/


/*
Notes: 
    'Navigate' is navigational component for replacement of the hook 'useNavigate()' 

    'useParams()' is the hook.

    For class level component,
        to use the url parameter 
            we define higher order component 
                which takes the actual componet as argument
                and returns the component with added the url parameter as component parameter
*/