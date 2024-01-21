import { Component } from 'react';
import WrapRouter from './WrapRouter';
class HiToProgrammerRouterLess extends Component {    
    /*
    constructor( props ) {
        super(props);
    }
    */
    onGoToHiToReact = (event) => {
        this.props.router.navigate("/react");
    }

    onGoToHiToNodeJs = (event) => {
        this.props.router.navigate("/node");
    }

    render () { 
        let programmer_name = this.props.router.params.programmer;
        return(
            <>
            <h3>Hi { programmer_name }!!!!</h3>
            {(programmer_name === "Rakesh") ?
            (<button type="button" onClick={this.onGoToHiToReact}>Hi To React</button>) 
            : (programmer_name === "Nithin") ?
            (<button type="button" onClick={this.onGoToHiToNodeJs}>Hi To Node JS</button>)
            : (<>Welcome On Board</>)
            }             
            </>
        );
    }
}

const HiToProgrammer = WrapRouter(HiToProgrammerRouterLess);
export default HiToProgrammer;